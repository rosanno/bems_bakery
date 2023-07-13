import cloudinary from "../../config/cloudinary.js";
import Product from "../models/product.js";
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
  try {
    const products = await Product.find().populate("category").populate("ingredients");

    res.status(200).json({ products });
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

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
