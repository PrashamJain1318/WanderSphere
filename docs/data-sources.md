# WanderSphere — Data Sources & Persistence Strategy (Phase 0)

## 1. Primary Persistence: Cloud & Local MongoDB

WanderSphere uses MongoDB as its primary document datastore via Mongoose.

### 1.1 Local Development Setup

#### Option A: Local MongoDB (Community Edition)

1. Install MongoDB via Homebrew (macOS):
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community@7.0
   brew services start mongodb-community@7.0
   ```
2. Set in `.env`:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/wandersphere_dev
   MONGODB_REQUIRED=false
   ```

#### Option B: Docker

```bash
docker run -d --name wandersphere-mongo -p 27017:27017 -v mongo_data:/data/db mongo:7.0
```

#### Option C: MongoDB Atlas (Free Tier)

1. Create a free M0 cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user with read/write permissions.
3. Whitelist your local IP address under "Network Access".
4. Copy the connection string into your `.env`:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/wandersphere?retryWrites=true&w=majority
   MONGODB_REQUIRED=false
   ```

---

## 2. Phase 0 Readiness Behavior

In Phase 0:

- If `MONGODB_URI` is empty, the API logs an informational message and boots in database-independent mode.
- The `/api/v1/health` endpoint reports `checks.database.status = "not_configured"`.
- If `MONGODB_URI` is populated, the connector executes an authenticated `admin.ping()`. If reachable, it reports `checks.database.status = "healthy"`.

---

## 3. Future External Data Sources Roadmap (Phase 2+)

To ensure genuine, high-quality travel data across India and international destinations, the following data sources are planned:

| Data Provider                                        | Domain           | Phase   | Usage                                                                |
| :--------------------------------------------------- | :--------------- | :------ | :------------------------------------------------------------------- |
| **National Train Inquiry System (NTIS / IRCTC)**     | Transit (India)  | Phase 2 | Real-time schedules and station routes for Indian Railways.          |
| **OpenWeatherMap / IMD (India Meteorological Dept)** | Climate & Safety | Phase 2 | Mountain pass weather, monsoon warnings, and optimal season indices. |
| **OpenStreetMap / Mapbox**                           | Geodata & Routes | Phase 2 | Waypoint routing, elevation profiles, and offline map vectors.       |
| **Amadeus / Skyscanner APIs**                        | Flight Schedules | Phase 3 | Indicative transit times and pricing benchmarks between major hubs.  |

All third-party data integrations will pass through server-side caching proxies with strict TTLs and circuit breakers to avoid third-party downtime cascading into user interfaces.
