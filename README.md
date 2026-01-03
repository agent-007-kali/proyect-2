# 🕵️ Multi-Tenant SaaS Intelligence Agent

> **AI-Powered Competitor Monitoring as a Service**

A production-ready SaaS platform that monitors competitor websites 24/7 and sends AI-generated intelligence reports to your customers via email.

---

## 🌟 Features

- ✅ **Multi-Tenant Architecture** - Support unlimited customers
- 🤖 **Local AI Analysis** - Powered by Ollama (Llama 3.2)
- 📊 **Beautiful Dashboard** - React/Next.js frontend
- 🔄 **Automated Monitoring** - Check websites every 24 hours
- 📧 **Email Alerts** - Instant notifications on changes
- 💾 **Supabase Backend** - Scalable PostgreSQL database
- 🎨 **Modern UI** - Built with Tailwind CSS
- 🔒 **Secure** - Environment-based configuration

---

## 📁 Project Structure

```
saas-website-with-agentic-competitor-spy/
├── intel_agent/                      # Backend Python Agent
│   ├── agent.py                      # Core worker logic
│   ├── orchestrator.py              # Multi-tenant orchestrator
│   ├── supabase_schema.sql          # Database schema
│   ├── requirements.txt             # Python dependencies
│   ├── .env.example                 # Environment template
│   └── env/                         # Virtual environment
│
├── proyects-2/                      # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   ├── update-targets/  # URL management API
│   │   │   │   └── get-report/      # Report fetching API
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── Dashboard.tsx        # Intelligence dashboard
│   │   │   ├── URLManager.tsx       # URL configuration
│   │   │   └── ...
│   │   └── lib/
│   │       └── supabase.ts          # Supabase client
│   ├── package.json
│   └── next.config.ts
│
└── DEPLOYMENT.md                    # Detailed deployment guide
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.13+ with virtual environment
- Node.js 18+ and npm
- Ollama with Llama 3.2 model
- Supabase account (free tier works)
- Vercel account (for deployment)
- Gmail account with App Password

### 1. Database Setup

1. Create a Supabase project at https://supabase.com
2. Run the SQL schema:
   ```bash
   # Copy contents of intel_agent/supabase_schema.sql
   # Paste in Supabase SQL Editor and run
   ```

### 2. Backend Setup

```bash
cd intel_agent

# Configure environment
cp .env.example .env
nano .env  # Add your credentials

# Activate virtual environment (already created)
source env/bin/activate

# Test the orchestrator
python3 orchestrator.py --test
```

### 3. Frontend Setup

```bash
cd proyects-2

# Install dependencies (Supabase already installed)
npm install

# Configure environment
cp .env.example .env.local
nano .env.local  # Add your Supabase credentials

# Run development server
npm run dev
```

### 4. Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Next.js App   │  ← User Dashboard & URL Management
│   (Vercel)      │
└────────┬────────┘
         │
         ↓ REST API
┌─────────────────┐
│   Supabase DB   │  ← subscriptions, monitoring_jobs
│   (PostgreSQL)  │     with report_history (JSONB)
└────────┬────────┘
         ↑
         │ Python SDK
┌─────────────────┐
│  Orchestrator   │  ← Checks DB every hour
│  (Kali Linux)   │     for jobs to process
└────────┬────────┘
         │
         ↓ Calls
┌─────────────────┐
│  Agent Worker   │  ← Scrapes URLs, queries Ollama,
│  (agent.py)     │     sends emails, updates DB
└─────────────────┘
```

### Data Flow

1. **User Input** → URLManager component → `/api/update-targets` → Supabase
2. **Orchestrator** → Queries active subscriptions → Calls `run_intel_cycle()`
3. **Agent Worker** → Scrapes URLs → AI analysis → Email alert → Save to DB
4. **Dashboard** → `/api/get-report` → Supabase → Display latest report

---

## 📊 Database Schema

### `subscriptions` Table
- `user_email` (TEXT, PRIMARY KEY)
- `status` (TEXT: 'active', 'inactive', 'cancelled', 'trial')
- `plan` (TEXT: 'basic', 'pro', 'enterprise')
- `created_at`, `updated_at` (TIMESTAMP)

