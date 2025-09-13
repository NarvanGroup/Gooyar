# Gooyar Monorepo

This is a monorepo containing a Next.js frontend and Express backend application, built with Turborepo.

## Project Structure

```
gooyar/
├── apps/
│   ├── frontend/     # Next.js 14 application
│   └── backend/      # Express API
├── packages/
│   ├── config/       # Shared ESLint and TypeScript configs
│   └── utils/        # Shared utility functions
└── package.json
```

## Prerequisites

- Node.js 18 or later
- Yarn 1.22 or later

## Getting Started

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Create environment files:
   - Create `apps/backend/.env` with:
     ```
     PORT=3001
     FRONTEND_URL=http://localhost:3000
     ```

3. Start the development servers:
   ```bash
   yarn dev
   ```

This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:3001

## Available Scripts

- `yarn dev` - Start all applications in development mode
- `yarn build` - Build all applications
- `yarn lint` - Run ESLint on all applications
- `yarn format` - Format all files with Prettier

## Features

- Next.js 14 frontend with Material UI
- Express backend with TypeScript
- Shared ESLint and TypeScript configurations
- Shared utility functions
- CORS enabled for frontend-backend communication
- Environment variable support with dotenv 