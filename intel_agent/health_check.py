


import os
import requests
import sys
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

def check_supabase():
    """Verify Supabase connection and service role key permissions."""
    print("🔍 Checking Supabase connection...")
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
    
    if not url or not key:
        print("❌ Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not found in .env")
        return False
        
    try:
        supabase: Client = create_client(url, key)
        # Try to query the monitoring_jobs table (should work with service role key)
        response = supabase.table("monitoring_jobs").select("count", count="exact").limit(1).execute()
        print(f"✅ Supabase connection successful. Found {response.count} total monitoring jobs.")
        return True
    except Exception as e:
        print(f"❌ Supabase connection failed: {e}")
        return False

def check_ollama():
    """Verify local Ollama availability."""
    print("🔍 Checking local Ollama availability...")
    ollama_url = os.getenv("OLLAMA_URL", "http://localhost:11434/api/tags")
    # If the URL is just the base or generate, we check tags for health
    if "api/generate" in ollama_url:
        ollama_url = ollama_url.replace("api/generate", "api/tags")
    elif ollama_url.endswith("11434") or ollama_url.endswith("11434/"):
        ollama_url = os.path.join(ollama_url, "api/tags")

    try:
        response = requests.get(ollama_url, timeout=5)
        if response.status_code == 200:
            models = response.json().get('models', [])
            model_names = [m.get('name') for m in models]
            target_model = os.getenv("OLLAMA_MODEL", "llama3.2:3b")
            
            if target_model in model_names:
                print(f"✅ Ollama is running. Model '{target_model}' is available.")
                return True
            else:
                print(f"⚠️ Ollama is running, but model '{target_model}' was not found.")
                print(f"   Available models: {', '.join(model_names)}")
                return False
        else:
            print(f"❌ Ollama health check failed with status code: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Ollama is not reachable: {e}")
        return False

def run_health_check():
    print("=" * 50)
    print("🚀 INTELLIGENCE AGENT HEALTH CHECK")
    print("=" * 50)
    
    sb_ok = check_supabase()
    ol_ok = check_ollama()
    
    print("-" * 50)
    if sb_ok and ol_ok:
        print("🎉 ALL SYSTEMS GO: Factory is ready for production traffic.")
        return True
    else:
        print("🚨 CRITICAL: Health check failed. Please fix the issues above.")
        return False

if __name__ == "__main__":
    if run_health_check():
        sys.exit(0)
    else:
        sys.exit(1)

