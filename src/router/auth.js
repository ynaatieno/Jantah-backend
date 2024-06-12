import { Router } from "express";
import User from "../models/auth.js";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken";
export const router = Router();

//signup
router.post("/Register", async (req, res) => {
  const { fullName,phoneNumber, email, password,userType } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = new User({
      fullName,
      phoneNumber,
      email,
      password:hashedPassword,
      userType,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

// signin
router.post("/LogIn", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "User doesn't exists" });
      }
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }


  
      const { password: userPassword, ...otherInfo } = user._doc;
      console.log(otherInfo)

      const token =  jwt.sign(otherInfo, process.env.JWT_SECRET);
  
      console.log(token);
  
      res.status(200).json({ ...otherInfo, accessToken: token });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  });

  
