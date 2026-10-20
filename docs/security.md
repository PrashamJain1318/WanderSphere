# WanderSphere — Security Standards & Guidelines (Phase 0)

## 1. Core Principles

Security in WanderSphere is built on defense-in-depth, explicit validation, and zero-trust credentials management.

1. **Zero Secret Commits:** No API keys, passwords, database URIs, or tokens may ever be committed to git.
2. **Strict Environment Segregation:** Server secrets must never be prefixed with `NEXT_PUBLIC_`.
3. **Fail-Safe Logging:** Connection strings, tokens, and authorization headers are sanitized before logging.
4. **Input Defense:** Every incoming payload must be parsed and bounded by Zod schemas.

---

## 2. Secrets & Environment Variables

### 2.1 Server-Side vs Client-Side Separation

- All environment variables without the `NEXT_PUBLIC_` prefix are accessible **only** within Node.js runtime environments (`apps/api` or Next.js server components/route handlers).
- Never add `NEXT_PUBLIC_` to sensitive keys such as:
  - `MONGODB_URI`
  - `SESSION_SECRET`
  - `JWT_SECRET`
  - Third-party provider private API keys.

### 2.2 Connection String Sanitization

MongoDB connection strings often embed authentication credentials. The API's database connector (`apps/api/src/database/connection.ts`) enforces regular-expression credential redaction on all log lines:

```typescript
export function sanitizeMongoUri(uri: string): string {
  if (!uri) return '[not configured]';
  return uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@');
}
```

---

## 3. Network & Transport Security

### 3.1 HTTP Headers (Helmet)

The Express API mounts `helmet()` to enforce:

- `Content-Security-Policy`: Restricts resource injection.
- `Strict-Transport-Security`: Forces TLS encryption.
- `X-Frame-Options`: Prevents clickjacking (`DENY` or `SAMEORIGIN`).
- `X-Content-Type-Options`: Prevents MIME-type sniffing (`nosniff`).

### 3.2 Cross-Origin Resource Sharing (CORS)

- Permitted origins are loaded from `CORS_ORIGIN` (e.g., `http://localhost:3000` in local dev).
- Wildcards (`*`) are disallowed in production deployments.
- Exposed headers are restricted to `Content-Type`, `Authorization`, and `X-Request-Id`.

### 3.3 Denial of Service (DoS) Protections

- Express body parsers enforce a strict `1mb` maximum payload limit:
  ```typescript
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  ```
- Connection timeouts (`serverSelectionTimeoutMS`) ensure the server does not freeze on unresponsive database sockets.

---

## 4. Error Handling & Information Leakage

- In production (`NODE_ENV=production`), detailed stack traces and raw error messages are scrubbed from HTTP responses.
- Internal error objects are logged server-side with their corresponding `X-Request-Id`, while clients receive a generic `INTERNAL_SERVER_ERROR` payload.

---

## 5. Security Checklist for Development

- [x] All `.env*` files (except `.env.example`) are in `.gitignore`.
- [x] No fake mock authentication is implemented.
- [x] Zod validation guards all environment variable parsing at startup.
- [x] Prettier, ESLint, and TypeScript strict checks run in CI.
- [x] Database health checks perform an authenticated ping instead of assuming connectivity.
