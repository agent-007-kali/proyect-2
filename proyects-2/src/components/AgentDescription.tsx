'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Zap, Target, Mail, Lock, CheckCircle, HelpCircle, Eye } from 'lucide-react';

interface AgentDescriptionProps {
  isOpen: boolean;
  onClose: () => void;
}

const AgentDescription: React.FC<AgentDescriptionProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30">
                  <Shield className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Agentic Competitor Spy</h2>
                  <p className="text-cyan-400 text-xs font-mono uppercase tracking-widest">Full Operational Intelligence Specs</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 space-y-12">
              {/* Hero Section */}
              <div className="text-center space-y-4">
                <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  One Price. Total Intelligence.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Zero Subscriptions.</span>
                </h3>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  Stop paying monthly for data that’s already outdated. Deploy your agent today.
                </p>
                <p className="text-slate-400 leading-relaxed italic">
                  Stay Ahead. Outsmart. Outpace. In business, being the last to know is being the first to lose. Stop manual tracking and start winning with the Agentic Competitor Spy—your 24/7 digital operative that never sleeps.
                </p>
              </div>

              {/* The Advantage */}
              <div className="bg-cyan-500/5 rounded-2xl p-6 border border-cyan-500/20 text-center">
                <h4 className="text-xl font-bold text-white mb-2">The Intelligence Advantage</h4>
                <p className="text-slate-300 leading-relaxed">
                  For a limited time, gain a permanent edge over your rivals for a one-time payment of <span className="text-cyan-400 font-bold text-xl">$50</span>. No subscriptions, no hidden fees—just pure, actionable data delivered straight to your dashboard.
                </p>
              </div>

              {/* How it Works */}
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { title: 'Deploy', desc: 'Simply enter the 3 websites of your top competitors.', icon: Zap },
                  { title: 'Monitor', desc: 'Our agentic AI crawls their sites, tracking every move in real-time.', icon: Eye },
                  { title: 'Intel', desc: 'Receive instant alerts and comprehensive reports the moment they change.', icon: Target },
                ].map((step, i) => (
                  <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 text-center space-y-3">
                    <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border border-cyan-500/20">
                      <step.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <h5 className="font-bold text-white">{step.title}</h5>
                    <p className="text-sm text-slate-400">{step.desc}</p>
                  </div>
                ))}
              </div>

              {/* What your agent tracks */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-cyan-400" />
                  What Your Agent Tracks For You
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Pricing Strategy', text: 'Spot price drops or hikes instantly to protect your margins.' },
                    { label: 'Product Launches', text: 'Be the first to know about new offerings or feature updates.' },
                    { label: 'Marketing Moves', text: 'Track changes in messaging, banners, promotions, and SEO.' },
                    { label: 'Site Updates', text: 'Monitor structural shifts or new pages the moment they go live.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30">
                      <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-white text-sm">{item.label}</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Business Needs This */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-cyan-400" />
                  Why Your Business Needs This
                </h4>
                <div className="space-y-4">
                  {[
                    { title: 'From Reactive to Proactive', text: 'Don’t wait for a customer to tell you your competitor is cheaper. Know it first and adjust your strategy instantly.' },
                    { title: 'Time is Money', text: 'Save dozens of hours a month on manual research. Let the agent do the "boring" work while you focus on growth.' },
                    { title: 'Strategic Precision', text: "Use historical data and change reports to predict your competition's next move before they make it." },
                  ].map((item, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-gradient-to-r from-slate-800/50 to-transparent border-l-4 border-cyan-500">
                      <h5 className="font-bold text-white mb-1">{item.title}</h5>
                      <p className="text-sm text-slate-400">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* License Inclusions */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white">What’s Included in Your $50 License</h4>
                <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
                  {[
                    '3 Competitor Targets',
                    'Lightning-Fast Daily Reports',
                    'Direct-to-Inbox Briefing',
                    'Lifetime Access',
                    'Precision Intelligence',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-slate-400 leading-relaxed bg-slate-800/20 p-4 rounded-xl">
                  Our agents don't just "scrape" data; they understand it. They filter out the noise and only tell you what actually matters for your bottom line.
                </p>
              </div>

              {/* Confidentiality */}
              <div className="space-y-6 p-8 rounded-3xl bg-slate-950 border border-slate-800 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Lock className="w-32 h-32 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-400" />
                  Your Intelligence is Confidential
                </h4>
                <div className="grid sm:grid-cols-3 gap-6 relative z-10">
                  <div>
                    <p className="font-bold text-white text-sm mb-1">Zero Trace Monitoring</p>
                    <p className="text-xs text-slate-400">Our agents operate discreetly. Your competitors will never know they are being monitored.</p>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-1">Encrypted Reports</p>
                    <p className="text-xs text-slate-400">Your intel reports are for your eyes only. We do not sell or share your target list.</p>
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm mb-1">Secure Payments</p>
                    <p className="text-xs text-slate-400">We use industry-standard encryption to process your one-time payment safely.</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-400" />
                  Frequently Asked Questions
                </h4>
                <div className="space-y-6">
                  {[
                    { q: 'Is it really just $50?', a: 'Yes. For the launch phase, we are offering a lifetime license for a flat fee to build our core community of "Intel Insiders." Stop the subscription fatigue.' },
                    { q: 'Can I change my 3 websites later?', a: 'Yes. You can update your target list at any time through your agent settings as your market evolves.' },
                    { q: 'What happens if I need more than 3 websites?', a: 'Once you are inside, you will have the option to add "Agentic Swarms" to monitor your entire industry at a special member rate.' },
                  ].map((faq, i) => (
                    <div key={i} className="space-y-2">
                      <p className="font-bold text-white">{faq.q}</p>
                      <p className="text-sm text-slate-400">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final CTA */}
              <div className="pt-8 border-t border-slate-800 text-center space-y-6">
                <div className="space-y-2">
                  <p className="text-cyan-400 font-mono text-sm tracking-[0.3em]">[ THE LAUNCH OPERATIVE ]</p>
                  <p className="text-4xl font-black text-white">$50 ONE-TIME PAYMENT</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-2xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/20"
                >
                  SECURE YOUR AGENT NOW – STAY AHEAD OF THE GAME
                </button>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Limited to the first 1000 users at this price.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AgentDescription;


