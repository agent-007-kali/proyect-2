import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_email, url_1, url_2, url_3 } = body;

    if (!user_email) {
      return NextResponse.json({ error: 'user_email is required' }, { status: 400 });
    }

    // Check if user has an active subscription
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_email', user_email)
      .single();

    if (subError || !subscription || subscription.status !== 'active') {
      return NextResponse.json({ 
        error: 'Active subscription required', 
        details: 'Please complete your payment to activate the agent.' 
      }, { status: 403 });
    }

    // Upsert monitoring job
    const { data, error } = await supabase
      .from('monitoring_jobs')
      .upsert(
        {
          user_email,
          url_1: url_1 || null,
          url_2: url_2 || null,
          url_3: url_3 || null,
          is_active: true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_email' }
      )
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating targets:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_email = searchParams.get('user_email');

    if (!user_email) {
      return NextResponse.json({ error: 'user_email is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('monitoring_jobs')
      .select('url_1, url_2, url_3, last_check_at, is_active')
      .eq('user_email', user_email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return NextResponse.json({ success: true, data: data || null }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching targets:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
