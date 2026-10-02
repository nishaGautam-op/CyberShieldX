# CyberShieldX Backend — ML Threat Detection & Explainability API

This directory contains the Python FastAPI backend and Machine Learning pipeline for CyberShieldX.

## Architecture Pipeline

```text
Telemetry / Ingress Log
          ↓
Feature Extraction & Tokenization
          ↓
XGBoost Classifier + Anomaly Isolation Forest
          ↓
Real-Time Risk Scoring (0–100)
          ↓
SHAP (Shapley Additive exPlanations) Game-Theoretic Attribution
          ↓
FastAPI JSON Response ➔ Next.js Command Center Frontend
```

## Setup & Running

```bash
# 1. Create and activate a Python virtual environment
python -m venv venv
venv\Scripts\activate  # On Windows

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the FastAPI server
python main.py
# Or with uvicorn:
uvicorn main:app --reload --port 8000
```

## API Endpoints

* `GET /api/health` — Platform telemetry status and protected node counts.
* `POST /api/detect` — Ingests security logs, URLs, IPs, or raw payloads to compute risk scores, confidence, and SHAP feature importance vectors.
* `POST /api/chat` — Neural conversational interface for the **ShieldAI** assistant.
