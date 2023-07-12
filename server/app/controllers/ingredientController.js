import Ingredient from "../models/productIngredientSchema.js";

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
  try {
    const ingredients = await Ingredient.find();

    res.status(200).json({ ingredients });
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

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
