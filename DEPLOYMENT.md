# 🚀 Multi-Tenant SaaS Intelligence Agent - Deployment Guide

Complete deployment instructions for your Agentic Competitor Spy platform.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Supabase Setup](#phase-1-supabase-setup)
3. [Phase 2: Backend Agent Setup (Kali Linux)](#phase-2-backend-agent-setup-kali-linux)
4. [Phase 3: Frontend Deployment (Vercel)](#phase-3-frontend-deployment-vercel)
5. [Phase 4: Testing](#phase-4-testing)
6. [Phase 5: Production Operations](#phase-5-production-operations)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Services
- ✅ **Supabase Account** (free tier works): https://supabase.com
- ✅ **Vercel Account** (for frontend): https://vercel.com
- ✅ **Gmail Account** (for email alerts) with App Password
- ✅ **Kali Linux Server** (or any Linux server with Python 3.13+)
- ✅ **Ollama** installed with Llama 3.2 model

### Check Your Setup
```bash
# On your Kali machine
python3 --version  # Should be 3.13+
ollama --version   # Should be installed
ollama list        # Should show llama3.2:3b
```

---

## Phase 1: Supabase Setup

### Step 1: Create Supabase Project

1. Go to https://supabase.com and sign up/login
2. Click **"New Project"**
3. Fill in:
   - **Name**: `competitor-intel-saas` (or your preferred name)
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
4. Wait 2-3 minutes for project creation

### Step 2: Run Database Schema

1. In your Supabase project dashboard, navigate to **SQL Editor** (left sidebar)
2. Click **"New Query"**
3. Copy the entire contents of `intel_agent/supabase_schema.sql`
4. Paste into the SQL Editor
5. Click **"Run"** or press `Ctrl+Enter`
6. You should see: "Success. No rows returned"

### Step 3: Get Your Credentials

1. Go to **Settings** → **API** (in left sidebar)
2. Copy and save these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: (you'll use this in frontend)
   - **service_role key**: ⚠️ **NEVER expose this publicly!** (backend only)

### Step 4: Create Test Data (Optional but Recommended)

In SQL Editor, run:

```sql
-- Insert your test user
INSERT INTO subscriptions (user_email, status, plan) 
VALUES ('your-email@example.com', 'active', 'pro');

-- Insert test monitoring job
INSERT INTO monitoring_jobs (user_email, url_1, url_2, url_3)
VALUES (
    'your-email@example.com',
    'https://webscraper.io/test-sites/e-commerce/allinone',
    'https://example.com',
    'https://httpbin.org/html'
);
```

---

## Phase 2: Backend Agent Setup (Kali Linux)

### Step 1: Configure Environment Variables

```bash
cd "/home/kali/Desktop/saas website with agentic competitor spy/intel_agent"

# Copy the example env file
cp .env.example .env

# Edit with your credentials
nano .env
```

Fill in your `.env` file:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Email Configuration (Gmail SMTP)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password

# Ollama Configuration
OLLAMA_URL=http://localhost:11434/api/generate
OLLAMA_MODEL=llama3.2:3b

# Monitoring Configuration
CHECK_INTERVAL_HOURS=24
CHECK_INTERVAL_SECONDS=3600
```

**🔐 Getting Gmail App Password:**
1. Go to Google Account → Security
2. Enable 2-Factor Authentication (if not already)
3. Go to **App Passwords**
4. Generate new password for "Mail"
5. Copy the 16-character password (no spaces)

### Step 2: Install Dependencies

```bash
# Activate virtual environment
source env/bin/activate

# Verify installations (already done, but just to check)
pip list | grep supabase
pip list | grep python-dotenv
```

### Step 3: Test the Orchestrator

```bash
# Run in test mode (processes one cycle and exits)
python3 orchestrator.py --test
```

Expected output:
```
🧪 TEST MODE - Running single cycle
======================================================================
✅ Configuration validated
  • Supabase URL: https://xxxxx.supabase.co...
  • Check interval: 3600s (1.0 hours)
  • Job frequency: 24 hours

🔍 Querying for jobs...
  📋 Found 1 job(s)

──────────────────────────────────────────────────────────────────────
Testing job 1/1: your-email@example.com
──────────────────────────────────────────────────────────────────────

🕵️ Processing intel cycle for: your-email@example.com
  📋 URLs to check: 3 URLs
  🔍 Scraping https://webscraper.io/test-sites/e-commerce/allinone...
  ...
  ✅ Test result: success
```

### Step 4: Run in Production Mode

```bash
# Method 1: Run in background with nohup
nohup python3 orchestrator.py > orchestrator.log 2>&1 &

# Save the process ID
echo $! > orchestrator.pid
```

**Alternative: Use systemd service (recommended for production)**

Create service file:
```bash
sudo nano /etc/systemd/system/intel-orchestrator.service
```

Paste this configuration:
```ini
[Unit]
Description=Intelligence Agent Orchestrator
After=network.target

[Service]
Type=simple
User=kali
WorkingDirectory=/home/kali/Desktop/saas website with agentic competitor spy/intel_agent
Environment="PATH=/home/kali/Desktop/saas website with agentic competitor spy/intel_agent/env/bin"
ExecStart=/home/kali/Desktop/saas website with agentic competitor spy/intel_agent/env/bin/python3 orchestrator.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable intel-orchestrator
sudo systemctl start intel-orchestrator

# Check status
sudo systemctl status intel-orchestrator

# View logs
sudo journalctl -u intel-orchestrator -f
```

### Step 5: Verify It's Running

```bash
# If using nohup
tail -f orchestrator.log

# If using systemd
sudo journalctl -u intel-orchestrator -f

# Check if process is running
ps aux | grep orchestrator.py
```

---

## Phase 3: Frontend Deployment (Vercel)

### Step 1: Prepare the Frontend

```bash
cd "/home/kali/Desktop/saas website with agentic competitor spy/proyects-2"

# Create .env.local for local testing
nano .env.local
```

Add:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

⚠️ **IMPORTANT**: Never commit `.env.local` to git!

Add to `.gitignore`:
```bash
echo ".env.local" >> .gitignore
```

### Step 2: Test Locally

```bash
npm run dev
```

Visit http://localhost:3000 and test the Dashboard component.

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `proyects-2`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 4: Configure Environment Variables in Vercel

1. In your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add these variables for **Production**, **Preview**, and **Development**:

```
NEXT_PUBLIC_SUPABASE_URL = https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY = your-service-role-key-here
```

4. Click **Save**
5. Redeploy: **Deployments** → Click "..." → **Redeploy**

---

## Phase 4: Testing

### Test Backend Agent

```bash
# On Kali machine
cd "/home/kali/Desktop/saas website with agentic competitor spy/intel_agent"
source env/bin/activate
python3 orchestrator.py --test
```

### Test API Endpoints

```bash
# Test update-targets endpoint
curl -X POST https://your-app.vercel.app/api/update-targets \
  -H "Content-Type: application/json" \
  -d '{
    "user_email": "test@example.com",
    "url_1": "https://example.com",
    "url_2": "https://httpbin.org/html",
    "url_3": null
  }'

# Test get-report endpoint
curl "https://your-app.vercel.app/api/get-report?user_email=test@example.com"
```

### Test Full Flow

1. **Add User in Supabase**:
   ```sql
   INSERT INTO subscriptions (user_email, status, plan) 
   VALUES ('realuser@example.com', 'active', 'pro');
   ```

2. **Configure URLs via Frontend**:
   - Visit your Vercel deployment
   - Use URLManager component
   - Save 3 competitor URLs

3. **Manually Trigger Agent** (optional):
   ```bash
   # Force immediate check
   python3 orchestrator.py --test
   ```

4. **Check Email**:
   - Wait for email alert
   - Check spam folder if needed

5. **View Report in Dashboard**:
   - Refresh dashboard
   - Should see latest report

---

## Phase 5: Production Operations

### Monitoring the Agent

```bash
# Check orchestrator status
sudo systemctl status intel-orchestrator

# View recent logs
sudo journalctl -u intel-orchestrator -n 100

# Follow live logs
sudo journalctl -u intel-orchestrator -f
```

### Common Operations

#### Restart the Agent
```bash
sudo systemctl restart intel-orchestrator
```

#### Stop the Agent
```bash
sudo systemctl stop intel-orchestrator
```

#### Update Configuration
```bash
nano /path/to/intel_agent/.env
sudo systemctl restart intel-orchestrator
```

#### View Database Records
In Supabase Dashboard → Table Editor:
- Check `subscriptions` table
- Check `monitoring_jobs` table
- View `report_history` JSON field

### Performance Optimization

#### Adjust Check Frequency
Edit `.env`:
```env
CHECK_INTERVAL_SECONDS=7200  # Check every 2 hours instead of 1
CHECK_INTERVAL_HOURS=48      # Consider stale after 48 hours
```

#### Limit Report History
Reports are automatically limited to last 10 per user (see `agent.py` line ~186).

---

## Troubleshooting

### Problem: "Module not found" errors

**Solution:**
```bash
cd intel_agent
source env/bin/activate
pip install -r requirements.txt
```

### Problem: "Connection refused" to Ollama

**Solution:**
```bash
# Start Ollama
ollama serve

# Verify it's running
curl http://localhost:11434/api/generate -d '{"model":"llama3.2:3b","prompt":"Hi"}'
```

### Problem: Email not sending

**Possible causes:**
1. ❌ Wrong app password → Regenerate in Google Account settings
2. ❌ 2FA not enabled → Enable it first
3. ❌ "Less secure apps" needed → Use App Password instead
4. ❌ Gmail blocking → Check https://myaccount.google.com/notifications

### Problem: No jobs being processed

**Check:**
```sql
-- In Supabase SQL Editor
SELECT 
    s.user_email, 
    s.status, 
    m.last_check,
    m.url_1
FROM subscriptions s
LEFT JOIN monitoring_jobs m ON s.user_email = m.user_email
WHERE s.status = 'active';
```

Make sure:
- ✅ Status is 'active'
- ✅ At least one URL is configured
- ✅ `last_check` is NULL or > 24 hours old

### Problem: Frontend can't connect to Supabase

**Check:**
1. Environment variables are set in Vercel
2. Correct URL format (https://xxx.supabase.co)
3. Using `service_role` key (not anon key) for API routes
4. Redeploy after adding env vars

### Problem: Agent crashes/stops running

**Check logs:**
```bash
sudo journalctl -u intel-orchestrator -n 100 --no-pager
```

**Common fixes:**
- Out of memory → Increase RAM or optimize model
- Ollama timeout → Increase timeout in `agent.py`
- Network issues → Check internet connection
- Supabase rate limiting → Reduce check frequency

---

## 🎯 Quick Reference

### Important File Locations

- **Backend Agent**: `/home/kali/Desktop/saas website with agentic competitor spy/intel_agent/`
- **Frontend**: `/home/kali/Desktop/saas website with agentic competitor spy/proyects-2/`
- **Orchestrator**: `intel_agent/orchestrator.py`
- **Worker Logic**: `intel_agent/agent.py`
- **Database Schema**: `intel_agent/supabase_schema.sql`

### Important URLs

- **Supabase Dashboard**: https://app.supabase.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Your Production App**: https://your-app.vercel.app

### Important Commands

```bash
# Backend
cd intel_agent
source env/bin/activate
python3 orchestrator.py --test                    # Test mode
sudo systemctl status intel-orchestrator          # Check status
sudo journalctl -u intel-orchestrator -f          # View logs

# Frontend
cd proyects-2
npm run dev                                       # Local dev
vercel                                            # Deploy
vercel logs                                       # View logs
```

---

## 🚀 Next Steps

1. ✅ Set up automated backups for Supabase
2. ✅ Configure custom domain in Vercel
3. ✅ Add authentication (Supabase Auth or NextAuth.js)
4. ✅ Set up monitoring/alerting (UptimeRobot, Better Stack)
5. ✅ Implement rate limiting for API routes
6. ✅ Add Stripe/payment integration
7. ✅ Create admin dashboard for managing users

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review logs carefully
3. Verify all environment variables are set correctly
4. Test each component individually (DB → Agent → API → Frontend)

---

**Last Updated**: January 2026  
**Version**: 1.0.0



