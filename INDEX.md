# 📚 Documentation Index

Welcome to the Multi-Tenant SaaS Intelligence Agent documentation. This index will guide you to the right document based on your needs.

---

## 🚀 Getting Started

### I want to understand what this project does
→ Read: [README.md](./README.md)
- Complete project overview
- Features list
- Technology stack
- Basic architecture

### I want to deploy this quickly (15 minutes)
→ Read: [QUICKSTART.md](./QUICKSTART.md)
- Step-by-step 15-minute guide
- Prerequisite checklist
- Quick verification steps
- Common issues & fixes

### I want complete deployment instructions
→ Read: [DEPLOYMENT.md](./DEPLOYMENT.md)
- Comprehensive deployment guide
- Production setup with systemd
- Vercel deployment
- Environment configuration
- Troubleshooting (10+ scenarios)
- Operations & monitoring

---

## 🏗️ Technical Documentation

### I want to understand the architecture
→ Read: [ARCHITECTURE.md](./ARCHITECTURE.md)
- Visual system diagrams
- Data flow diagrams
- Component interaction maps
- Security flow
- Timing diagrams

### I want to see what was built
→ Read: [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)
- Complete feature list
- Implementation details
- File deliverables
- Code metrics
- Next steps recommendations

---

## 📁 Code Structure

### Backend (intel_agent/)

```
intel_agent/
├── agent.py                    # Core worker logic (270 lines)
│   └── Functions:
│       ├── scrape_url()        # Web scraping
│       ├── ask_local_ai()      # Ollama integration
│       ├── send_email_alert()  # Email notifications
│       └── run_intel_cycle()   # Main processing
│
├── orchestrator.py             # Multi-tenant orchestrator (240 lines)
│   └── Functions:
│       ├── get_jobs_to_process()  # Query Supabase
│       ├── process_job()          # Process single user
│       └── main_loop()            # Continuous monitoring
│
├── supabase_schema.sql         # Database schema (100 lines)
│   └── Tables:
│       ├── subscriptions       # User accounts
│       └── monitoring_jobs     # URL tracking & reports
│
├── requirements.txt            # Python dependencies
├── .env.example               # Configuration template
├── start-orchestrator.sh      # Startup automation
├── stop-orchestrator.sh       # Stop script
└── intel-orchestrator.service # Systemd template
```

### Frontend (proyects-2/)

```
proyects-2/
├── src/
│   ├── app/
│   │   └── api/
│   │       ├── update-targets/route.ts  # URL management (155 lines)
│   │       │   └── POST /api/update-targets
│   │       │   └── GET  /api/update-targets?user_email=x
│   │       │
│   │       └── get-report/route.ts      # Report fetching (60 lines)
│   │           └── GET /api/get-report?user_email=x
│   │
│   ├── components/
│   │   ├── Dashboard.tsx       # Intelligence viewer (320 lines)
│   │   │   └── Features:
│   │   │       ├── Stats display
│   │   │       ├── Latest report
│   │   │       ├── Report history
│   │   │       └── Refresh functionality
│   │   │
│   │   └── URLManager.tsx      # URL configuration (230 lines)
│   │       └── Features:
│   │           ├── 3 URL inputs
│   │           ├── Validation
│   │           ├── Submit handler
│   │           └── Status messages
│   │
│   └── lib/
│       └── supabase.ts         # Supabase client
│
├── .env.example               # Configuration template
└── package.json               # Dependencies
```

---

## 🎯 Quick Reference by Task

### Task: Add a new customer
1. Insert into Supabase `subscriptions` table:
   ```sql
   INSERT INTO subscriptions (user_email, status, plan) 
   VALUES ('new-customer@example.com', 'active', 'pro');
   ```
2. Customer can now configure URLs via frontend
3. Orchestrator will pick up automatically

### Task: View logs
```bash
# Backend logs (systemd)
sudo journalctl -u intel-orchestrator -f

# Backend logs (manual start)
tail -f intel_agent/orchestrator.log

# Frontend logs
vercel logs --follow
```

### Task: Restart the agent
```bash
# Using systemd
sudo systemctl restart intel-orchestrator

# Using manual start
cd intel_agent
./stop-orchestrator.sh
./start-orchestrator.sh
```

### Task: Update environment variables
```bash
# Backend
nano intel_agent/.env
sudo systemctl restart intel-orchestrator

# Frontend
# Update in Vercel dashboard → Settings → Environment Variables
# Then: Deployments → Redeploy
```

### Task: Check database
1. Go to Supabase dashboard
2. Navigate to Table Editor
3. View `subscriptions` and `monitoring_jobs` tables
4. For reports, expand the `report_history` JSONB field

### Task: Test the system
```bash
# Backend test
cd intel_agent
source env/bin/activate
python3 orchestrator.py --test

# API test
curl -X POST http://localhost:3000/api/update-targets \
  -H "Content-Type: application/json" \
  -d '{"user_email":"test@example.com","url_1":"https://example.com"}'

# Frontend test
npm run dev  # Visit http://localhost:3000
```

---

## 🆘 Troubleshooting Quick Links

