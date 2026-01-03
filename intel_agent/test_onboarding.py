import os
import requests
import json
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def simulate_payment(email):
    webhook_url = "http://localhost:4242/nowpayments_webhook"
    
    payload = {
        "payment_status": "finished",
        "customer_email": email,
        "price_amount": 50,
        "price_currency": "usd",
        "order_id": email,
        "order_description": "Agentic Competitor Spy Subscription"
    }
    
    print(f"🚀 Simulating payment webhook for: {email}")
    try:
        response = requests.post(webhook_url, json=payload)
        print(f"📡 Webhook Response: {response.status_code}")
        print(f"📄 Body: {response.text}")
        
        if response.status_code == 200:
            print("\n✅ SUCCESS: Onboarding triggered. Please check Supabase 'subscriptions' and 'monitoring_jobs' tables.")
        else:
            print("\n❌ FAILED: Check if listener.py is running on port 4242.")
            
    except Exception as e:
        print(f"❌ Error connecting to listener: {e}")

if __name__ == "__main__":
    test_email = input("Enter a test email address: ") or "test_spy_user@example.com"
    simulate_payment(test_email)



