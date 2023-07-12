import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userFound = await User.findById({ _id: userId });
    const { password, ...user } = userFound._doc;

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).jsom({ message: "Internal server error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    if (!name || !email || !address || !password)
      return res.status(400).json({ message: "Fields required" });

    const hashPasssword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      addresses: { address },
      password: hashPasssword,
    });

    const user = await newUser.save();

    res.status(200).json({ user, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).jsom({ message: "Internal server error" });
  }
};

export const getAllUsers = async (req, res) => {};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};
