# 🛡️ Security Policy

## Overview
Spotlight prioritizes security, data privacy, and secure authentication standards across its fullstack architecture.

## Core Security Implementations

1. **Authentication & Token Management**:
   - JSON Web Tokens (JWT) signed with HMAC SHA-256 algorithm.
   - User passwords salt-hashed using `bcryptjs` before database persistence.

2. **Environment Variable Protection**:
   - Secrets (`MONGO_URI`, `JWT_SECRET`, `CLOUD_API_SECRET`) are isolated in environment variables (`.env`).
   - `.env` files are explicitly excluded via `.gitignore` to prevent secret exposure on public version control.

3. **CORS & HTTP Security**:
   - Express server enforces Cross-Origin Resource Sharing (CORS) security headers.
   - Input sanitization and Mongoose strict querying to prevent Injection attacks.

4. **Media Pipeline Safeguards**:
   - Cloudinary SDK enforces secure HTTPS media transport and MIME-type validation.

## Reporting a Vulnerability

If you discover a potential security vulnerability within this repository, please report it by opening a private security advisory or contacting the maintainers directly.
