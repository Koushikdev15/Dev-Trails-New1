# HustleGuard: Database Schema

This document outlines the core PostgreSQL and MongoDB database schema for the HustleGuard MVP.

## 1. Relational DB (PostgreSQL)

### `workers` Table
Core identities for gig workers.
- `id` (UUID, PK)
- `phone_number` (String, Unique)
- `full_name` (String)
- `aadhaar_hash` (String, encrypted KYC)
- `occupation` (Enum: DELIVERY, CONSTRUCTION, DOMESTIC, RIDE_HAIL)
- `status` (Enum: PENDING_KYC, ACTIVE, SUSPENDED)
- `trust_score` (Int: 0-100)
- `created_at` (Timestamp)
- `updated_at` (Timestamp)

### `worker_zones` Table
Maps workers to their primary operating zones for hyper-local pricing.
- `id` (UUID, PK)
- `worker_id` (UUID, FK -> `workers.id`)
- `pin_code` (String, 6-digit)
- `city` (String)
- `is_primary` (Boolean)

### `policies` Table
Tracks active coverage and premium schedules.
- `id` (UUID, PK)
- `worker_id` (UUID, FK -> `workers.id`)
- `start_date` (Date)
- `end_date` (Date)
- `coverage_tier` (Enum: TIER_1, TIER_2, TIER_3)
- `weekly_premium_inr` (Decimal)
- `status` (Enum: ACTIVE, LAPSED, CANCELLED)
- `risk_score_at_issuance` (Float)

### `claims` Table
Logs all parametric triggers and zero-touch claims.
- `id` (UUID, PK)
- `policy_id` (UUID, FK -> `policies.id`)
- `trigger_type` (Enum: WEATHER, AIR_QUALITY, TRAFFIC, CURFEW, HEALTH_ANOMALY)
- `event_data` (JSONB) - Holds details (e.g. `{"rainfall_mm": 115, "city": "Mumbai"}`)
- `claim_amount_inr` (Decimal)
- `status` (Enum: AUTO_INITIATED, APPROVED, PAID, REJECTED)
- `payout_tx_hash` (String)
- `created_at` (Timestamp)

---

## 2. NoSQL / Document Store (MongoDB)

### `risk_factors` Collection
Stores historical datasets and ML inputs fetched from 3rd party APIs for periodic modeling.
```json
{
  "_id": "ObjectId",
  "pin_code": "400053",
  "date": "2026-04-03",
  "weather_risk_index": 0.8,
  "aqi_avg": 310,
  "traffic_incident_count": 4,
  "crime_rate_index": 0.3
}
```

### `policy_documents` Collection
Stores immutable copies of generated documents (PDF URLs) and KYC scans.
```json
{
  "_id": "ObjectId",
  "worker_id": "UUID",
  "document_type": "AADHAAR_FRONT",
  "ipfs_hash": "Qm...",
  "s3_url": "https://s3.aws.com/hustleguard/doc.pdf",
  "uploaded_at": "ISODate"
}
```
