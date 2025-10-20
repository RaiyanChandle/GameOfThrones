import express from "express";
import {GameSessionModal} from "../dbSchema.js";

// update stats and decision (current question)
const updateStatsAndDecision = async (req, res) => {
    try {
        const userId = req.user._id;
        const { currentQuestion, effects } = req.body;
        const gameSession = await GameSessionModal.findOne({ userId, isCompleted: false });
        if (!gameSession) {
            return res.status(404).json({ message: "No active game session found" });
        }
        // Apply effects to stats
        if (effects) {
            for (const [stat, value] of Object.entries(effects)) {
                gameSession[stat] = (gameSession[stat] || 0) + value;
            }
        }
        // Update question number
        if (currentQuestion) {
            gameSession.currentQuestion = currentQuestion;
        }
        await gameSession.save();
        res.status(200).json({ message: "Stats and current question updated", gameSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// update decision (current question)
const updateDecision = async (req, res) => {
    try {
        const userId = req.user._id;
        const { currentQuestion } = req.body;
        const gameSession = await GameSessionModal.findOneAndUpdate(
            { userId, isCompleted: false },
            { currentQuestion },
            { new: true }
        );
        if (!gameSession) {
            return res.status(404).json({ message: "No active game session found" });
        }
        res.status(200).json({ message: "Current question updated", gameSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


//start game
const startGame = async (req, res) => {
    try {
        const userId=req.user._id;
        const { house } = req.body;
        // Find and end all incomplete games
        const existingGames=await GameSessionModal.find({userId, isCompleted: false});
        if(existingGames.length > 0){
            for(const game of existingGames){
                game.endedAt=Date.now();
                game.isCompleted=true;
                await game.save();
            }
        }
        const gameSession = await GameSessionModal.create({userId, house });
        res.status(201).json({ message: "Game session started successfully", gameSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//set house
const setHouse = async (req, res) => {
    try {
        const userId=req.user._id;
        const { house,betrayal,loyalty,power,diplomacy,wealth,stability,honor } = req.body;
        const gameSession = await GameSessionModal.findOneAndUpdate({userId,isCompleted:false}, {house,betrayal,loyalty,power,diplomacy,wealth,stability,honor},{new:true});
        res.status(200).json({ message: "House set successfully", gameSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//get game session
const getGameSession = async (req, res) => {
    try {
        const userId=req.user._id;
        const gameSession = await GameSessionModal.findOne({userId,isCompleted:false});
        if(!gameSession){
            return res.status(404).json({ message: "No active game session found" });
        }
        res.status(200).json({ gameSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//add ally
const addAlly = async (req, res) => {
    try {
        const userId=req.user._id;
        const { allyName, cost, positive, negative } = req.body;
        
        const gameSession = await GameSessionModal.findOne({userId,isCompleted:false});
        if(!gameSession){
            return res.status(404).json({ message: "No active game session found" });
        }
        
        // Check if ally already added
        if(gameSession.selectedAllies.includes(allyName)){
            return res.status(400).json({ message: "Ally already added" });
        }
        
        // Check if enough coins
        if(gameSession.coins < cost){
            return res.status(400).json({ message: "Not enough coins" });
        }
        
        // Deduct coins
        gameSession.coins -= cost;
        
        // Add ally
        gameSession.selectedAllies.push(allyName);
        gameSession.totalAllies += 1;
        
        // Update stats
        gameSession.loyalty = (gameSession.loyalty || 0) + (positive.loyalty || 0) + (negative.loyalty || 0);
        gameSession.power = (gameSession.power || 0) + (positive.power || 0) + (negative.power || 0);
        gameSession.betrayal = (gameSession.betrayal || 0) + (positive.betrayal || 0) + (negative.betrayal || 0);
        gameSession.diplomacy = (gameSession.diplomacy || 0) + (positive.diplomacy || 0) + (negative.diplomacy || 0);
        gameSession.stability = (gameSession.stability || 0) + (positive.stability || 0) + (negative.stability || 0);
        gameSession.honor = (gameSession.honor || 0) + (positive.honor || 0) + (negative.honor || 0);
        gameSession.wealth = (gameSession.wealth || 0) + (positive.wealth || 0) + (negative.wealth || 0);
        
        await gameSession.save();
        res.status(200).json({ message: "Ally added successfully", gameSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//remove ally
const removeAlly = async (req, res) => {
    try {
        const userId=req.user._id;
        const { allyName, cost, positive, negative } = req.body;
        
        const gameSession = await GameSessionModal.findOne({userId,isCompleted:false});
        if(!gameSession){
            return res.status(404).json({ message: "No active game session found" });
        }
        
        // Check if ally exists
        if(!gameSession.selectedAllies.includes(allyName)){
            return res.status(400).json({ message: "Ally not found in your list" });
        }
        
        // Refund coins
        gameSession.coins += cost;
        
        // Remove ally
        gameSession.selectedAllies = gameSession.selectedAllies.filter(ally => ally !== allyName);
        gameSession.totalAllies -= 1;
        
        // Reverse stats
        gameSession.loyalty = (gameSession.loyalty || 0) - (positive.loyalty || 0) - (negative.loyalty || 0);
        gameSession.power = (gameSession.power || 0) - (positive.power || 0) - (negative.power || 0);
        gameSession.betrayal = (gameSession.betrayal || 0) - (positive.betrayal || 0) - (negative.betrayal || 0);
        gameSession.diplomacy = (gameSession.diplomacy || 0) - (positive.diplomacy || 0) - (negative.diplomacy || 0);
        gameSession.stability = (gameSession.stability || 0) - (positive.stability || 0) - (negative.stability || 0);
        gameSession.honor = (gameSession.honor || 0) - (positive.honor || 0) - (negative.honor || 0);
        gameSession.wealth = (gameSession.wealth || 0) - (positive.wealth || 0) - (negative.wealth || 0);
        
        await gameSession.save();
        res.status(200).json({ message: "Ally removed successfully", gameSession });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export {startGame,setHouse,getGameSession,addAlly,removeAlly,updateDecision,updateStatsAndDecision};