import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // NOWPayments sends IPN as a POST request
    const body = await request.json();
    console.log('NOWPayments Webhook received:', body);

    const { payment_status, order_id, price_amount } = body;

    // We used userEmail as order_id in createPaymentInvoice
    const user_email = order_id;

    if (!user_email) {
      console.error('Webhook Error: No order_id (user_email) found in request');
      return NextResponse.json({ error: 'No order_id found' }, { status: 400 });
    }

    // Official NOWPayments statuses that mean "paid"
    const successStatuses = ['finished', 'partially_paid', 'confirmed'];

    if (successStatuses.includes(payment_status)) {
      console.log(`✅ Payment confirmed for ${user_email}. Status: ${payment_status}.`);

      // 1. Activate/Update subscription
      const { error: subError } = await supabase
        .from('subscriptions')
        .upsert({
          user_email: user_email,
          status: 'active',
          plan: price_amount ? `premium_${price_amount}` : 'premium_50',
        }, { onConflict: 'user_email' });

      if (subError) {
        console.error('❌ Error updating subscription:', subError);
        return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
      }

      // 2. Ensure monitoring job exists so user doesn't see "No intelligence reports yet" immediately after pay
      // but instead sees the URL configuration state.
      const { error: jobError } = await supabase
        .from('monitoring_jobs')
        .upsert({
          user_email: user_email,
          is_active: true,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_email' });

      if (jobError) {
        console.warn('⚠️ Warning: Could not create default monitoring job:', jobError);
      }

      return NextResponse.json({ success: true, message: 'Subscription activated' });
    } else {
      console.log(`ℹ️ Webhook received for ${user_email} with status: ${payment_status}`);
      return NextResponse.json({ success: true, message: `Status received: ${payment_status}` });
    }
  } catch (error: any) {
    console.error('❌ Webhook Processing Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


