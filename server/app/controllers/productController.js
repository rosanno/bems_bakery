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
  const { category } = req.query;
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const search = req.query.search || "";
  const sort = req.query.sort || "";

  try {
    const regex = new RegExp(category, "i");
    const categories = await Category.find({ name: regex });

    if (!categories)
      return res.status(404).json({ message: "product not found" });

    // MongoDB aggregation pipeline for pagination and search
    const query = {
      category: { $in: categories.map((category) => category._id) },
    };
    if (search) {
      // Case-insensitive search for product names or any other relevant fields
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sortOptions = {};

    if (sort === "priceHigh") {
      sortOptions.price = -1;
    } else if (sort === "priceLow") {
      sortOptions.price = 1;
    } else if (sort === "nameDesc") {
      sortOptions.name = -1;
    } else if (sort === "nameAsc") {
      sortOptions.name = 1;
    }

    const skip = (page - 1) * perPage;
    const productsPromise = Product.find(query)
      .populate("category")
      .populate("ingredients")
      .populate("customerReviews")
      .skip(skip)
      .limit(perPage)
      .sort(sortOptions)
      .exec();

    // Get the total count of products (without pagination)
    const countPromise = Product.countDocuments(query).exec();

    // Execute both queries in parallel using Promise.all
    const [products, totalCount] = await Promise.all([
      productsPromise,
      countPromise,
    ]);

    // Calculate the overall rating for each product
    const productsWithOverallRating = products.map((product) => {
      let totalRating = 0;
      const reviewsCount = product.customerReviews.length;
      for (const review of product.customerReviews) {
        totalRating += review.rating;
      }
      const overallRating = reviewsCount > 0 ? totalRating / reviewsCount : 0;

      return {
        ...product.toJSON(),
        overallRating,
        reviewsCount,
      };
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / perPage);

    res
      .status(200)
      .json({ products: productsWithOverallRating, totalCount, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const search = req.query.search || "";
  const sort = req.query.sort || "";

  try {
    const regex = new RegExp(category, "i");
    const categories = await Category.find({ name: regex });

    if (!categories)
      return res.status(404).json({ message: "product not found" });

    // MongoDB aggregation pipeline for pagination and search
    const query = {
      category: { $in: categories.map((category) => category._id) },
    };
    if (search) {
      // Case-insensitive search for product names or any other relevant fields
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const sortOptions = {};

    if (sort === "priceHigh") {
      sortOptions.price = -1;
    } else if (sort === "priceLow") {
      sortOptions.price = 1;
    } else if (sort === "nameDesc") {
      sortOptions.name = -1;
    } else if (sort === "nameAsc") {
      sortOptions.name = 1;
    }

    const skip = (page - 1) * perPage;
    const productsPromise = Product.find(query)
      .populate("category")
      .populate("ingredients")
      .populate("customerReviews")
      .skip(skip)
      .limit(perPage)
      .sort(sortOptions)
      .exec();

    // Get the total count of products (without pagination)
    const countPromise = Product.countDocuments(query).exec();

    // Execute both queries in parallel using Promise.all
    const [products, totalCount] = await Promise.all([
      productsPromise,
      countPromise,
    ]);

    // Calculate the overall rating for each product
    const productsWithOverallRating = products.map((product) => {
      let totalRating = 0;
      const reviewsCount = product.customerReviews.length;
      for (const review of product.customerReviews) {
        totalRating += review.rating;
      }
      const overallRating = reviewsCount > 0 ? totalRating / reviewsCount : 0;

      return {
        ...product.toJSON(),
        overallRating,
        reviewsCount,
      };
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / perPage);

    res
      .status(200)
      .json({ products: productsWithOverallRating, totalCount, totalPages });
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
      .populate("ingredients")
      .populate("customerReviews");

    if (!product) res.status(404).json({ message: "Product not found!" });

    let totalRating = 0;
    const reviewsCount = product.customerReviews.length;
    for (const review of product.customerReviews) {
      totalRating += review.rating;
    }
    const overallRating = reviewsCount > 0 ? totalRating / reviewsCount : 0;

    res.status(200).json({
      product: {
        ...product.toJSON(),
        overallRating, // Adding the overallRating field to the result
        reviewsCount,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getProductOverallRating = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId).populate("customerReviews");

    console.log(product);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let totalRating = 0;
    const reviewsCount = product.customerReviews.length;
    for (const review of product.customerReviews) {
      totalRating += review.rating;
    }
    const overallRating = reviewsCount > 0 ? totalRating / reviewsCount : 0;

    res.status(200).json({
      success: true,
      data: {
        productId: product._id,
        overallRating,
        reviewsCount,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, error: "An error occurred while fetching product ratings" });
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
