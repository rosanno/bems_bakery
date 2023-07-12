import Category from "../models/productCategorySchema.js";

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
  try {
    const categories = await Category.find();

    res.status(200).json({ categories });
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
