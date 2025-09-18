# Gooyar API Integration Documentation

## Overview

This document describes the API integration between the Gooyar frontend (Next.js) and backend (Node.js/Express) applications. The integration provides full CRUD operations for managing agents, knowledge bases, processes, and contact points.

## Backend APIs

### Base URL

```
http://localhost:3001/api/v1
```

### 1. Agents API

**Base Endpoint:** `/agents`

- `GET /agents` - Get all agents
- `GET /agents/:id` - Get agent by ID
- `POST /agents` - Create new agent
- `PUT /agents/:id` - Update agent
- `DELETE /agents/:id` - Delete agent

**Agent Model:**

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "type": "string",
  "status": "active|inactive",
  "created_at": "ISO string",
  "updated_at": "ISO string"
}
```

### 2. Knowledge Base API

**Base Endpoint:** `/knowledge-base`

- `GET /knowledge-base` - Get all knowledge bases
- `GET /knowledge-base/:id` - Get knowledge base by ID
- `POST /knowledge-base` - Create new knowledge base
- `PUT /knowledge-base/:id` - Update knowledge base
- `DELETE /knowledge-base/:id` - Delete knowledge base

**Knowledge Base Data Management:**

- `GET /knowledge-base/:id/data` - Get data for a knowledge base
- `POST /knowledge-base/:id/data` - Add data to knowledge base
- `PUT /knowledge-base/:id/data/:dataId` - Update knowledge base data
- `DELETE /knowledge-base/:id/data/:dataId` - Delete knowledge base data
- `POST /knowledge-base/:id/data/:dataId/sync` - Sync knowledge base data

### 3. Processes API

**Base Endpoint:** `/processes`

- `GET /processes` - Get all processes
- `GET /processes/:id` - Get process by ID
- `POST /processes` - Create new process
- `PUT /processes/:id` - Update process
- `DELETE /processes/:id` - Delete process
- `PATCH /processes/:id/toggle-status` - Toggle process status
- `GET /processes/:id/stats` - Get process statistics

### 4. Contact Points API

**Base Endpoint:** `/contact-points`

#### Phone Numbers

- `GET /contact-points/phone-numbers` - Get all phone numbers
- `POST /contact-points/phone-numbers` - Add phone number
- `PUT /contact-points/phone-numbers/:id` - Update phone number
- `DELETE /contact-points/phone-numbers/:id` - Delete phone number
- `POST /contact-points/phone-numbers/send-otp` - Send OTP
- `POST /contact-points/phone-numbers/verify-otp` - Verify OTP

#### WhatsApp

- `GET /contact-points/whatsapp` - Get all WhatsApp accounts
- `POST /contact-points/whatsapp` - Add WhatsApp account
- `GET /contact-points/whatsapp/:id/qr-code` - Get QR code
- `GET /contact-points/whatsapp/:id/status` - Check connection status

#### Telegram

- `GET /contact-points/telegram` - Get all Telegram accounts
- `POST /contact-points/telegram` - Add Telegram account
- `GET /contact-points/telegram/:id/qr-code` - Get QR code
- `GET /contact-points/telegram/:id/status` - Check connection status

#### Instagram

- `GET /contact-points/instagram` - Get all Instagram accounts
- `POST /contact-points/instagram` - Add Instagram account
- `GET /contact-points/instagram/:id/status` - Check connection status

## Frontend Integration

### API Services Structure

The frontend uses a service layer pattern for API communication:

```
apps/gooyar-front/api/services/
├── agentsServices/
│   ├── index.tsx          # Service functions
│   └── models.ts          # TypeScript interfaces
├── knowledgeBaseServices/
│   ├── index.tsx          # Service functions
│   └── models.ts          # TypeScript interfaces
├── processesServices/
│   ├── index.tsx          # Service functions
│   └── models.ts          # TypeScript interfaces
└── contactPointsServices/
    ├── index.tsx          # Service functions
    └── models.ts          # TypeScript interfaces
```

### Configuration

Set the backend API URL in your frontend environment:

```bash
# .env.local
NEXT_PUBLIC_BASE_API_URL=http://localhost:3001
```

### Usage Example

```typescript
import {
  getAgentsService,
  createAgentService,
} from "@/api/services/agentsServices";

// Get all agents
const agents = await getAgentsService();

// Create new agent
const newAgent = await createAgentService({
  name: "My Agent",
  description: "Agent description",
  type: "chat",
});
```

## Component Integration

### Agents Page

- **File:** `apps/gooyar-front/containers/dashboard/agents/index.tsx`
- **Features:** List, create, edit, delete agents
- **Connected APIs:** All agent endpoints

### Knowledge Base Page

- **File:** `apps/gooyar-front/containers/dashboard/knowledgeBase/index.tsx`
- **Features:** Manage knowledge bases and their data
- **Connected APIs:** All knowledge base and data endpoints

### Processes Page

- **File:** `apps/gooyar-front/containers/dashboard/processes/index.tsx`
- **Features:** Manage AI processes and workflows
- **Connected APIs:** All process endpoints

### Contact Points Page

- **File:** `apps/gooyar-front/containers/dashboard/contacPointes/`
- **Features:** Manage phone numbers, WhatsApp, Telegram, Instagram accounts
- **Connected APIs:** All contact point endpoints

## Error Handling

All API calls include comprehensive error handling with user-friendly toast notifications:

```typescript
try {
  const response = await getAgentsService();
  if (response?.success) {
    // Handle success
  } else {
    toast.error("Failed to load agents");
  }
} catch (error) {
  console.error("Error loading agents:", error);
  toast.error("Failed to load agents");
}
```

## Testing

### Backend API Testing

Run the test script to verify all APIs are working:

```bash
cd apps/gooyar-back
node test-apis.js
```

### Manual Testing

1. Start the backend server:

   ```bash
   cd apps/gooyar-back
   npm run dev
   ```

2. Start the frontend server:

   ```bash
   cd apps/gooyar-front
   npm run dev
   ```

3. Navigate to the dashboard pages and test the functionality:
   - Agents: Create, edit, delete agents
   - Knowledge Base: Create knowledge bases and add data
   - Processes: Create and manage processes
   - Contact Points: Add and manage contact methods

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error information"
}
```

### List Response

```json
{
  "success": true,
  "data": [ ... ],
  "total": 10
}
```

## Next Steps

1. **Database Integration:** Replace mock data with a real database (MongoDB, PostgreSQL)
2. **Authentication:** Add JWT-based authentication
3. **File Upload:** Implement file upload for knowledge base data
4. **Real-time Updates:** Add WebSocket support for real-time data updates
5. **Validation:** Add input validation on both frontend and backend
6. **Testing:** Add unit and integration tests
7. **Documentation:** Add API documentation with Swagger/OpenAPI

## Troubleshooting

### Common Issues

1. **CORS Errors:** Ensure the backend CORS configuration allows the frontend origin
2. **API Not Found:** Check that the backend server is running on the correct port
3. **Environment Variables:** Verify that `NEXT_PUBLIC_BASE_API_URL` is set correctly
4. **Network Errors:** Check firewall settings and ensure both servers can communicate

### Debug Mode

Enable debug logging by setting:

```bash
DEBUG=true
```

This will provide detailed logs of API requests and responses.
