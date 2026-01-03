from nowpayments_api import NOWPaymentsAPI

# Use your actual API Key
api_key = '661SBYNABMMSY9N377NE1FAYA3FJ'
nowpayments = NOWPaymentsAPI(api_key)

# Create a $50 payment for the "Intelligence Agent"
payment_data = {
    "price_amount": 50,
    "price_currency": "usd",
    "pay_currency": "btc", # The customer can change this on the payment page
    "order_id": "AGENT_001",
    "ipn_callback_url": "https://your-ngrok-url.app/nowpayments_webhook" 
}

response = nowpayments.create_payment(**payment_data)
print(f"Send this link to your customer: {response['invoice_url']}")
