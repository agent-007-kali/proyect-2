import os
import time
import sys
from datetime import datetime
from dotenv import load_dotenv
from supabase import create_client, Client
from agent import analyze

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

def process_jobs(supabase: Client):
    """Fetch and process active monitoring jobs for active subscribers."""
    try:
        # 1. Fetch all rows from monitoring_jobs where is_active is true AND user has active subscription
        # We use inner join on subscriptions to filter by status
        response = supabase.table("monitoring_jobs") \
            .select("*, subscriptions!inner(status)") \
            .eq("is_active", True) \
            .eq("subscriptions.status", "active") \
            .execute()
        
        jobs = response.data

        if not jobs:
            print("💤 No active jobs found.")
            return 0
        
        print(f"📋 Found {len(jobs)} job(s) to process.")
        for job in jobs:
            user_email = job['user_email']
            urls = [job['url_1'], job['url_2'], job['url_3']]
            
            print(f"🕵️ Processing job for: {user_email}")
            active_urls = [u for u in urls if u]
            print(f"🔗 Targets: {active_urls}")
            
            # 2. Run the analysis (Scrape -> Llama 3.2 -> Update Supabase)
            print(f"⚡ Handing off to AI Worker for {user_email}...")
            analyze(user_email, urls, supabase)
            print(f"🏁 Finished processing for {user_email}")
            
            # 3. Small delay between jobs to be polite
            time.sleep(5)
        
        return len(jobs)
    except Exception as e:
        print(f"❌ Error processing jobs: {e}")
        return 0

def main_loop():
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        print("❌ Missing Supabase credentials in .env")
        return

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    print("🚀 Orchestrator started. Monitoring active jobs...")

    while True:
        process_jobs(supabase)
        print(f"✅ Cycle complete at {datetime.now().strftime('%H:%M:%S')}. Sleeping for 1 hour...")
        time.sleep(3600)

def test_mode():
    """Run a single processing cycle and exit."""
    print("🧪 TEST MODE: Running single cycle")
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        print("❌ Missing Supabase credentials in .env")
        return

    supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    count = process_jobs(supabase)
    print(f"✅ Test cycle complete. Processed {count} jobs.")

if __name__ == "__main__":
    if "--test" in sys.argv:
        test_mode()
    else:
        try:
            main_loop()
        except KeyboardInterrupt:
            print("\n🛑 Orchestrator stopped by user.")
        except Exception as e:
            print(f"❌ Fatal error: {e}")
