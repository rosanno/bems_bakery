import User from "../models/user.js";
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

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (typeof req.body.name === "string" && req.body.name.trim() !== "") {
      user.name = req.body.name;
    }

    if (typeof req.body.email === "string" && req.body.email.trim() !== "") {
      user.email = req.body.email;
    }

    if (typeof req.body.address === "string" && req.body.address.trim() !== "") {
      user.addresses.push({ address: req.body.address });
    }

    if (typeof req.body.password === "string" && req.body.password.trim() !== "") {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {};
