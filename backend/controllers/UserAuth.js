import express from "express";
import {UserModal} from "../dbSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModal.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser= await UserModal.create({ username, password:bcrypt.hashSync(password, 10) });
        const token=jwt.sign({_id:newUser._id},"secretKey");

        res.status(201).json({ message: "User registered successfully",token:token });
    } catch (error) {   
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModal.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token=jwt.sign({_id:user._id},"secretKey");
        res.status(200).json({ message: "User logged in successfully",token:token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export { register, login };

