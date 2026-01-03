'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AIAgent from '@/components/AIAgent';
import ContactForm from '@/components/ContactForm';
import EmailActivationModal from '@/components/EmailActivationModal';
import DemoAgent from '@/components/DemoAgent';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Terminal from '@/components/AgenticTerminal';
import AgentDescription from '@/components/AgentDescription';
import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createPaymentInvoice } from '@/app/actions/payment';
import {
  Brain,
  Cpu,
  Zap,
  Rocket,
  Shield,
  BarChart3,
  Network,
  Sparkles,
  Bot,
  Database,
  Cloud,
  Lock,
  CheckCircle,
  ArrowRight,
  Globe,
  Server,
  CircuitBoard,
  Atom,
  Layers,
  Target,
  Eye,
  ChevronDown,
  RefreshCw,
  Lightbulb,
  Cog,
  Workflow,
  Infinity,
  Timer,
  Users,
  TrendingUp,
  Code,
  GitBranch,
  Monitor,
  Smartphone,
  Palette,
  Camera,
  FileText,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  ExternalLink,
  Star,
  Award,
  Trophy,
  Medal,
  Gem,
  Crown,
  Sparkles as Magic,
  Binary,
  // Additional futuristic icons
  Microchip,
  Wifi,
  Radar,
  Activity,
  Settings,
  HardDrive,
  PieChart,
  LineChart,
  Cpu as Processor,
  Brain as Neural,
  CircuitBoard as Circuit,
  Database as DataStore,
  Network as WebNetwork,
  Bot as Android,
  Sparkles as Hologram,
  Atom as Quantum,
  Microchip as Nanochip,
  Wifi as Signal,
  Radar as Scanner,
  Activity as Pulse,
  Settings as Config,
  HardDrive as Storage,
  PieChart as Analytics,
  LineChart as Trends,
  Zap as Plasma,
  Rocket as Hyperdrive,
  Shield as ForceField,
  Lock as Encryption,
  Target as Precision,
  Eye as Surveillance,
  Lightbulb as Innovation,
  Cog as Mechanism,
  Globe as Matrix,
  Server as Mainframe,
  Cloud as Nebula,
  Layers as Dimensions,
  Activity as BioSignal,
  TrendingUp as Ascent,
  Code as Algorithm,
  Monitor as HologramScreen,
  Smartphone as NeuralLink,
  Palette as Synthwave,
  Camera as QuantumCamera,
  FileText as DataStream,
  MessageSquare as NeuralChat,
  Phone as HoloCall,
  Mail as QuantumMail,
  MapPin as LocationMatrix,
  Star as Supernova,
  Award as Achievement,
  Trophy as Victory,
  Medal as Badge,
  Gem as Crystal,
  Crown as Dominion
} from 'lucide-react';

