'use server';

export async function createPaymentInvoice(userEmail: string) {
  const apiKey = process.env.NOWPAYMENTS_API_KEY;
  const dashboardUrl = process.env.NEXT_PUBLIC_DASHBOARD_URL || 'http://localhost:3000/dashboard';
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL; // ngrok address

  if (!apiKey) {
    throw new Error('NOWPAYMENTS_API_KEY is not configured');
  }

  try {
    const response = await fetch('https://api.nowpayments.io/v1/invoice', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price_amount: 50,
        price_currency: 'usd',
        order_id: userEmail,
        order_description: 'Agentic Competitor Spy Subscription',
        ipn_callback_url: webhookUrl,
        success_url: dashboardUrl,
        cancel_url: dashboardUrl.replace('/dashboard', ''),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('NOWPayments API Error:', data);
      throw new Error(data.message || 'Failed to create invoice');
    }

    return { invoice_url: data.invoice_url };
  } catch (error: any) {
    console.error('Payment Action Error:', error);
    return { error: error.message };
  }
}



