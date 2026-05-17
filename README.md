
# GigFlow – Smart Leads Dashboard

A full-stack Lead Management Dashboard built with the MERN stack + TypeScript.

## Tech Stack

**Frontend:** React.js, TypeScript, TailwindCSS, Zustand, React Hook Form, Zod, Lucide React

**Backend:** Node.js, Express.js, TypeScript, MongoDB, Mongoose, JWT, bcrypt

**DevOps:** Docker, Docker Compose

## Features

- JWT Authentication with Register and Login
- Role-Based Access Control with Admin and Sales roles
- Full Leads CRUD with Create, Read, Update, Delete
- Advanced Filtering by Status, Source, Search query, and Sort order
- Backend Pagination with 10 records per page
- Debounced Search with 500ms delay
- CSV Export with current filters applied
- Dark Mode toggle
- Responsive Design for all screen sizes
- Loading and Empty states
- Form Validation with Zod schemas
- Centralized Error Handling

## Project Structure

```
gigflow/
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── leads/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── types/
│   │   └── utils/
│   ├── Dockerfile
│   └── .env.example
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── types/
│   ├── Dockerfile
│   └── .env.example
└── docker-compose.yml
```

## Local Development Setup

### Prerequisites

- Node.js 18 or higher
- MongoDB running locally
- npm

### Step 1 - Clone the repository

```bash
git clone <your-repo-url>
cd gigflow
```

### Step 2 - Setup Backend

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

Server runs on http://localhost:5000

### Step 3 - Setup Frontend

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Frontend runs on http://localhost:5173

## Docker Setup

Make sure Docker is installed, then run:

```bash
docker-compose up --build
```

App will be available at http://localhost

## Environment Variables

### Server (.env)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### Client (.env)

```
VITE_API_URL=http://localhost:5000/api
```

## API Documentation

### Auth Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |

### Leads Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | /api/leads | Get paginated leads | Yes |
| POST | /api/leads | Create new lead | Yes |
| GET | /api/leads/:id | Get single lead | Yes |
| PUT | /api/leads/:id | Update lead | Yes |
| DELETE | /api/leads/:id | Delete lead | Admin only |
| GET | /api/leads/export | Export leads as JSON | Yes |

### Query Parameters for GET /api/leads

| Parameter | Type | Description |
|-----------|------|-------------|
| page | number | Page number (default 1) |
| limit | number | Records per page (default 10) |
| status | string | Filter by status |
| source | string | Filter by source |
| search | string | Search by name or email |
| sort | string | latest or oldest |

## Lead Schema

```
name: string (required)
email: string (required)
status: New, Contacted, Qualified, Lost
source: Website, Instagram, Referral
createdBy: User reference
createdAt: Date
updatedAt: Date
```

## Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- Database on MongoDB Atlas

## Evaluation Criteria Met

- Clean TypeScript code with proper interfaces
- Reusable component architecture
- RESTful API design with proper status codes
- JWT authentication with RBAC
- Backend pagination with metadata
- Debounced search
- CSV export
- Docker setup
- Loading and error states
- Form validation
- Dark mode
```