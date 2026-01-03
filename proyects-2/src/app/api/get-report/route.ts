import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_email = searchParams.get('user_email');

    if (!user_email) {
      return NextResponse.json({ error: 'user_email is required' }, { status: 400 });
    }

    // Check subscription status
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_email', user_email)
      .single();

    if (subError || !subscription || subscription.status !== 'active') {
      return NextResponse.json({ 
        error: 'Active subscription required',
        is_unsubscribed: true 
      }, { status: 403 });
    }

    const { data, error } = await supabase
      .from('monitoring_jobs')
      .select('latest_report, last_check_at, url_1, url_2, url_3')
      .eq('user_email', user_email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return NextResponse.json({
      success: true,
      data: {
        latest_report: data?.latest_report || null,
        last_check_at: data?.last_check_at || null,
        monitored_urls: [data?.url_1, data?.url_2, data?.url_3].filter(Boolean)
      },
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching report:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
