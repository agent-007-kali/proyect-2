'use client';

import { useState, useEffect } from 'react';
import { Shield, LayoutDashboard, Settings, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Dashboard from '@/components/Dashboard';
import URLManager from '@/components/URLManager';

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'reports' | 'settings'>('reports');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem('user_email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full text-center">
          <Shield className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-4">Dashboard Access</h1>
          <p className="text-slate-400 mb-8">
            Please enter your email on the home page to access your intelligence dashboard.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Agentic Spy
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400 hidden sm:block">{email}</span>
              <Link 
                href="/"
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Sign Out
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'reports'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Intelligence Reports
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <Settings className="w-5 h-5" />
              Monitor Settings
            </button>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            {activeTab === 'reports' ? (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Intelligence Dashboard</h1>
                  <p className="text-slate-400">View and analyze competitor movements detected by your agent.</p>
                </div>
                <Dashboard userEmail={email} />
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Monitor Settings</h1>
                  <p className="text-slate-400">Configure which competitor websites your agent should track.</p>
                </div>
                <URLManager userEmail={email} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
