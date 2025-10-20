import express from "express";
import mongoose from "mongoose";

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/game_of_thrones", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
}

export default connectDB;
