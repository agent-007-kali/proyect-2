# ⚡ Quick Start Guide

Get your multi-tenant SaaS intelligence agent up and running in 15 minutes.

## 🎯 Prerequisites Check

Before you begin, ensure you have:

- [ ] **Supabase account** - Sign up at https://supabase.com
- [ ] **Vercel account** - Sign up at https://vercel.com  
- [ ] **Gmail with App Password** - Enable 2FA and generate app password
- [ ] **Ollama installed** - Check with: `ollama --version`
- [ ] **Llama 3.2 model** - Run: `ollama pull llama3.2:3b`

---

## Step 1: Database Setup (5 minutes)

### 1.1 Create Supabase Project

1. Go to https://app.supabase.com
2. Click **"New Project"**
3. Name: `competitor-intel`
4. Generate and save password
5. Choose region, click **"Create"**
6. Wait ~2 minutes for provisioning

### 1.2 Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Open `intel_agent/supabase_schema.sql` in your editor
3. Copy all contents and paste into SQL Editor
4. Click **"Run"** - Should see "Success"

### 1.3 Get Your Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **service_role key**: (the secret one, not anon)
3. Keep this tab open, you'll need these values

---

## Step 2: Backend Setup (5 minutes)

### 2.1 Configure Environment

```bash
cd "intel_agent"

# Copy example env file
cp .env.example .env

# Edit with your credentials
nano .env
```

Fill in:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
```

**Gmail App Password:**
1. https://myaccount.google.com/security
2. Enable 2FA if not already
3. Search "App Passwords"
4. Create for "Mail" app
5. Copy 16-character password

### 2.2 Test the Agent

```bash
# Activate virtual environment
source env/bin/activate

# Make sure Ollama is running
ollama serve &

# Test the orchestrator
python3 orchestrator.py --test
```

✅ If you see "Test mode complete" - you're good!

---

## Step 3: Add Test User (2 minutes)

In Supabase SQL Editor, run:

```sql
-- Add yourself as test user
INSERT INTO subscriptions (user_email, status, plan) 
VALUES ('your-email@example.com', 'active', 'pro');

-- Add test monitoring URLs
INSERT INTO monitoring_jobs (user_email, url_1, url_2, url_3)
VALUES (
    'your-email@example.com',
    'https://webscraper.io/test-sites/e-commerce/allinone',
    'https://example.com',
    null
);
```

---

## Step 4: Start Production Agent (1 minute)

### Option A: Quick Start (recommended for testing)

```bash
cd intel_agent
./start-orchestrator.sh
```

The script will:
- ✅ Check prerequisites
- ✅ Run test cycle
- ✅ Ask permission to start
- ✅ Start in background

### Option B: Systemd Service (recommended for production)

```bash
# Copy service file
sudo cp intel-orchestrator.service /etc/systemd/system/

# Edit paths if needed
sudo nano /etc/systemd/system/intel-orchestrator.service

# Enable and start
sudo systemctl daemon-reload
sudo systemctl enable intel-orchestrator
sudo systemctl start intel-orchestrator

# Check status
sudo systemctl status intel-orchestrator
```

---

## Step 5: Deploy Frontend (5 minutes)

### 5.1 Configure Frontend

```bash
cd proyects-2

# Create local env file
nano .env.local
```

Add:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 5.2 Test Locally

```bash
npm run dev
```

Visit http://localhost:3000

### 5.3 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel
```

Follow prompts, then:

1. Go to Vercel dashboard
2. Your project → **Settings** → **Environment Variables**
3. Add (for all environments):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Redeploy from **Deployments** tab

---

## ✅ Verify Everything Works

### Test 1: Check Agent Logs

```bash
# If using start-orchestrator.sh
tail -f intel_agent/orchestrator.log

# If using systemd
sudo journalctl -u intel-orchestrator -f
```

You should see:
```
🕵️ Processing job for: your-email@example.com
  🔍 Scraping https://...
  🤖 Consulting Local Agent...
  ✅ Email sent to your-email@example.com
```

### Test 2: Check Email

- Check your inbox
- Look for: "🕵️ Intelligence Alert: Competitor Changes Detected"
- Check spam folder if not in inbox

### Test 3: Check Frontend

Visit your Vercel deployment:
1. Should see Dashboard with stats
2. Latest Intelligence Report section
3. Monitored URLs listed

### Test 4: API Endpoints

```bash
# Update URLs
curl -X POST https://your-app.vercel.app/api/update-targets \
  -H "Content-Type: application/json" \
  -d '{"user_email":"your-email@example.com","url_1":"https://news.ycombinator.com"}'

# Get report
curl "https://your-app.vercel.app/api/get-report?user_email=your-email@example.com"
```

---

## 🎉 Success!

You now have a fully functional multi-tenant SaaS platform!

### What Happens Now?

1. **Orchestrator** checks database every hour
2. For each **active subscription**:
   - Scrapes their 3 competitor URLs
   - Compares with previous scrapes
   - If changes detected → AI analysis → Email alert
   - Saves report to database
3. **Users** can view reports in dashboard
4. **Repeat** every 24 hours

---

## 🔧 Common Issues

**Problem**: "Connection refused" to Ollama  
**Fix**: `ollama serve`

**Problem**: Email not sending  
**Fix**: Verify Gmail App Password (not regular password)

**Problem**: No jobs processing  
**Fix**: Check subscription status is 'active' in Supabase

**Problem**: Frontend can't connect  
**Fix**: Verify env vars in Vercel, then redeploy

---

## 📚 Next Steps

- [ ] Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
- [ ] Configure custom domain in Vercel
- [ ] Set up monitoring (UptimeRobot)
- [ ] Add authentication (Supabase Auth)
- [ ] Integrate payments (Stripe)

---

## 🆘 Need Help?

1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) - Comprehensive guide
2. Check [README.md](./README.md) - Full documentation  
3. Review logs for error messages
4. Verify all environment variables

---

**Estimated Total Time**: 15-20 minutes  
**Difficulty**: Intermediate  
**Support**: See documentation files

