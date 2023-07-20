import cloudinary from "../../config/cloudinary.js";
import Product from "../models/product.js";
import Category from "../models/category.js";
import Ingredient from "../models/ingredient.js";

export const addProduct = async (req, res) => {
  try {
    const result = await cloudinary.v2.uploader.upload(req.body.image, {
      upload_preset: "unsigned_upload",
      allowed_formats: ["png", "jpg", "jpeg"],
    });

    const name = req.body.ingredients.map((ingredient) => ingredient.label);
    let ingredientIds = [];

    const foundIngredients = await Ingredient.find({ name: { $in: name } });

    foundIngredients.map((ingredient) => {
      ingredientIds.push(ingredient._id);
    });

    const newProduct = new Product(req.body);
    newProduct.imageURL = result.url;
    newProduct.ingredients = ingredientIds;
    const product = await newProduct.save();

    res.status(201).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const search = req.query.search || "";

  try {
    let results;
    let totalCount;
    let totalPages;

    const categories = await Category.find({ name: { $regex: search, $options: "i" } });

    // MongoDB aggregation pipeline for pagination and search
    const query = {};
    if (search) {
      // Case-insensitive search for product names or any other relevant fields
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];

      const categoryIds = categories.map((category) => category._id);

      // Add the extracted _id values to the $or query
      query.$or.push({ category: { $in: categoryIds } });
    }

    const skip = (page - 1) * perPage;
    const productsPromise = Product.find(query)
      .populate("category")
      .populate("ingredients")
      .skip(skip)
      .limit(perPage)
      .exec();

    // Get the total count of products (without pagination)
    const countPromise = Product.countDocuments(query).exec();

    // Execute both queries in parallel using Promise.all
    [results, totalCount] = await Promise.all([productsPromise, countPromise]);

    // Calculate the total number of pages
    totalPages = Math.ceil(totalCount / perPage);

    res.status(200).json({ products: results, totalCount, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById({ _id: productId })
      .populate("category")
      .populate("ingredients");

    if (!product) res.status(404).json({ message: "Product not found!" });

    res.status(200).json({ result: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const name = req.body.ingredients.map((ingredient) => ingredient.label);
    let ingredientIds = [];

    const foundIngredients = await Ingredient.find({ name: { $in: name } });

    foundIngredients.map((ingredient) => {
      ingredientIds.push(ingredient._id);
    });

    const foundProduct = await Product.findById({ _id: productId });

    if (!foundProduct) return res.status(404).json({ message: "Product not found!" });

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          category: req.body.category,
          ingredients: ingredientIds,
          description: req.body.description,
        },
      },
      { new: true }
    );

    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    await Product.findByIdAndDelete({ _id: productId });

    res.json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
