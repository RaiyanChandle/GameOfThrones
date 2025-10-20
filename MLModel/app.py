from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)  # you can restrict origins if needed

model = joblib.load("got_survival_lr_model.joblib")

@app.route("/")
def home():
    return "ML Model API is running 🚀"

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        df = pd.DataFrame([data["data"]])
        prediction = model.predict(df)
        return jsonify({"prediction": str(prediction[0])})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
