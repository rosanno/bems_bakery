import Ingredient from "../models/ingredient.js";
import paginateResults from "../utils/pagination.js";
import searchResults from "../utils/search.js";

export const createIngredient = async (req, res) => {
  try {
    const { ingredient } = req.body;

    const newIngredient = new Ingredient({ name: ingredient });

    const result = await newIngredient.save();

    res.status(201).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getIngredients = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const search = req.query.search || "";

  try {
    let results;
    let totalCount;

    if (search) {
      // Use the search utility function for searching ingredients
      ({ results, totalCount } = await searchResults(Ingredient, "name", search, page, perPage));
    } else {
      // Use the pagination utility function for regular pagination
      ({ results, totalCount } = await paginateResults(Ingredient, page, perPage));
    }

    const totalPages = Math.ceil(totalCount / perPage);

    res.status(200).json({ ingredients: results, total: totalCount, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getIngredient = async (req, res) => {
  try {
    const { id } = req.params;

    const ingredient = await Ingredient.findOne({ _id: id });

    res.status(200).json({ ingredient });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateIngredient = async (req, res) => {
  try {
    const { id } = req.params;

    const foundIngredient = await Ingredient.findById({ _id: id });

    if (!foundIngredient) return res.status(404).json({ message: "Ingredient not found" });

    const ingredient = await Ingredient.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({ ingredient });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteIngredient = async (req, res) => {
  try {
    const { id } = req.params;

    const foundIngredient = await Ingredient.findById({ _id: id });

    if (!foundIngredient) return res.status(404).json({ message: "Ingredient not found" });

    await Ingredient.findByIdAndDelete({ _id: id });

    res.json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
