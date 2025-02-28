import pandas as pd
import numpy as np
from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Define the number of questions
NUM_QUESTIONS = 50
FEATURE_COLUMNS = [f'Q{i+1}' for i in range(NUM_QUESTIONS)]

# Define readiness level based on score
def determine_level(score):
    if score < 20:
        return 'Beginner'
    elif score < 40:
        return 'Basic'
    elif score < 60:
        return 'Intermediate'
    elif score < 80:
        return 'Advanced'
    else:
        return 'Expert'

# Load dataset and train model
def train_model():
    if not os.path.exists('training_data.csv'):
        raise FileNotFoundError("Dataset 'training_data.csv' not found!")
    
    df = pd.read_csv('training_data.csv')
    
    X = df[FEATURE_COLUMNS]
    y = df['Readiness_Score']

    model = RandomForestRegressor(n_estimators=50, random_state=42)
    model.fit(X, y)
    return model

model = train_model()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        if not isinstance(data, dict) or 'responses' not in data:
            return jsonify({'status': 'error', 'error': 'Invalid request format'}), 400
        
        responses = data.get('responses', [])
        
        if not isinstance(responses, list) or len(responses) != NUM_QUESTIONS:
            return jsonify({'status': 'error', 'error': f'Responses must be an array of {NUM_QUESTIONS} binary values'}), 400
        
        input_data = {feature: responses[i] for i, feature in enumerate(FEATURE_COLUMNS)}
        input_df = pd.DataFrame([input_data])
        
        score = model.predict(input_df)[0]
        score = round(score, 1)
        level = determine_level(score)

        return jsonify({
            'status': 'success',
            'score': score,
            'level': level
        })
    except Exception as e:
        return jsonify({'status': 'error', 'error': f'Error processing request: {str(e)}'}), 400

@app.route('/test', methods=['GET'])
def test():
    return jsonify({'status': 'success', 'message': 'API is working'})

if __name__ == '__main__':
    app.run(debug=True)