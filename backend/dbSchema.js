import express from "express";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema=new Schema({
    username:String,
    password:String,

})

const GameSessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  house: {
    type: String,
    required: false,
  },
  selectedAllies: [String],
  coins: {
    type: Number,
    default: 100,
  },
  totalAllies: {
    type: Number,
    default: 0,
  },
  loyalty: Number,
  power: Number,
  betrayal: Number,
  diplomacy: Number,
  stability: Number,
  honor: Number,
  wealth: Number,
  totalPoints: {
    type: Number,
    default: 0,
  },
  currentQuestion: {
    type: Number,
    default: 1,
  },
  survivePrediction: {
    type: String,
    enum: ["Yes", "No", "Pending"],
    default: "Pending",
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  endedAt: Date,
});

const UserModal=mongoose.model("User",UserSchema);
const GameSessionModal=mongoose.model("GameSession",GameSessionSchema);

export { UserModal, GameSessionModal };

