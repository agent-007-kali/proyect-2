"""
Multi-Tenant Intelligence Agent Worker
This module contains the core logic for scraping competitor websites,
analyzing changes using local Ollama, and sending email alerts.
"""

import os
import requests
from bs4 import BeautifulSoup
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from datetime import datetime
import json

# Load environment variables
load_dotenv()

# --- CONFIGURATION ---
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
SELECTED_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2:3b")
EMAIL_USER = os.getenv("EMAIL_USER")
EMAIL_PW = os.getenv("EMAIL_PASSWORD")


def mock_test_cycle(user_email, supabase_client):
    """
    Mock a full cycle: simulate a change, run AI, and update Supabase.
    """
    print(f"\n🧪 RUNNING MOCK TEST CYCLE for: {user_email}")
    
    # 1. Mock content change
    mock_content = f"Mock competitor data update at {datetime.now().isoformat()}. New product launched: Agentic Swarm v2.0. Pricing changed to $49.99."
    import hashlib
    content_hash = hashlib.md5(mock_content.encode()).hexdigest()
    
    # 2. Mock AI analysis
    print("  🤖 Generating mock AI report...")
    prompt = f"You are a competitive intelligence analyst. Summarize this change: {mock_content}"
    ai_report = ask_local_ai(prompt)
    
    # 3. Update Supabase
    try:
        print("  📤 Pushing results to Supabase...")
        supabase_client.table("monitoring_jobs").update({
            "latest_report": ai_report,
            "last_content_hash": content_hash,
            "last_check_at": datetime.now().isoformat()
        }).eq("user_email", user_email).execute()
        
        print("  📧 Sending test email...")
        send_email_alert(user_email, ai_report, ["http://mock-competitor.com"])
        
        print("\n✅ MOCK TEST COMPLETE.")
        return {"status": "success", "report": ai_report}
    except Exception as e:
        print(f"  ❌ Mock test failed: {e}")
        return {"status": "error", "error": str(e)}


def scrape_url(url):
    """
    Scrape a URL and extract its text content.
    
    Args:
        url (str): The URL to scrape
        
    Returns:
        str: Extracted text content (first 3000 chars) or empty string on error
    """
    try:
        print(f"  🔍 Scraping {url}...")
        res = requests.get(url, timeout=15)
        if res.status_code == 200:
            text = BeautifulSoup(res.text, 'html.parser').get_text()
            # Clean up whitespace
            text = ' '.join(text.split())
            return text[:3000]  # Limit to 3000 chars
        else:
            print(f"  ⚠️ HTTP {res.status_code} for {url}")
            return ""
    except Exception as e:
        print(f"  ❌ Error scraping {url}: {e}")
        return ""


def ask_local_ai(prompt):
    """
    Query the local Ollama LLM with a prompt.
    
    Args:
        prompt (str): The prompt to send to the AI
        
    Returns:
        str: AI response or error message
    """
    print(f"  🤖 Consulting Local Agent ({SELECTED_MODEL})...")
    payload = {"model": SELECTED_MODEL, "prompt": prompt, "stream": False}
    try:
        response = requests.post(OLLAMA_URL, json=payload, timeout=500)
        if response.status_code == 200:
            return response.json().get('response', 'Error: No response.')
        else:
            return f"AI Error: HTTP {response.status_code}"
    except Exception as e:
        return f"AI Error: {str(e)}"


def send_email_alert(user_email, report, urls):
    """
    Send an email alert to the user with the intelligence report.
    
    Args:
        user_email (str): Recipient email address
        report (str): AI-generated intelligence report
        urls (list): List of monitored URLs
    """
    if not EMAIL_USER or not EMAIL_PW:
        print("  ⚠️ Email credentials not configured. Skipping email.")
        return
    
    msg = MIMEMultipart()
    msg['From'] = EMAIL_USER
    msg['To'] = user_email
    msg['Subject'] = "🕵️ Intelligence Alert: Competitor Changes Detected"
    
    # Format email body
    email_body = f"""
Intelligence Report
Generated: {datetime.now().strftime("%Y-%m-%d %H:%M:%S UTC")}

Monitored URLs:
{chr(10).join(f"  • {url}" for url in urls if url)}

=== AI ANALYSIS ===

{report}

===================================

This is an automated intelligence report from your Agentic Competitor Spy.
Stay ahead of the competition! 🚀
    """
    
    msg.attach(MIMEText(email_body, 'plain'))
    
    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(EMAIL_USER, EMAIL_PW)
            server.send_message(msg)
        print(f"  ✅ Email sent to {user_email}")
    except Exception as e:
        print(f"  ❌ Email failed: {e}")


def analyze(user_email, urls, supabase_client):
    """
    Main worker function: scrape URLs, analyze with AI, and send alerts.
    
    This is the core function called by the orchestrator for each user.
    """
    print(f"\n🕵️ Analyzing intel for: {user_email}")
    
    # Filter out None/empty URLs
    active_urls = [url for url in urls if url]
    
    if not active_urls:
        return {"status": "skipped", "reason": "no_urls"}
    
    # Scrape all URLs
    current_scrapes = {}
    for url in active_urls:
        content = scrape_url(url)
        if content:
            current_scrapes[url] = content
    
    if not current_scrapes:
        return {"status": "error", "reason": "scrape_failed"}
    
    # Combine current scrapes
    current_content = "\n\n---\n\n".join(
        [f"URL: {url}\n{content}" for url, content in current_scrapes.items()]
    )
    
    # Generate hash for change detection
    import hashlib
    content_hash = hashlib.md5(current_content.encode()).hexdigest()

    # Get previous hash
    job_result = supabase_client.table("monitoring_jobs").select("last_content_hash").eq("user_email", user_email).single().execute()
    old_hash = job_result.data.get("last_content_hash") if job_result.data else None

    if old_hash == content_hash:
        print("  💤 No changes detected via hash.")
        # Update last_check_at anyway so we know the agent is alive
        try:
            supabase_client.table("monitoring_jobs").update({
                "last_check_at": datetime.now().isoformat()
            }).eq("user_email", user_email).execute()
        except Exception as e:
            print(f"  ⚠️ Failed to update last_check_at: {e}")
        return {"status": "no_changes"}

    print("  🚀 Changes detected! Generating AI analysis...")
    
    prompt = f"""You are an expert competitive intelligence analyst. Analyze these competitor websites:
{current_content[:2000]}
Focus on pricing, new products, and marketing changes. Keep it concise."""
    
    ai_report = ask_local_ai(prompt)
    
    # Update Supabase
    try:
        supabase_client.table("monitoring_jobs").update({
            "latest_report": ai_report,
            "last_content_hash": content_hash,
            "last_check_at": datetime.now().isoformat()
        }).eq("user_email", user_email).execute()
        
        # Send email
        send_email_alert(user_email, ai_report, active_urls)
        
        return {"status": "success", "report": ai_report}
    except Exception as e:
        print(f"  ❌ Database update failed: {e}")
        return {"status": "error", "error": str(e)}


# Backward compatibility: if run directly, show usage message
if __name__ == "__main__":
    print("=" * 60)
    print("Multi-Tenant Intelligence Agent Worker")
    print("=" * 60)
    print("\nThis module is designed to be called by orchestrator.py")
    print("It should not be run directly.")
    print("\nFor testing, use orchestrator.py with test mode enabled.")
    print("=" * 60)
