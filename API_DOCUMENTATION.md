# MavTech Backend API Documentation

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/mavtech
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

Generate a secure secret:
```bash
openssl rand -base64 32
```

### 3. Start MongoDB
Local MongoDB:
```bash
mongod
```

Or use MongoDB Atlas (cloud).

### 4. Run Development Server
```bash
npm run dev
```

## API Endpoints

### Authentication
- **POST** `/api/auth/signin` - Sign in with credentials
- **POST** `/api/auth/signout` - Sign out
- **GET** `/api/auth/session` - Get current session

### Projects
- **GET** `/api/projects` - List all projects (public)
- **POST** `/api/projects` - Create project (auth required)
- **GET** `/api/projects/[id]` - Get project by ID (public)
- **PUT** `/api/projects/[id]` - Update project (auth required)
- **DELETE** `/api/projects/[id]` - Delete project (auth required)

**Request Body (POST/PUT):**
```json
{
  "title": "Project Name",
  "description": "Project description",
  "image": "https://example.com/image.jpg",
  "tags": ["React", "Next.js"],
  "link": "https://project-url.com",
  "featured": false
}
```

### Teams
- **GET** `/api/teams` - List all team members (public)
- **POST** `/api/teams` - Create team member (auth required)
- **GET** `/api/teams/[id]` - Get team member by ID (public)
- **PUT** `/api/teams/[id]` - Update team member (auth required)
- **DELETE** `/api/teams/[id]` - Delete team member (auth required)

**Request Body (POST/PUT):**
```json
{
  "name": "John Doe",
  "role": "Full Stack Developer",
  "bio": "Passionate developer...",
  "image": "https://example.com/avatar.jpg",
  "socialLinks": {
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "twitter": "https://twitter.com/johndoe",
    "website": "https://johndoe.com"
  },
  "order": 1
}
```

### Messages
- **GET** `/api/messages` - List all messages (admin only)
- **POST** `/api/messages` - Create message (public - contact form)
- **DELETE** `/api/messages/[id]` - Delete message (admin only)
- **PATCH** `/api/messages/[id]` - Update message status (admin only)

**Request Body (POST):**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "content": "I would like to discuss..."
}
```

**Request Body (PATCH):**
```json
{
  "status": "read"
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Authentication

Protected routes require authentication via NextAuth.js session. Include credentials in the request:

```javascript
// Client-side example
import { signIn } from 'next-auth/react';

await signIn('credentials', {
  email: 'admin@mavtech.com',
  password: 'password',
});
```

## Models

### User
- `name`: string
- `email`: string (unique)
- `password`: string (hashed)
- `role`: 'admin' | 'user'

### Project
- `title`: string
- `description`: string
- `image`: string
- `tags`: string[]
- `link`: string (optional)
- `featured`: boolean

### Team
- `name`: string
- `role`: string
- `bio`: string
- `image`: string
- `socialLinks`: object
- `order`: number

### Message
- `name`: string
- `email`: string
- `subject`: string
- `content`: string
- `status`: 'unread' | 'read' | 'archived'

## Testing

### Using cURL

**Create a project:**
```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Project",
    "description": "A test project",
    "image": "https://via.placeholder.com/400",
    "tags": ["test"]
  }'
```

**Get all projects:**
```bash
curl http://localhost:3000/api/projects
```

**Send a message:**
```bash
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "content": "This is a test message"
  }'
```
