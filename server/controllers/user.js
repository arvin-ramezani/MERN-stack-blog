import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    // If we already have an existing user
    if (existingUser)
      return res.status(400).json({ message: "User already exist" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const accessToken = generateAccessToken({
      email: user.email,
      id: user._id,
    });

    res.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //   If user already exists
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(404).json({ message: "User dosn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Your password is incorrect." });

    const accessToken = generateAccessToken({
      email: existingUser.email,
      id: existingUser._id,
    });

    res.status(200).json({
      user: {
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
      },
      accessToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

// GENERATE ACCESS TOKEN FUNCTION
const generateAccessToken = (userData) => {
  return jwt.sign(
    { email: userData.email, id: userData.id },
    process.env.ACCESS_TOKEN_SECRET_KEY
  );
};
