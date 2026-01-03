'use client';

import React, { useState, useEffect } from 'react';
import { Search, Zap, Loader2, Shield, ExternalLink, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

interface DemoResult {
  analysis: string;
  url: string;
  timestamp: string;
}

export default function DemoAgent({ onActivateClick }: { onActivateClick: () => void }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DemoResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    // Check if user has already run a demo this session
    const demoRun = sessionStorage.getItem('demo_run_completed');
    if (demoRun) {
      setHasRun(true);
    }
  }, []);

  const handleRunDemo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hasRun) return;
    
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/demo-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to run demo analysis');
      }

      setResult(data);
      setHasRun(true);
      sessionStorage.setItem('demo_run_completed', 'true');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="demo-section" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent -z-10" />
      
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Zap className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-300 text-sm font-bold uppercase tracking-widest">Free Experience</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Test the Agent&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Intelligence</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Experience a one-time "Quick Intel" check. Enter any competitor URL and see our local AI reason through their strategy in real-time.
          </p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Form Section */}
          {!result && (
            <form onSubmit={handleRunDemo} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="url"
                  disabled={loading || hasRun}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://competitor-website.com"
                  className="block w-full pl-12 pr-4 py-4 bg-slate-800/50 border border-slate-700 rounded-2xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              {hasRun && !result && (
                <div className="flex items-center gap-2 text-amber-400 text-sm bg-amber-400/10 p-3 rounded-lg border border-amber-400/20">
                  <Shield className="w-4 h-4" />
                  You have already used your free demo this session. Activate the full agent for unlimited checks.
                </div>
              )}

              <button
                type="submit"
                disabled={loading || hasRun || !url}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>AGENT REASONING...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6" />
                    <span>RUN AI ANALYSIS</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Result Section (Mini-Dashboard Style) */}
          {result && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Analysis Complete</h3>
                    <p className="text-xs text-slate-500">{new Date(result.timestamp).toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">
                  <Shield className="w-3 h-3 text-blue-400" />
                  <span className="text-[10px] font-bold text-blue-300 uppercase">Demo Report</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">Source Target</label>
                  <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <ExternalLink className="w-4 h-4 text-slate-500" />
                    <span className="text-sm text-slate-300 truncate">{result.url}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">AI Intelligence Summary</label>
                  <div className="bg-gradient-to-br from-slate-800/50 to-blue-900/10 p-6 rounded-2xl border border-slate-700/50 relative overflow-hidden group">
                    {/* Animated background pulse */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />
                    
                    <p className="text-slate-200 leading-relaxed italic relative z-10">
                      &quot;{result.analysis}&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Lead Capture CTA */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl border border-blue-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Want 24/7 autonomous monitoring?</h4>
                  <p className="text-slate-400 text-sm">Get the Full Agent to track up to 3 competitors with instant email alerts.</p>
                </div>
                <button
                  onClick={onActivateClick}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 shrink-0"
                >
                  GET FULL AGENT ($50)
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center items-center gap-8 opacity-50 grayscale transition-all hover:grayscale-0 hover:opacity-100">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase">Local Execution</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase">Instant Intel</span>
          </div>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase">Deep Scrape</span>
          </div>
        </div>
      </div>
    </div>
  );
}

