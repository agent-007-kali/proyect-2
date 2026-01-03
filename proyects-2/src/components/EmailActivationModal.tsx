'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Zap, Loader2, X } from 'lucide-react';

interface EmailActivationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (email: string) => void;
  isPending: boolean;
}

export default function EmailActivationModal({ isOpen, onClose, onConfirm, isPending }: EmailActivationModalProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('user_email');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    localStorage.setItem('user_email', email.trim());
    onConfirm(email.trim());
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 max-w-md w-full relative overflow-hidden">
        {/* Progress bar for pending state */}
        {isPending && (
          <div className="absolute top-0 left-0 h-1 bg-cyan-500 animate-pulse w-full" />
        )}

        <div className="p-8">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/20">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Activate Your Agent</h2>
              <p className="text-sm text-slate-400">Secure competitive intelligence</p>
            </div>
          </div>

          <p className="text-slate-300 mb-6 leading-relaxed">
            Please enter the email address where you would like to receive intelligence alerts and access your dashboard.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="modal-email" className="block text-sm font-medium text-slate-400 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address
              </label>
              <input
                id="modal-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agent@example.com"
                className={`w-full bg-slate-800 border ${error ? 'border-red-500' : 'border-slate-700'} rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all`}
                disabled={isPending}
              />
              {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full group relative px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>PREPARING SECURE CHECKOUT...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  <span>PROCEED TO PAYMENT</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            <span className="flex items-center gap-1.5">
              <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
              SECURE ENCRYPTION
            </span>
            <span className="flex items-center gap-1.5">
              <div className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse" />
              INSTANT ACTIVATION
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


