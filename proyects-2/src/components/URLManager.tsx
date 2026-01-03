'use client';

import { useState, useEffect } from 'react';
import { Globe, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface URLManagerProps {
  userEmail: string;
}

export default function URLManager({ userEmail }: URLManagerProps) {
  const [url1, setUrl1] = useState('');
  const [url2, setUrl2] = useState('');
  const [url3, setUrl3] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingUrls, setFetchingUrls] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchCurrentURLs();
  }, [userEmail]);

  const fetchCurrentURLs = async () => {
    try {
      setFetchingUrls(true);
      const response = await fetch(`/api/update-targets?user_email=${encodeURIComponent(userEmail)}`);
      const result = await response.json();

      if (response.ok && result.data) {
        setUrl1(result.data.url_1 || '');
        setUrl2(result.data.url_2 || '');
        setUrl3(result.data.url_3 || '');
      }
    } catch (err) {
      console.error('Error fetching URLs:', err);
    } finally {
      setFetchingUrls(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/update-targets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_email: userEmail,
          url_1: url1.trim() || null,
          url_2: url2.trim() || null,
          url_3: url3.trim() || null,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update URLs');
      }

      setMessage({
        type: 'success',
        text: 'Competitor URLs updated successfully! Your agent will monitor these URLs.',
      });

      // Clear success message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    } catch (err: any) {
      setMessage({
        type: 'error',
        text: err.message || 'Failed to update URLs. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const isValidUrl = (url: string) => {
    if (!url) return true; // Empty is OK
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const canSubmit = 
    !loading && 
    (url1 || url2 || url3) &&
    isValidUrl(url1) &&
    isValidUrl(url2) &&
    isValidUrl(url3);

  if (fetchingUrls) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white">Competitor URL Configuration</h2>
        </div>
        <p className="text-purple-100 text-sm mt-2">
          Configure up to 3 competitor websites to monitor
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* URL Input 1 */}
        <div>
          <label htmlFor="url1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Competitor URL #1
          </label>
          <input
            type="url"
            id="url1"
            value={url1}
            onChange={(e) => setUrl1(e.target.value)}
            placeholder="https://competitor1.com"
            className={`w-full px-4 py-3 rounded-lg border ${
              url1 && !isValidUrl(url1)
                ? 'border-red-300 dark:border-red-700'
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
          />
          {url1 && !isValidUrl(url1) && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">Please enter a valid URL</p>
          )}
        </div>

        {/* URL Input 2 */}
        <div>
          <label htmlFor="url2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Competitor URL #2 <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="url"
            id="url2"
            value={url2}
            onChange={(e) => setUrl2(e.target.value)}
            placeholder="https://competitor2.com"
            className={`w-full px-4 py-3 rounded-lg border ${
              url2 && !isValidUrl(url2)
                ? 'border-red-300 dark:border-red-700'
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
          />
          {url2 && !isValidUrl(url2) && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">Please enter a valid URL</p>
          )}
        </div>

        {/* URL Input 3 */}
        <div>
          <label htmlFor="url3" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Competitor URL #3 <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="url"
            id="url3"
            value={url3}
            onChange={(e) => setUrl3(e.target.value)}
            placeholder="https://competitor3.com"
            className={`w-full px-4 py-3 rounded-lg border ${
              url3 && !isValidUrl(url3)
                ? 'border-red-300 dark:border-red-700'
                : 'border-gray-300 dark:border-gray-600'
            } bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors`}
          />
          {url3 && !isValidUrl(url3) && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">Please enter a valid URL</p>
          )}
        </div>

        {/* Message Display */}
        {message && (
          <div
            className={`flex items-start gap-3 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            <p
              className={`text-sm ${
                message.type === 'success'
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-red-700 dark:text-red-300'
              }`}
            >
              {message.text}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!canSubmit}
          className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
            canSubmit
              ? 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save URLs & Start Monitoring
            </>
          )}
        </button>

        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>💡 Tip:</strong> Your AI agent will check these websites every 24 hours and email you
            when significant changes are detected.
          </p>
        </div>
      </form>
    </div>
  );
}



