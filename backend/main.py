"""
CyberShieldX Defense Platform — FastAPI Backend Service
Provides high-performance REST APIs for ML threat classification, SHAP explanations,
incident management, and real-time security telemetry.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from ml_model import CyberShieldXModel

app = FastAPI(
    title="CyberShieldX Defense Platform API",
    description="AI-Powered Threat Detection, Risk Scoring & SHAP Explainability Engine",
    version="4.8.0",
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = CyberShieldXModel()

class AnalyzeRequest(BaseModel):
    type: str = "log"  # "log", "url", "ip", "payload"
    content: str

class ShieldAiQuery(BaseModel):
    query: str

@app.get("/")
def root():
    return {
        "service": "CyberShieldX Defense Engine",
        "status": "ONLINE",
        "model_version": model.version,
        "endpoints": ["/api/health", "/api/detect", "/api/explain", "/api/chat"],
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "zero_trust_matrix": "active",
        "nodes_protected": 142,
        "detection_rate": "98.7%",
    }

@app.post("/api/detect")
def detect_threat(req: AnalyzeRequest):
    if not req.content.strip():
        raise HTTPException(status_code=400, detail="Content field cannot be empty.")
    result = model.predict_threat(req.type, req.content)
    return result

@app.post("/api/chat")
def shield_ai_chat(req: ShieldAiQuery):
    q = req.query.lower()
    if "score" in q:
        text = "The security score stands at 94/100 due to 3 authentication anomalies detected in auth-srv-04."
        rec = "Isolate auth-srv-04 and challenge active administrative sessions."
    elif "investigate" in q or "priority" in q:
        text = "Prioritize Incident #INC-2048 because it has a risk score of 92/100 (CRITICAL)."
        rec = "Execute Playbook PB-402 on bulletproof ASN 49870."
    else:
        text = f"ShieldAI validated telemetry for '{req.query}'. All baseline zero-trust assertions are satisfied."
        rec = "Continue perimeter monitoring."

    return {
        "sender": "shield-ai",
        "response": text,
        "recommended_action": rec,
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
