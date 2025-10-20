import React, { useState } from "react";
import axios from "axios";

const Prediction = () => {
    const [prediction, setPrediction] = useState()

    const predict = async () => {
        const response = await axios.post('http://127.0.0.1:5000/predict', {
            "data": {
                "house": "Stark",
                "total_allies": 1,
                "avg_loyalty": 6.13,
                "avg_power": 4.39,
                "avg_betrayal": 0.64,
                "diplomacy": 3.1,
                "stability": 6.6,
                "honor": 3.73,
                "wealth": 3.58
            }
        })
        setPrediction(response.data.prediction)
    }
    return (
        <div>
            <h1>Game of Thrones</h1>
            <button className="bg-blue-500 p-1 rounded-md" onClick={predict}>predict</button>
            <p>{prediction}</p>
        </div>
    )
}

export default Prediction;