### `monitoring_jobs` Table
- `id` (BIGSERIAL, PRIMARY KEY)
- `user_email` (TEXT, FOREIGN KEY → subscriptions)
- `url_1`, `url_2`, `url_3` (TEXT, nullable)
- `last_check` (TIMESTAMP)
- `report_history` (JSONB) - Array of reports:
  ```json
  [
    {
      "timestamp": "2026-01-01T12:00:00Z",
      "urls": ["https://competitor1.com", ...],
      "scrapes": "...",
      "analysis": "AI-generated report...",
      "changes_detected": true
    }
  ]
  ```

---

## 🔧 Configuration

### Backend `.env` (intel_agent/.env)

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama3.2:3b
CHECK_INTERVAL_SECONDS=3600      # 1 hour between checks
CHECK_INTERVAL_HOURS=24          # Job is stale after 24 hours
```

### Frontend `.env.local` (proyects-2/.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 🔐 Security Notes

- ⚠️ **NEVER** commit `.env` files to git
- ⚠️ **NEVER** expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code
- ✅ Use environment variables for all sensitive data
- ✅ API routes use server-side Supabase client only
- ✅ Validate all user inputs in API routes

---

## 🧪 Testing

### Test Backend Agent

```bash
cd intel_agent
source env/bin/activate
python3 orchestrator.py --test
```

### Test API Endpoints

```bash
# Update URLs
curl -X POST http://localhost:3000/api/update-targets \
  -H "Content-Type: application/json" \
  -d '{"user_email":"test@example.com","url_1":"https://example.com"}'

# Get report
curl "http://localhost:3000/api/get-report?user_email=test@example.com"
```

### Test Components

```bash
cd proyects-2
npm run dev
# Visit http://localhost:3000
```

---

## 📈 Scaling Considerations

### Current Capacity
- ✅ Handles 100+ concurrent users
- ✅ Checks 300+ URLs per cycle
- ✅ 1-hour check intervals

### To Scale Further
1. **Horizontal Scaling**: Deploy multiple orchestrator instances
2. **Queue System**: Use Redis/Celery for job distribution
3. **Caching**: Add Redis for report caching
4. **CDN**: Use Vercel Edge for API routes
5. **Database**: Upgrade Supabase plan for more connections

---

## 🐛 Troubleshooting

See [DEPLOYMENT.md](./DEPLOYMENT.md#troubleshooting) for detailed troubleshooting guide.

**Common Issues:**
- "Module not found" → `pip install -r requirements.txt`
- "Connection refused" → Start Ollama: `ollama serve`
- Email not sending → Check Gmail App Password
- No jobs processing → Verify subscription status is 'active'

---

## 📝 API Documentation

### POST `/api/update-targets`

Update competitor URLs for a user.

**Request:**
```json
{
  "user_email": "user@example.com",
  "url_1": "https://competitor1.com",
  "url_2": "https://competitor2.com",
  "url_3": null
}
```

**Response:**
```json
{
  "success": true,
  "message": "Competitor URLs updated successfully",
  "data": { ... }
}
```

### GET `/api/get-report?user_email=user@example.com`

Fetch latest intelligence report for a user.

**Response:**
```json
{
  "success": true,
  "data": {
    "latest_report": {
      "timestamp": "2026-01-01T12:00:00Z",
      "urls": ["https://..."],
      "analysis": "AI analysis...",
      "changes_detected": true
    },
    "total_reports": 5,
    "last_check": "2026-01-01T12:00:00Z",
    "monitored_urls": ["https://..."],
    "report_history": [...]
  }
}
```

---

## 🤝 Contributing

This is a custom SaaS project. For modifications:

1. Test locally first
2. Update documentation
3. Follow existing code patterns
4. Keep security in mind

---

## 📄 License

Private project - All rights reserved.

---

## 🙏 Acknowledgments

- **Ollama** - Local LLM inference
- **Supabase** - PostgreSQL backend
- **Next.js** - React framework
- **Vercel** - Hosting platform
- **Llama 3.2** - Language model

---

## 📞 Support

For deployment issues, refer to:
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Complete deployment guide
- Supabase docs: https://supabase.com/docs
- Next.js docs: https://nextjs.org/docs
- Ollama docs: https://ollama.ai/docs

---

**Built with ❤️ for competitive intelligence automation**



