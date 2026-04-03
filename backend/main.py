from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time

app = FastAPI(title="HustleGuard API", description="AI-driven parametric insurance backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mocked Data Base
worker_policies = {}
claims_db = []

class WorkerData(BaseModel):
    name: str
    phone: str
    city: str
    pin_code: str
    occupation: str

class PremiumResponse(BaseModel):
    base_premium: float
    risk_multiplier: float
    final_premium: float
    discount_applied: float
    explanation: str

@app.get("/")
def read_root():
    return {"status": "ok", "message": "HustleGuard API is running on FastAPI"}

@app.post("/api/premium/calculate", response_model=PremiumResponse)
def calculate_premium(worker: WorkerData):
    # Simulated ML premium generation for speed in MVP
    # In production, this would load premium_model.pkl
    base = 30.0
    risk_factor = random.uniform(0.5, 1.8)
    
    # Adjust based on occupation
    occ_map = {"DELIVERY": 1.2, "CONSTRUCTION": 1.4, "DOMESTIC": 0.9}
    occ_mul = occ_map.get(worker.occupation.upper(), 1.0)
    
    # Adjust based on city
    if worker.city.upper() in ["MUMBAI", "CHENNAI"]:
        risk_factor += 0.3  # Flood risks
    
    raw_premium = (base * occ_mul) * risk_factor
    discount = 0.0
    
    # Explainable AI rule simulation
    explanation = f"Base rate applied for {worker.occupation}. "
    if risk_factor > 1.2:
        explanation += f"Your area {worker.pin_code} has higher structural risks right now. "
    else:
        discount = 5.0
        raw_premium -= discount
        explanation += f"Safeguard discount of ₹{discount} applied for low historic incident rate. "
        
    return PremiumResponse(
        base_premium=base,
        risk_multiplier=round(risk_factor, 2),
        final_premium=round(max(raw_premium, 20.0), 2),
        discount_applied=discount,
        explanation=explanation
    )

class WebhookTrigger(BaseModel):
    trigger_type: str
    location_pin: str
    severity: float
    description: str

def process_automated_claim(trigger: WebhookTrigger):
    # This task runs in the background. It finds workers in the affected zone.
    # We simulate sending WhatsApp / SMS automation
    time.sleep(2)
    print(f"AUTOMATED CLAIM INITIATED: Zero-touch payout for {trigger.trigger_type} in {trigger.location_pin}")
    claims_db.append({
        "status": "AUTO_INITIATED",
        "trigger": trigger.trigger_type,
        "pin_code": trigger.location_pin,
        "amount": 500  # Rs 500 fixed daily payout
    })

@app.post("/api/triggers/weather")
def weather_webhook(trigger: WebhookTrigger, background_tasks: BackgroundTasks):
    """
    Called by OpenWeatherMap APIs when flooding > threshold.
    """
    if trigger.severity < 0.8:
        return {"status": "ignored", "reason": "Severity below payout threshold"}
        
    background_tasks.add_task(process_automated_claim, trigger)
    return {"status": "processing", "message": f"Zero-touch claim pipeline activated for {trigger.location_pin}"}

@app.get("/api/claims/recent")
def recent_claims():
    return claims_db
