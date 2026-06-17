# Taesu's Blog

A personal blog built with React + TypeScript on the frontend and an Express + TypeORM + PostgreSQL backend. Authentication is passwordless: users sign in with **WebAuthn** (device biometrics / passkeys), and the API is protected with **JWT**.

## Contents

- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Local development](#local-development)
- [Testing](#testing)
- [Deploying to the VM](#deploying-to-the-vm)

## Tech stack

**Frontend**

- **React 18** + **TypeScript** (Create React App, customized via `react-app-rewired`)
- **React Router** for client-side routing
- **Bootstrap** / **react-bootstrap** for UI
- **axios** for API calls

**Backend**

- **Express** REST API (TypeScript, run with `ts-node` / `nodemon`)
- **TypeORM** with a **PostgreSQL** database
- **@simplewebauthn** — WebAuthn registration and authentication
- **jsonwebtoken** + **bcrypt** for auth tokens and password hashing

**Authentication**

- **WebAuthn** — lets users log in with biometrics/passkeys, so the browser stores the credential and the user doesn't have to remember a username and password.
- **JWT** — issued after login and used to authorize subsequent API requests.

## Project structure

```
src/
├── App.tsx              # App shell + routes
├── ApiPath.ts           # Frontend API endpoint constants
├── LandingPage/         # Landing/home view
├── create/              # Post creation view
├── BrowserRouter/       # Routing setup
├── test/                # ts-mocha tests
└── backend/
    ├── index.ts         # Express server entry (PORT 3333)
    ├── db/              # TypeORM data source
    ├── entities/        # User, Post, Authenticator entities
    ├── repositories/    # Data access (auth, posts, users)
    ├── routes/          # API routes: /auth, /post, /user
    ├── services/        # Business logic
    └── middleware.ts    # JWT authorization middleware
```

## Local development

Install dependencies:

```bash
npm install
```

Create a `.env` file with the database connection settings:

```
DB_USERNAME=postgres
DB_HOSTNAME=localhost
DB_DATABASE_NAME=blog
DB_PASSWORD=your_password
DB_PORT=5432
```

Run the backend (Express API on port `3333`):

```bash
npm run back-dev
```

Run the frontend (React dev server; requests proxy to the backend on `3333`):

```bash
npm start
```

> **Note:** This project pins TypeScript to `4.9.5`. Newer versions are known to break the build, so don't upgrade it.

## Testing

Tests run with `ts-mocha`:

```bash
npm test
```

## Deploying to the VM

The frontend is built locally and copied to the VM.

1. Build and secure-copy the production bundle to the VM:

   ```bash
   bash .build.bash
   ```

2. Serve the frontend from the VM:

   ```bash
   npm run prod-front
   ```

3. Start the backend on the VM:

   ```bash
   npm run prod-back
   ```
