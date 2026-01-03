import os
import json
from flask import Flask, request, jsonify
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Supabase Configuration
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

# NOWPayments Configuration (or any other provider)
IPN_SECRET = os.getenv("IPN_SECRET", "your-secret-here")

@app.route('/nowpayments_webhook', methods=['POST'])
def webhook():
    # 1. Verification Logic (Simplified for now)
    data = request.get_json()
    
    # 2. Business Logic: Handle finished payment
    if data.get('payment_status') == 'finished':
        # Get customer email (this depends on your provider's data structure)
        # Often it's passed in order_description or as custom data
        email = data.get('customer_email') or data.get('order_id') # Replace with actual email field
        
        if not email:
            print("⚠️ No email found in webhook data")
            return jsonify({"status": "error", "message": "No email found"}), 400

        print(f"💰 Payment finished for: {email}. Setting up account...")

        try:
            # 1. Add user to subscriptions table
            # We use upsert to avoid conflicts if they pay twice or we retry
            supabase.table("subscriptions").upsert({
                "user_email": email,
                "status": "active",
                "plan": "premium_50"
            }).execute()

            # 2. Create blank job for them
            supabase.table("monitoring_jobs").upsert({
                "user_email": email,
                "is_active": True
            }).execute()

            print(f"✅ User and monitoring job created for: {email}")
            return jsonify({"status": "success", "message": "Account activated"}), 200

        except Exception as e:
            print(f"❌ Error setting up account: {e}")
            return jsonify({"status": "error", "message": str(e)}), 500

    return jsonify({"status": "received"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4242)
