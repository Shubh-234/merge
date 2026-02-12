# Mock Data Seed Report

**Generated:** 2/12/2026, 10:46:38 AM

---

## 👥 Created Users (8)

All users have password: `Password123!`

| # | Name | Email | Skills |
|---|------|-------|--------|
| 1 | Sarah Chen | sarah.chen@example.com | React.js, Node.js, TypeScript, MongoDB |
| 2 | Marcus Johnson | marcus.j@example.com | Python, Django, PostgreSQL, Docker |
| 3 | Priya Sharma | priya.sharma@example.com | Vue.js, Express.js, AWS, Redis |
| 4 | Alex Rodriguez | alex.rod@example.com | Java, Spring Boot, Kubernetes, MySQL |
| 5 | Emily Watson | emily.w@example.com | React Native, JavaScript, Firebase, GraphQL |
| 6 | David Kim | david.kim@example.com | Go, Rust, Kafka, Elasticsearch |
| 7 | Nina Patel | nina.patel@example.com | Angular, C#, .NET Core, Azure |
| 8 | Jake Morrison | jake.m@example.com | PHP, Laravel, Vue.js, MySQL |

---

## 🔗 Connection Requests (12)

### Interested Requests

- **Sarah Chen** → **Marcus Johnson**
- **Sarah Chen** → **Priya Sharma**
- **Sarah Chen** → **Alex Rodriguez**
- **Priya Sharma** → **David Kim**
- **Priya Sharma** → **Nina Patel**
- **Alex Rodriguez** → **Emily Watson**
- **Alex Rodriguez** → **Jake Morrison**
- **Emily Watson** → **Jake Morrison**
- **Nina Patel** → **Jake Morrison**
- **Jake Morrison** → **Sarah Chen**

### Ignored Requests

- **Marcus Johnson** → **Emily Watson**
- **David Kim** → **Nina Patel**

---

## ✅ Accepted Connections

- **Sarah Chen** ↔ **Marcus Johnson** (Mutual interest, accepted)
- **Sarah Chen** ↔ **Priya Sharma** (Accepted)
- **Priya Sharma** ↔ **David Kim** (Accepted)
- **Emily Watson** ↔ **Jake Morrison** (Accepted)

---

## 🧪 Testing Guide

### Login as any user:

```bash
curl -X POST http://localhost:7777/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "sarah.chen@example.com", "password": "Password123!"}'
```

### Key Test Scenarios:

1. **Sarah Chen** - Has 2 accepted connections, 1 rejected, sent multiple requests
2. **Marcus Johnson** - Mutual connection with Sarah, ignored Emily
3. **Alex Rodriguez** - Rejected Sarah's request, sent requests to others
4. **Jake Morrison** - Popular (received multiple requests)

---

## 📝 Connection Summary

- **Total Users:** 8
- **Total Requests Sent:** 12
- **Interested:** 10
- **Ignored:** 2
- **Accepted Connections:** 4
- **Rejected:** 1