export default function Home() {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [terminalLines, setTerminalLines] = useState<Array<{
    id: number;
    content: React.ReactNode;
    delay: number;
    visible: boolean;
  }>>([]);

  useEffect(() => {
    const lines = [
      { id: 1, content: '> agent.plan("build health-check API in Next.js")', delay: 500, visible: false },
      { id: 2, content: '[agent] Analyzing requirements, repo structure, and existing routes...', delay: 1500, visible: false },
      { id: 3, content: '[agent] Plan: create /api/health, add status payload, wire into monitoring.', delay: 2500, visible: false },
      { id: 4, content: '> agent.execute(plan)', delay: 3500, visible: false },
      { id: 5, content: '[agent] Creating file <span className="text-cyan-300">src/app/api/health/route.ts</span>', delay: 4500, visible: false },
      { 
        id: 6, 
        content: (
          <div className="mt-2 rounded-lg bg-slate-900/80 border border-slate-700/60 p-3 shadow-sm">
            <pre className="text-[0.68rem] md:text-xs leading-relaxed">
              {`import { NextResponse } from "next/server";\n\nexport async function GET() {\n  const status = {\n    service: "agentic-ai-api",\n    status: "ok",\n    timestamp: new Date().toISOString(),\n  };\n\n  return NextResponse.json(status);\n}`}
            </pre>
          </div>
        ), 
        delay: 5500, 
        visible: false 
      },
      { id: 7, content: '[agent] Running <span className="text-cyan-300">npm run lint</span> …', delay: 7500, visible: false },
      { id: 8, content: '✔ Lint passed — endpoint ready.', delay: 8500, visible: false },
      { id: 9, content: '> agent.verify("/api/health")', delay: 9500, visible: false },
      { id: 10, content: '[agent] Response: {"{"}<span className="text-cyan-300">"status"</span>: <span className="text-emerald-300">"ok"</span>, …{"}"}', delay: 10500, visible: false },
      { id: 11, content: '[agent] Task complete. Ready for next instruction.', delay: 11500, visible: false },
    ];

    // Schedule visibility updates
    const timers = lines.map(line => 
      setTimeout(() => {
        setTerminalLines(prev => 
          prev.map(l => l.id === line.id ? {...l, visible: true} : l)
        );
      }, line.delay)
    );

    // Initialize with hidden lines
    setTerminalLines(lines);

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const handleActivateAgent = async () => {
    const email = localStorage.getItem('user_email');
    
    if (!email) {
      setIsEmailModalOpen(true);
      return;
    }

    initiatePayment(email);
  };

  const initiatePayment = (email: string) => {
    startTransition(async () => {
      try {
        const result = await createPaymentInvoice(email);
        if (result.invoice_url) {
          window.location.href = result.invoice_url;
        } else if (result.error) {
          alert(`Error: ${result.error}`);
        }
      } catch (err) {
        alert("Failed to initiate payment. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-900">
      {/* Header */}
      <Header onQuoteClick={() => setIsContactFormOpen(true)} />

      {/* Hero Section - Cyberpunk Futuristic */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950">
        {/* Cyberpunk animated background */}
        <div className="absolute inset-0">
          {/* Animated grid lines */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}></div>
          </div>

          {/* Enhanced Floating geometric shapes */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-cyan-500/40 rounded-lg rotate-45 animate-spin-slow shadow-lg shadow-cyan-500/20"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-purple-500/40 rounded-full animate-pulse shadow-lg shadow-purple-500/20"></div>
          <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded-lg transform rotate-12 animate-bounce shadow-lg"></div>
          {/* Additional futuristic elements */}
          <div className="absolute top-1/2 right-1/4 w-20 h-20 border-2 border-pink-500/30 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-sm animate-pulse" style={{ animationDelay: '1.5s' }}></div>

          {/* Glowing particles */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-10 w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>

          {/* Animated light beams */}
          <div className="absolute top-0 left-1/3 w-px h-32 bg-gradient-to-b from-cyan-500/50 to-transparent animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-px h-32 bg-gradient-to-t from-purple-500/50 to-transparent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-purple-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-blue-500/10 border border-cyan-400/30 backdrop-blur-md shadow-2xl shadow-cyan-500/10">
              <CircuitBoard className="w-5 h-5 mr-3 text-cyan-400 animate-pulse" />
              <span className="text-cyan-300 font-medium tracking-wide text-sm">
                NEURAL NETWORK • AGENTIC AI • QUANTUM COMPUTING
              </span>
              <div className="ml-3 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-8 leading-tight relative drop-shadow-neon">
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-x">
                  Agentic AI-Build
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full shadow-lg shadow-cyan-500/50"></div>
                <div className="absolute -bottom-3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent rounded-full"></div>
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient-x" style={{ animationDelay: '2s' }}>
                Custom AI-Powered Applications
              </span>

              {/* Futuristic accent elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 border border-cyan-400/30 rounded-full animate-spin-slow">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -bottom-10 -left-10 w-8 h-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg rotate-45 animate-bounce">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-lg opacity-20 animate-pulse"></div>
              </div>

              {/* Floating data particles */}
              <div className="absolute top-1/2 -left-8 text-cyan-400/60 text-xs font-mono animate-bounce">010101</div>
              <div className="absolute bottom-1/3 -right-12 text-purple-400/60 text-xs font-mono animate-pulse" style={{ animationDelay: '1s' }}>A1B2C3</div>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              <span className="text-cyan-300 font-medium">Agentic AI development</span> for custom applications that think, learn, and adapt autonomously.
              From neural networks to quantum-enhanced systems, I build AI-powered solutions that transform your business operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="group relative px-10 py-5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-400 hover:via-purple-400 hover:to-pink-400 text-white font-bold rounded-2xl transition-all duration-500 transform hover:scale-110 shadow-2xl shadow-cyan-500/25 overflow-hidden border border-cyan-400/30"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <Zap className="w-6 h-6 animate-pulse" />
                  <span className="tracking-wide">INITIATE NEURAL LINK</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                {/* Animated background effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                {/* Holographic glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 group-hover:blur-xl transition-all duration-500 -z-10"></div>
              </button>

              <button
                onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-10 py-5 border-2 border-cyan-400/50 text-cyan-300 font-bold rounded-2xl hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10 transition-all duration-500 transform hover:scale-105 backdrop-blur-md shadow-xl shadow-cyan-500/10 hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <Eye className="w-6 h-6 group-hover:text-cyan-200 transition-colors duration-300" />
                  <span className="tracking-wide">EXPLORE MATRIX</span>
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
                </span>
                {/* Scanning line effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500 rounded-2xl"></div>
              </button>
            </div>

            {/* Professional Agentic AI Flowchart */}
            <div className="relative max-w-6xl mx-auto mt-16">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" className="rounded-3xl">
                  <defs>
                    <pattern id="flowchart-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#flowchart-grid)" />
                </svg>
              </div>

              <div className="relative bg-white/90 dark:bg-gray-800/90 rounded-3xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 lg:p-12 backdrop-blur-xl"
                   style={{
                     background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                     backdropFilter: 'blur(20px)',
                     border: '1px solid rgba(255,255,255,0.18)',
                     boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                   }}>
                
                {/* Agentic Competitor Spy Product */}
                <div className="mb-16 flex flex-col lg:flex-row items-center gap-12 bg-slate-900/40 rounded-3xl p-8 border border-cyan-500/20 backdrop-blur-sm shadow-2xl overflow-hidden">
                  <div className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl border-2 border-cyan-500/50 group transition-transform hover:scale-105 shrink-0">
                    <Image 
                      src="/agentic-spy.jpg" 
                      alt="Agentic Competitor Spy" 
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <p className="text-cyan-300 font-mono text-xs tracking-widest uppercase">Autonomous Intelligence</p>
                    </div>
                  </div>
                  
                  <div className="flex-1 text-left">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
                      <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                      <span className="text-cyan-300 text-lg font-black uppercase tracking-tight">$50 ONE-TIME PAYMENT</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Agentic Competitor Spy</h3>
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                      Transform your competitive intelligence with our autonomous AI agent. It monitors your competitors 24/7, detects every change, and delivers deep-dive AI reports directly to your dashboard and inbox.
                    </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <button 
                      onClick={handleActivateAgent}
                      disabled={isPending}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/20 transform hover:scale-105 gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isPending ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <Zap className="w-5 h-5" />
                      )}
                      {isPending ? 'PREPARING SECURE CHECKOUT...' : 'ACTIVATE AGENT NOW'}
                    </button>

                    <a href="https://nowpayments.io/payment/?iid=4954953988&source=button" target="_blank" rel="noreferrer noopener" className="transform transition-transform hover:scale-105">
                      <img src="https://nowpayments.io/images/embeds/payment-button-black.svg" alt="Crypto payment button by NOWPayments" />
                    </a>
                  </div>
                  <button 
                    onClick={() => setIsDescriptionOpen(true)}
                    className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors group"
                  >
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full group-hover:scale-150 transition-transform" />
                    View Full Operational Specs & Intel Advantage
                  </button>
                </div>
              </div>

                {/* Terminal Section */}
                <div className="flex flex-col text-center">
                  <div className="mb-6">
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      Agentic AI in Action
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base">
                      A visual terminal of an autonomous AI agent reasoning and writing code.
                    </p>
                  </div>

                  <div className="w-full rounded-2xl overflow-hidden shadow-2xl">
                    <Terminal />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <DemoAgent onActivateClick={handleActivateAgent} />

      {/* Features Section - Cyberpunk Style */}
      <section id="features-section" className="py-32 bg-gradient-to-b from-slate-950 via-gray-900 to-slate-950 relative overflow-hidden">
        {/* Enhanced Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse shadow-2xl shadow-cyan-500/20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse shadow-2xl shadow-purple-500/20" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/8 rounded-full blur-3xl animate-pulse shadow-2xl shadow-pink-500/20" style={{ animationDelay: '4s' }}></div>
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 mb-8 backdrop-blur-sm">
              <Binary className="w-4 h-4 mr-2 text-cyan-400 animate-pulse" />
              <span className="text-cyan-300 font-medium text-sm tracking-wider">NEURAL CAPABILITIES</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Everything you need to
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient-x">
                forge neural networks
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              From quantum algorithms to autonomous agents, I provide comprehensive AI development services that bring your intelligent applications to life in the digital age.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 dark:from-purple-900/40 dark:via-purple-800/40 dark:to-purple-700/40 rounded-xl flex items-center justify-center shadow-inner border border-purple-200/50 dark:border-purple-700/50 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Brain className="w-7 h-7 text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300 relative z-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Agentic AI Development
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Build autonomous AI agents that can think, learn, and make decisions.
                  From conversational AI to autonomous systems that adapt to your business needs.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 dark:from-blue-900/40 dark:via-blue-800/40 dark:to-blue-700/40 rounded-xl flex items-center justify-center shadow-inner border border-blue-200/50 dark:border-blue-700/50 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Processor className="w-7 h-7 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors duration-300 relative z-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Custom AI Applications
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Tailored AI solutions designed specifically for your business.
                  From intelligent chatbots to predictive analytics platforms built from the ground up.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-600 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 via-green-200 to-green-300 dark:from-green-900/40 dark:via-green-800/40 dark:to-green-700/40 rounded-xl flex items-center justify-center shadow-inner border border-green-200/50 dark:border-green-700/50 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Network className="w-7 h-7 text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors duration-300 relative z-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Integration Services
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Seamlessly integrate AI capabilities into your existing systems.
                  Connect AI models with your databases, APIs, and business processes.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-600 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 dark:from-orange-900/40 dark:via-orange-800/40 dark:to-orange-700/40 rounded-xl flex items-center justify-center shadow-inner border border-orange-200/50 dark:border-orange-700/50 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Hyperdrive className="w-7 h-7 text-orange-600 dark:text-orange-400 group-hover:text-orange-700 dark:group-hover:text-orange-300 transition-colors duration-300 relative z-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Production Deployment
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  End-to-end deployment of AI applications with monitoring, scaling,
                  and maintenance. From development to production-ready systems.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-100 via-red-200 to-red-300 dark:from-red-900/40 dark:via-red-800/40 dark:to-red-700/40 rounded-xl flex items-center justify-center shadow-inner border border-red-200/50 dark:border-red-700/50 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Pulse className="w-7 h-7 text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors duration-300 relative z-10" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Performance Optimization
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Optimize AI models for speed, accuracy, and cost-efficiency.
                  Continuous monitoring and improvement of AI system performance.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-300 dark:from-indigo-900/40 dark:via-indigo-800/40 dark:to-indigo-700/40 rounded-xl flex items-center justify-center shadow-inner border border-indigo-200/50 dark:border-indigo-700/50 group-hover:scale-110 transition-transform duration-300">
                  <ForceField className="w-7 h-7 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Security & Ethics
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Responsible AI development with built-in security, privacy protection,
                  and ethical AI practices. Ensure your AI systems are safe and trustworthy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Agentic AI applications
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                for every industry
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From healthcare to finance, discover how intelligent AI applications are transforming businesses across all sectors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Use Case 1 */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-2xl border border-purple-200 dark:border-purple-800">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Android className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Conversational AI & Chatbots
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      Build intelligent conversational agents that understand context, learn from interactions,
                      and provide personalized customer experiences across multiple channels.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                        Natural Language Processing
                      </span>
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                        Multi-channel Support
                      </span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm rounded-full">
                        Context Awareness
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Neural className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                      Autonomous AI Systems
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                      Develop agentic AI systems that can operate independently, make decisions,
                      and adapt to changing conditions without constant human supervision.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                        Decision Making
                      </span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm rounded-full">
                        Self-Learning
                      </span>
                      <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                        Adaptive Behavior
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual AI Development Process */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                AI Development Process
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-700 rounded-lg border-l-4 border-purple-500">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Requirements Analysis</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Define AI capabilities and business objectives</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-700 rounded-lg border-l-4 border-blue-500">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Model Development</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Build and train custom AI models</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-700 rounded-lg border-l-4 border-green-500">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Integration & Testing</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Deploy and optimize AI application performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Futuristic n8n.io style */}
      <section className="relative py-24 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 bg-white/5 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-10 right-1/3 w-20 h-20 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/20">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Ready to Innovate?
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Build your
            <span className="block text-cyan-200">agentic AI application</span>
          </h2>
          <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
            Join forward-thinking companies already leveraging intelligent AI applications to transform their business operations and customer experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="group relative px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-white/80 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
            >
              View Features
            </button>
          </div>
          <div className="text-purple-200">
            <p className="text-sm opacity-90 flex items-center justify-center space-x-6">
              <span className="flex items-center space-x-1">
                <Magic className="w-4 h-4" />
                <span>Free consultation</span>
              </span>
              <span className="flex items-center space-x-1">
                <Hyperdrive className="w-4 h-4" />
                <span>No setup fees</span>
              </span>
              <span className="flex items-center space-x-1">
                <ForceField className="w-4 h-4" />
                <span>30-day money-back guarantee</span>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Your AI
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Development Partner
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From traditional software to cutting-edge AI, I've been building intelligent solutions that transform businesses.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* About Content */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Atom className="w-6 h-6 mr-3 text-purple-600" />
                  AI-First Development Philosophy
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  I believe AI isn't just a feature—it's the foundation of modern software. Every project I build starts with the question:
                  "How can AI make this better?" From intelligent chatbots to autonomous workflows, I design systems that learn, adapt, and scale.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-sm rounded-full">
                    Machine Learning
                  </span>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full">
                    Natural Language Processing
                  </span>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm rounded-full">
                    Computer Vision
                  </span>
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 text-sm rounded-full">
                    Agentic Systems
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Rocket className="w-6 h-6 mr-3 text-blue-600" />
                  From Idea to Intelligence
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  My journey spans from building traditional web applications to pioneering AI-integrated solutions.
                  I've helped startups launch AI-powered products and enterprises modernize their operations with intelligent automation.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">10+ years in software development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">50+ AI projects delivered</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Specialized in agentic AI systems</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">Full-stack AI development</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Skills & Expertise */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  Technical Expertise
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 border border-green-200/30 dark:border-green-800/30 hover:border-green-300/60 dark:hover:border-green-700/60 hover:scale-105">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Algorithm className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">Python</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AI/ML Framework</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 border border-blue-200/30 dark:border-blue-800/30 hover:border-blue-300/60 dark:hover:border-blue-700/60 hover:scale-105">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <HologramScreen className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">React/Next.js</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Frontend Excellence</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 border border-purple-200/30 dark:border-purple-800/30 hover:border-purple-300/60 dark:hover:border-purple-700/60 hover:scale-105">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-50 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <DataStore className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">Vector DB</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AI Memory Systems</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 border border-cyan-200/30 dark:border-cyan-800/30 hover:border-cyan-300/60 dark:hover:border-cyan-700/60 hover:scale-105">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Nebula className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">Cloud AI</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Scalable Deployments</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 border border-green-200/30 dark:border-green-800/30 hover:border-green-300/60 dark:hover:border-green-700/60 hover:scale-105">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Config className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">MLOps</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Model Lifecycle</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 border border-red-200/30 dark:border-red-800/30 hover:border-red-300/60 dark:hover:border-red-700/60 hover:scale-105">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Encryption className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white">Security</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AI Safety & Privacy</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Why Choose Agentic AI-Built?
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>Future-proof AI architectures that evolve with your business</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Rapid prototyping and deployment with modern AI frameworks</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Enterprise-grade security and ethical AI practices</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Collaborative approach from concept to production</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Build Something Extraordinary?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Let's discuss how agentic AI can transform your business operations and create intelligent solutions that drive real results.
              </p>
              <button
                onClick={() => setIsContactFormOpen(true)}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Start Your AI Journey
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials onOpenContact={() => setIsContactFormOpen(true)} />

      {/* AI Agent Component */}
      <AIAgent />

      {/* Agent Description Modal */}
      <AgentDescription 
        isOpen={isDescriptionOpen}
        onClose={() => setIsDescriptionOpen(false)}
      />

      {/* Email Activation Modal */}
      <EmailActivationModal 
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onConfirm={(email) => initiatePayment(email)}
        isPending={isPending}
      />

      {/* Contact Form Modal */}
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
