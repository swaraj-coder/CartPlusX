import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken, genToken1 } from "../config/token.js";

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid Email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Enter strong password" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });

    const token = await genToken(user._id);
    if (!token) {
      return res.status(500).json({ message: "Token generation failed" });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log("register error", error.message);
    return res.status(500).json({ message: `Register error: ${error.message}` });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password || "");
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log("Login error", error.message);
    return res.status(500).json({ message: `Login error: ${error.message}` });
  }
};

// Logout (fixed for Render)
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("LogOut error", error.message);
    return res.status(500).json({ message: `LogOut error: ${error.message}` });
  }
};

// Google Login
export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email });
    }

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log("googleLogin error", error.message);
    return res.status(500).json({ message: `googleLogin error: ${error.message}` });
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = await genToken1(email);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
      });
      return res.status(200).json(token);
    }

    return res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log("AdminLogin error", error.message);
    return res.status(500).json({ message: `AdminLogin error: ${error.message}` });
  }
};
