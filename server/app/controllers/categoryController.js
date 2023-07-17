import Category from "../models/category.js";
import paginateResults from "../utils/pagination.js";
import searchResults from "../utils/search.js";

export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const newCategory = new Category({ name: category });

    const result = await newCategory.save();

    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategories = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const search = req.query.search || "";

  try {
    let results;
    let totalCount;

    if (search) {
      // Use the search utility function for searching ingredients
      ({ results, totalCount } = await searchResults(Category, "name", search, page, perPage));
    } else {
      // Use the pagination utility function for regular pagination
      ({ results, totalCount } = await paginateResults(Category, page, perPage));
    }

    const totalPages = Math.ceil(totalCount / perPage);

    res.status(200).json({ categories: results, total: totalCount, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({ _id: id });

    res.status(200).json({ category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const foundCategory = await Category.findById({ _id: id });

    if (!foundCategory) return res.status(404).json({ message: "Category not found" });

    const category = await Category.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({ category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const foundCategory = await Category.findById({ _id: id });

    if (!foundCategory) return res.status(404).json({ message: "Category not found" });

    await Category.findByIdAndDelete({ _id: id });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
