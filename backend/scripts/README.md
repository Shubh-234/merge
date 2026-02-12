# Data Seeding Script

This script populates your Merge application with mock developer data for testing.

## What It Does

1. **Creates 8 mock users** with realistic developer profiles
2. **Simulates connection activities:**
   - Sends "interested" and "ignored" connection requests
   - Reviews and accepts/rejects some requests
   - Creates a realistic connection network
3. **Generates detailed reports** for testing reference

## Prerequisites

- Backend server running on `http://localhost:7777`
- MongoDB connected and running
- `axios` installed (`npm install axios`)

## Usage

```bash
# From the backend directory
cd backend

# Run the seed script
node scripts/seedData.js
```

## Output

The script generates two report files in `backend/scripts/`:

- **`seed-report.json`** - Machine-readable data with all users and connections
- **`seed-report.md`** - Human-readable guide with passwords and test scenarios

## Mock Users

All users share the password: **`Password123!`**

| Name | Email | Skills |
|------|-------|--------|
| Sarah Chen | sarah.chen@example.com | React.js, Node.js, TypeScript, MongoDB |
| Marcus Johnson | marcus.j@example.com | Python, Django, PostgreSQL, Docker |
| Priya Sharma | priya.sharma@example.com | Vue.js, Express.js, AWS, Redis |
| Alex Rodriguez | alex.rod@example.com | Java, Spring Boot, Kubernetes, MySQL |
| Emily Watson | emily.w@example.com | React Native, JavaScript, Firebase, GraphQL |
| David Kim | david.kim@example.com | Go, Rust, Kafka, Elasticsearch |
| Nina Patel | nina.patel@example.com | Angular, C#, .NET Core, Azure |
| Jake Morrison | jake.m@example.com | PHP, Laravel, Vue.js, MySQL |

## Connection Network Created

### Accepted Connections (4)
- Sarah Chen ↔ Marcus Johnson (mutual)
- Sarah Chen ↔ Priya Sharma
- Priya Sharma ↔ David Kim
- Emily Watson ↔ Jake Morrison

### Pending Requests
- Marcus → Sarah (interested)
- Alex → Emily (interested)
- Alex → Jake (interested)
- Nina → Jake (interested)
- Jake → Sarah (interested)

### Ignored
- Marcus ignored Emily
- David ignored Nina

### Rejected
- Alex rejected Sarah's request

## Testing Examples

### Login as Sarah
```bash
curl -X POST http://localhost:7777/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "sarah.chen@example.com", "password": "Password123!"}'
```

### View Sarah's connections
```bash
curl http://localhost:7777/api/users/connections \
  -H "Cookie: token=YOUR_TOKEN_HERE"
```

### View Sarah's feed (users she hasn't connected with)
```bash
curl http://localhost:7777/api/users/feed \
  -H "Cookie: token=YOUR_TOKEN_HERE"
```

## Troubleshooting

- **Server not running:** Start your backend with `npm start`
- **Port conflict:** Update `BASE_URL` in the script if using different port
- **Duplicate users:** Clear your database before re-running the script
- **Auth errors:** Ensure your JWT secret matches in the backend config

## Re-running the Script

To re-seed the database:

1. Clear existing data (optional):
```bash
# In MongoDB
use merge
db.users.deleteMany({})
db.connectionrequests.deleteMany({})
```

2. Run the seed script again:
```bash
node scripts/seedData.js
```

## Notes

- The script adds realistic delays (300-500ms) between requests to avoid rate limiting
- All profile photos use https://i.pravatar.cc for random avatars
- Connection scenarios are designed to test various states (pending, accepted, rejected, ignored)
- Check `seed-report.md` for detailed connection matrix and test scenarios
