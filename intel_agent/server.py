from flask import Flask, request, jsonify
import stripe
import subprocess # To trigger your agent.py

app = Flask(__name__)

# CONFIG
stripe.api_key = "sk_live_YOUR_STRIPE_SECRET_KEY"
WEBHOOK_SECRET = "whsec_YOUR_WEBHOOK_SECRET"

@app.route('/webhook', methods=['POST'])
def stripe_webhook():
    payload = request.get_data()
    sig_header = request.headers.get('Stripe-Signature')

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, WEBHOOK_SECRET)
    except Exception as e:
        return jsonify(success=False), 400

    # Handle successful payment
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        customer_email = session['customer_details']['email']
        
        print(f"💰 New $50 Customer: {customer_email}")
        
        # TRIGGER YOUR AGENT
        # This runs your existing agent.py logic for the new user
        subprocess.Popen(["python3", "agent.py", "--email", customer_email])

    return jsonify(success=True)

if __name__ == '__main__':
    app.run(port=4242)