| Problem | Solution Document | Section |
|---------|------------------|---------|
| Can't connect to Supabase | [DEPLOYMENT.md](./DEPLOYMENT.md) | Troubleshooting → Frontend issues |
| Orchestrator won't start | [DEPLOYMENT.md](./DEPLOYMENT.md) | Troubleshooting → Backend issues |
| Email not sending | [DEPLOYMENT.md](./DEPLOYMENT.md) | Troubleshooting → Email problems |
| No jobs processing | [DEPLOYMENT.md](./DEPLOYMENT.md) | Troubleshooting → Job processing |
| Ollama errors | [DEPLOYMENT.md](./DEPLOYMENT.md) | Troubleshooting → AI issues |
| Module import errors | [DEPLOYMENT.md](./DEPLOYMENT.md) | Troubleshooting → Dependencies |

---

## 📊 Key Metrics & Limits

### Current Capacity
- **Users**: 100+ concurrent subscriptions
- **URLs per user**: 3
- **Check frequency**: Every 24 hours
- **Orchestrator cycle**: Every 1 hour
- **Reports stored**: 10 per user (JSONB)
- **Processing time**: ~30-60 seconds per user

### Supabase (Free Tier)
- **Database size**: 500 MB
- **Bandwidth**: 2 GB
- **API requests**: Unlimited
- **Concurrent connections**: 60

### Vercel (Free Tier)
- **Deployments**: Unlimited
- **Bandwidth**: 100 GB/month
- **Function executions**: Unlimited
- **Function duration**: 10 seconds max

---

## 🎓 Learning Path

### For Beginners
1. Read [QUICKSTART.md](./QUICKSTART.md) - Get it running first
2. Read [README.md](./README.md) - Understand what you deployed
3. Read [ARCHITECTURE.md](./ARCHITECTURE.md) - See how it works
4. Experiment with the code

### For Developers
1. Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - See what was built
2. Read [ARCHITECTURE.md](./ARCHITECTURE.md) - Understand the design
3. Read the source code (well-commented)
4. Read [DEPLOYMENT.md](./DEPLOYMENT.md) - Production setup

### For Operations
1. Read [DEPLOYMENT.md](./DEPLOYMENT.md) - Focus on Phase 5
2. Set up monitoring and logging
3. Configure backups
4. Test disaster recovery

---

## 📞 Support Resources

### Documentation Files
- **README.md** - Project overview
- **QUICKSTART.md** - 15-minute setup
- **DEPLOYMENT.md** - Complete deployment guide
- **ARCHITECTURE.md** - Visual architecture
- **PROJECT_SUMMARY.md** - Implementation details
- **INDEX.md** - This file

### External Resources
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Ollama Docs: https://ollama.ai/docs
- Vercel Docs: https://vercel.com/docs

### Tools & Services
- Supabase Dashboard: https://app.supabase.com
- Vercel Dashboard: https://vercel.com/dashboard
- Ollama Models: https://ollama.ai/library

---

## 🔄 Version History

### v1.0.0 (January 2026)
- ✅ Initial release
- ✅ Multi-tenant architecture
- ✅ Supabase integration
- ✅ Next.js dashboard
- ✅ Ollama AI integration
- ✅ Email alerts
- ✅ Complete documentation

---

## 📝 Contributing

This is a custom project, but if you want to modify:

1. **Backend changes**: 
   - Edit `intel_agent/agent.py` or `orchestrator.py`
   - Test with: `python3 orchestrator.py --test`
   - Restart service

2. **Frontend changes**:
   - Edit components in `proyects-2/src/`
   - Test locally: `npm run dev`
   - Deploy: `vercel`

3. **Database changes**:
   - Update `supabase_schema.sql`
   - Run SQL in Supabase Editor
   - Update corresponding code

4. **Documentation changes**:
   - Update relevant .md file
   - Keep INDEX.md in sync

---

## 🎯 Common User Journeys

### Journey 1: First-time Setup (DevOps)
1. [QUICKSTART.md](./QUICKSTART.md) - 15-minute setup
2. Verify everything works
3. [DEPLOYMENT.md](./DEPLOYMENT.md) - Production hardening
4. Set up monitoring

### Journey 2: Understanding the System (Developer)
1. [README.md](./README.md) - Overview
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Architecture
3. Read source code
4. [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Deep dive

### Journey 3: Troubleshooting (Support)
1. Identify problem
2. [INDEX.md](./INDEX.md) - Find relevant section
3. [DEPLOYMENT.md](./DEPLOYMENT.md) - Troubleshooting
4. Check logs

### Journey 4: Scaling (CTO)
1. [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - Current metrics
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Bottlenecks
3. [DEPLOYMENT.md](./DEPLOYMENT.md) - Optimization tips
4. Plan infrastructure upgrades

---

## 🏆 Best Practices

### Development
- ✅ Always test in test mode first
- ✅ Use environment variables
- ✅ Keep secrets in .env files
- ✅ Comment your code changes
- ✅ Test before deploying

### Operations
- ✅ Monitor logs regularly
- ✅ Set up alerts for failures
- ✅ Backup database regularly
- ✅ Update dependencies monthly
- ✅ Document configuration changes

### Security
- ✅ Never commit .env files
- ✅ Rotate secrets quarterly
- ✅ Use service_role key only server-side
- ✅ Enable 2FA on all services
- ✅ Review access logs

---

**Last Updated**: January 2026  
**Version**: 1.0.0  
**Documentation Quality**: Production-ready ✅

---

*Need help? Start with [QUICKSTART.md](./QUICKSTART.md) or [DEPLOYMENT.md](./DEPLOYMENT.md)*



