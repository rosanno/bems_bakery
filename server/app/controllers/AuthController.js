import { generateToken } from "../helpers/generateToken.js";
import User from "../models/userSchema.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    const foundEmail = await User.findOne({ email });

    if (foundEmail) return res.status(302).json({ message: "Email already registered" });

    if (!name || !email || !address || !password)
      return res.status(400).json({ message: "Fields required" });

    const hashPasssword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      addresses: { address },
      password: hashPasssword,
    });

    const accessToken = generateToken(newUser, "2d");
    const refreshToken = generateToken(newUser, "4d");

    newUser.refreshToken = { token: refreshToken };
    const user = await newUser.save();

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        samteSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({ user, accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).jsom({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    const isPasswordMatch = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordMatch) return res.status(404).json({ message: "Invalid password" });

    if (!foundUser) {
      return res.status(404).json({ message: "Invalid credentials" });
    } else {
      const accessToken = generateToken(foundUser, "2d");
      const refreshToken = generateToken(foundUser, "4d");

      foundUser.refreshToken = { token: refreshToken };
      await foundUser.save();
      const { password, ...user } = foundUser._doc;

      res
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: true,
          samteSite: "None",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(201)
        .json({ user, accessToken });
    }
  } catch (error) {
    console.log(error);
    res.status(500).jsom({ message: "Internal server error" });
  }
};
