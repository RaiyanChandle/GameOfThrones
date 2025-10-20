from flask import Flask, request, jsonify
from flask_cors import CORS  # 👈 import this
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)  # 👈 this enables CORS for all routes

# OR to restrict:
# CORS(app, origins=["http://localhost:5173"])

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
    app.run(debug=True)
