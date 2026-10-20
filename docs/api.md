# WanderSphere — API Specification (Phase 0)

## 1. Overview & Conventions

All WanderSphere API endpoints are versioned under `/api/v1`. The API communicates using JSON over HTTP/HTTPS and follows strict RESTful conventions and shared Zod contracts defined in `@wandersphere/contracts`.

### 1.1 Base URLs

- **Local Development:** `http://localhost:4000/api/v1`
- **Staging / Production:** Defined via environment variables.

### 1.2 Headers

| Header         | Direction          | Description                                                                                                               |
| :------------- | :----------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `Content-Type` | Request / Response | Standard MIME type (`application/json`).                                                                                  |
| `X-Request-Id` | Request / Response | Unique UUIDv4 tracking identifier. If omitted by the caller, the API generates one and returns it in the response header. |

---

## 2. Endpoints

### 2.1 Health & Readiness Probe

#### `GET /api/v1/health`

Evaluates the internal health of the Node.js process and the readiness of external dependencies (MongoDB).

**Headers:**

- `X-Request-Id` _(Optional)_: Traced throughout the request cycle.

**Response Status Codes:**

- `200 OK`: System is healthy, or running safely in database-independent mode.
- `503 Service Unavailable`: A required dependency (e.g., MongoDB when `MONGODB_REQUIRED=true`) is offline or failing pings.

**Example 200 OK Response (Database Connected):**

```json
{
  "status": "ok",
  "service": "wandersphere-api",
  "version": "0.1.0",
  "environment": "development",
  "timestamp": "2026-10-20T21:45:00.000Z",
  "checks": {
    "database": {
      "status": "healthy",
      "latencyMs": 4,
      "message": "MongoDB ping verified"
    },
    "process": {
      "status": "healthy",
      "memoryUsageMb": 38.45,
      "uptimeSeconds": 128
    }
  }
}
```

**Example 200 OK Response (Database Unconfigured in Dev):**

```json
{
  "status": "ok",
  "service": "wandersphere-api",
  "version": "0.1.0",
  "environment": "development",
  "timestamp": "2026-10-20T21:45:00.000Z",
  "checks": {
    "database": {
      "status": "not_configured",
      "message": "MongoDB URI is not configured in environment"
    },
    "process": {
      "status": "healthy",
      "memoryUsageMb": 34.12,
      "uptimeSeconds": 42
    }
  }
}
```

**Example 503 Service Unavailable Response (MongoDB Required but Down):**

```json
{
  "status": "down",
  "service": "wandersphere-api",
  "version": "0.1.0",
  "environment": "production",
  "timestamp": "2026-10-20T21:45:00.000Z",
  "checks": {
    "database": {
      "status": "unhealthy",
      "message": "connection timeout"
    },
    "process": {
      "status": "healthy",
      "memoryUsageMb": 42.1,
      "uptimeSeconds": 15
    }
  }
}
```

---

## 3. Error Handling Contract

When an error occurs, the API returns a structured JSON payload conforming to `ApiErrorResponseSchema`.

### 3.1 Error Payload Schema

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "The requested resource 'GET /api/v1/invalid' does not exist.",
    "details": null,
    "requestId": "4fa7c89f-8641-4774-9b28-1b0be2bc0e52",
    "timestamp": "2026-10-20T21:45:00.000Z"
  }
}
```

### 3.2 Error Code Directory

| Error Code              | HTTP Status | Description                                     |
| :---------------------- | :---------- | :---------------------------------------------- |
| `BAD_REQUEST`           | 400         | Malformed request syntax or unparseable JSON.   |
| `VALIDATION_ERROR`      | 400         | Request body failed Zod schema validation.      |
| `UNAUTHORIZED`          | 401         | Authentication required or token expired.       |
| `FORBIDDEN`             | 403         | Insufficient permissions for resource.          |
| `NOT_FOUND`             | 404         | Endpoint or database entity does not exist.     |
| `METHOD_NOT_ALLOWED`    | 405         | HTTP method not supported for route.            |
| `CONFLICT`              | 409         | Resource state conflict (e.g., duplicate slug). |
| `SERVICE_UNAVAILABLE`   | 503         | Database or downstream dependency is offline.   |
| `INTERNAL_SERVER_ERROR` | 500         | Unhandled server exception.                     |

---

## 4. Operational Guardrails

- **Request Size Limiting:** Payload sizes are capped at `1mb` for both JSON and URL-encoded bodies.
- **CORS Rules:** Permitted origins are configured strictly via the `CORS_ORIGIN` environment variable.
- **Leak Prevention:** Stack traces and internal database connection URIs are stripped from responses in production.
