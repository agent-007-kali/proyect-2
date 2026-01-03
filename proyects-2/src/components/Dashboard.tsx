'use client';

import { useState, useEffect } from 'react';
import { Shield, TrendingUp, Clock, ExternalLink, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';

interface DashboardData {
  latest_report: string | null;
  last_check_at: string | null;
  monitored_urls: string[];
}

interface DashboardProps {
  userEmail: string;
}

export default function Dashboard({ userEmail }: DashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);
      setIsUnsubscribed(false);
      const response = await fetch(`/api/get-report?user_email=${encodeURIComponent(userEmail)}`);
      const result = await response.json();

      if (!response.ok) {
        if (result.is_unsubscribed) {
          setIsUnsubscribed(true);
        }
        throw new Error(result.error || 'Failed to fetch report');
      }

      setData(result.data);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [userEmail]);

  const formatDate = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatRelativeTime = (timestamp: string | null) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600 dark:text-gray-400">Loading intelligence report...</p>
        </div>
      </div>
    );
  }

  if (isUnsubscribed) {
    return (
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-8 text-center">
        <AlertCircle className="w-16 h-16 mx-auto mb-4 text-amber-500" />
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Subscription Inactive
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          You need an active subscription to access the intelligence dashboard.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold transition-colors shadow-lg"
        >
          Activate Agent ($50)
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              Error Loading Report
            </h3>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <button
              onClick={fetchReport}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.latest_report) {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-8 text-center">
        <Shield className="w-16 h-16 mx-auto mb-4 text-blue-500" />
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          No Intelligence Reports Yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Your AI agent will start monitoring your competitors soon.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          {data?.monitored_urls && data.monitored_urls.length > 0 ? (
            <>Monitoring {data.monitored_urls.length} URL{data.monitored_urls.length > 1 ? 's' : ''}</>
          ) : (
            'Configure your competitor URLs to get started'
          )}
        </p>
      </div>
    );
  }

  const { latest_report, last_check_at, monitored_urls } = data;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Check</span>
          </div>
          <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {formatRelativeTime(last_check_at)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {formatDate(last_check_at)}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Monitoring</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">{monitored_urls.length}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Competitor URLs</p>
        </div>
      </div>

      {/* Latest Report */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">Latest Intelligence Report</h2>
            </div>
            <button
              onClick={fetchReport}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4 text-white" />
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-2">
            Generated on {formatDate(last_check_at)}
          </p>
        </div>

        <div className="p-6">
          {/* Monitored URLs */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              Monitored Competitors
            </h3>
            <div className="space-y-2">
              {monitored_urls.map((url, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">
                    {url}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* AI Analysis */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">
              AI Analysis
            </h3>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950/30 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                  {latest_report}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


