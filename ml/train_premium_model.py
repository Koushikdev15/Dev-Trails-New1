import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib
import json

def generate_synthetic_data(num_samples=5000):
    """Generates synthetic dataset for gig worker insurance premiums."""
    
    np.random.seed(42)
    
    cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai']
    occupations = ['DELIVERY', 'CONSTRUCTION', 'DOMESTIC', 'RIDE_HAIL']
    
    data = {
        'age': np.random.randint(18, 55, num_samples),
        'city': np.random.choice(cities, num_samples),
        'occupation': np.random.choice(occupations, num_samples),
        'historical_accidents_in_zone': np.random.randint(0, 50, num_samples),
        'flood_risk_score': np.random.uniform(0, 1, num_samples),  # 0 to 1
        'aqi_average': np.random.randint(50, 400, num_samples),
        'weekly_hours_active': np.random.randint(15, 70, num_samples),
        'safety_training_completed': np.random.choice([0, 1], num_samples, p=[0.7, 0.3])
    }
    
    df = pd.DataFrame(data)
    
    # Calculate base premium logic to synthesize the target variable
    # Base premium is 30 INR
    base = 30
    
    # Occupation multiplier
    occ_multiplier = df['occupation'].map({'DELIVERY': 1.2, 'CONSTRUCTION': 1.4, 'DOMESTIC': 0.9, 'RIDE_HAIL': 1.3})
    
    # Risk factor addition
    risk_addition = (df['flood_risk_score'] * 15) + (df['aqi_average'] / 50) + (df['historical_accidents_in_zone'] * 0.2)
    
    # Discounts
    discount = df['safety_training_completed'] * 5 
    
    df['target_weekly_premium'] = (base * occ_multiplier) + risk_addition - discount
    # Add some noise
    df['target_weekly_premium'] += np.random.normal(0, 2, num_samples)
    
    # Floor at physical minimum
    df['target_weekly_premium'] = df['target_weekly_premium'].clip(lower=20).round(2)
    
    return df

def train_model():
    print("Generating synthetic data...")
    df = generate_synthetic_data()
    
    # Preprocessing
    le_city = LabelEncoder()
    le_occ = LabelEncoder()
    
    df['city_enc'] = le_city.fit_transform(df['city'])
    df['occ_enc'] = le_occ.fit_transform(df['occupation'])
    
    features = [
        'age', 'city_enc', 'occ_enc', 
        'historical_accidents_in_zone', 'flood_risk_score', 
        'aqi_average', 'weekly_hours_active', 'safety_training_completed'
    ]
    
    X = df[features]
    y = df['target_weekly_premium']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Regressor...")
    model = RandomForestRegressor(n_estimators=100, max_depth=10, random_state=42)
    model.fit(X_train, y_train)
    
    score = model.score(X_test, y_test)
    print(f"Model R^2 Score: {score:.3f}")
    
    # Save Feature Importances
    importances = list(zip(features, model.feature_importances_))
    importances.sort(key=lambda x: x[1], reverse=True)
    
    print("\nFeature Importances:")
    for feature, imp in importances:
        print(f"{feature}: {imp:.4f}")
        
    # Save the model and encoders
    print("\nSaving artifacts...")
    joblib.dump(model, 'premium_model.pkl')
    joblib.dump(le_city, 'le_city.pkl')
    joblib.dump(le_occ, 'le_occ.pkl')
    print("Training complete! Model saved to premium_model.pkl")

if __name__ == "__main__":
    train_model()
