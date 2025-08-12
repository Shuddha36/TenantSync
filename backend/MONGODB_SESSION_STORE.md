# MongoDB Session Store Implementation

## Overview
This implementation replaces the default in-memory session store with MongoDB persistence to solve session termination issues in production deployments.

## Changes Made

### 1. Dependencies Added
- `connect-mongo`: MongoDB session store for express-session

### 2. Server Configuration Updates

#### Session Store Configuration
```javascript
store: MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: "sessions",
  ttl: 24 * 60 * 60, // 1 day in seconds
  touchAfter: 24 * 3600, // lazy session update
}),
```

#### Cookie Configuration
```javascript
cookie: {
  secure: process.env.NODE_ENV === "production", // HTTPS in production
  httpOnly: true,
  maxAge: 86400000, // 1 day
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
},
```

#### CORS Configuration
```javascript
origin: process.env.NODE_ENV === "production" 
  ? "https://tenant-sync.vercel.app" 
  : ["http://localhost:3000", "http://127.0.0.1:3000"],
credentials: true,
```

### 3. Environment Variables Required

Create a `.env` file in the backend directory with:

```env
MONGO_URI=your-mongodb-connection-string
SESSION_SECRET=your-super-secret-session-key
NODE_ENV=production
PORT=4000
```

## Benefits

### ✅ Session Persistence
- Sessions survive server restarts
- Sessions work across multiple server instances
- Sessions are stored in MongoDB database

### ✅ Production Ready
- Environment-based configuration
- Secure cookie settings for HTTPS
- Proper CORS configuration

### ✅ Performance Optimized
- Lazy session updates (`touchAfter`)
- Automatic session expiration (`ttl`)
- Efficient MongoDB storage

## Testing

### Session Endpoints
- `GET /api/auth/session` - Check current session status
- `GET /api/auth/session-debug` - Debug session information

### Verification Steps
1. Login to the application
2. Refresh the page multiple times
3. Check if session persists
4. Restart the server
5. Verify session still exists

## Database Collection

Sessions are stored in the `sessions` collection in your MongoDB database with the following structure:

```json
{
  "_id": "session-id",
  "expires": "2025-08-14T12:00:00.000Z",
  "session": {
    "cookie": {...},
    "user": {
      "id": "user-id",
      "username": "username",
      "email": "email",
      "role": "role"
    }
  }
}
```

## Deployment Notes

### For Production:
1. Ensure `NODE_ENV=production` is set
2. Use a strong `SESSION_SECRET` (32+ characters)
3. Verify HTTPS is properly configured
4. Confirm MongoDB connection is stable

### For Development:
1. Set `NODE_ENV=development`
2. Use HTTP with `secure: false`
3. Allow localhost origins in CORS

## Troubleshooting

### Sessions Still Not Persisting?
1. Check MongoDB connection
2. Verify environment variables
3. Check browser developer tools for cookie issues
4. Ensure CORS credentials are enabled

### Cookie Issues?
1. Verify HTTPS configuration in production
2. Check `sameSite` settings
3. Confirm domain settings match your frontend URL
