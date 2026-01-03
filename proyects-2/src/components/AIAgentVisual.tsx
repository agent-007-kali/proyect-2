'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Neuron {
  id: number;
  x: number;
  y: number;
  layer: 'input' | 'hidden' | 'output';
  activation: number;
  bias: number;
}

interface Connection {
  from: Neuron;
  to: Neuron;
  weight: number;
  active: boolean;
}

interface DataFlow {
  id: number;
  from: Neuron;
  to: Neuron;
  progress: number;
  color: string;
}

export default function AIAgentVisual() {
  const [isVisible, setIsVisible] = useState(false);
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [dataFlows, setDataFlows] = useState<DataFlow[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);

  const createDataFlows = useCallback(() => {
    const newFlows: DataFlow[] = [];

    // Create flows from active connections
    connections.forEach((conn, index) => {
      if (conn.active && Math.random() > 0.7) {
        newFlows.push({
          id: Date.now() + index,
          from: conn.from,
          to: conn.to,
          progress: 0,
          color: conn.weight > 0 ? '#10b981' : '#ef4444'
        });
      }
    });

    setDataFlows(newFlows);

    // Animate flows
    const animateFlows = () => {
      setDataFlows(prevFlows =>
        prevFlows.map(flow => ({
          ...flow,
          progress: flow.progress + 0.02
        })).filter(flow => flow.progress < 1)
      );

      if (dataFlows.length > 0) {
        requestAnimationFrame(animateFlows);
      }
    };

    animateFlows();
  }, [connections, dataFlows.length]);

  const activateNetwork = useCallback(() => {
    // Reset activations
    setConnections(prev => prev.map(conn => ({ ...conn, active: false })));

    // Activate input layer
    setNeurons(prev => prev.map(neuron =>
      neuron.layer === 'input'
        ? { ...neuron, activation: Math.random() > 0.7 ? 1 : 0.3 }
        : neuron
    ));

    setTimeout(() => {
      // Activate connections from input to hidden 1
      setConnections(prev => prev.map(conn =>
        conn.from.layer === 'input' && conn.from.activation > 0.5
          ? { ...conn, active: true }
          : conn
      ));

      setNeurons(prev => prev.map(neuron =>
        neuron.layer === 'hidden' && neuron.id >= 8 && neuron.id < 20
          ? { ...neuron, activation: Math.random() > 0.3 ? 0.8 : 0.2 }
          : neuron
      ));

      setTimeout(() => {
        // Activate connections from hidden 1 to hidden 2
        setConnections(prev => prev.map(conn =>
          conn.from.layer === 'hidden' && conn.from.id >= 8 && conn.from.id < 20 && conn.from.activation > 0.5
            ? { ...conn, active: true }
            : conn
        ));

        setNeurons(prev => prev.map(neuron =>
          neuron.layer === 'hidden' && neuron.id >= 20 && neuron.id < 30
            ? { ...neuron, activation: Math.random() > 0.4 ? 0.9 : 0.3 }
            : neuron
        ));

        setTimeout(() => {
          // Activate connections from hidden 2 to output
          setConnections(prev => prev.map(conn =>
            conn.from.layer === 'hidden' && conn.from.id >= 20 && conn.from.id < 30 && conn.from.activation > 0.5
              ? { ...conn, active: true }
              : conn
          ));

          setNeurons(prev => prev.map(neuron =>
            neuron.layer === 'output'
              ? { ...neuron, activation: Math.random() > 0.5 ? 1 : 0.4 }
              : neuron
          ));

          // Create data flow animations
          createDataFlows();
        }, 600);
      }, 600);
    }, 400);
  }, [createDataFlows]);

  const startThinking = useCallback(() => {
    setIsThinking(true);

    const thinkCycle = () => {
      activateNetwork();

      // Repeat thinking cycle
      setTimeout(thinkCycle, 3000 + Math.random() * 2000);
    };

    thinkCycle();
  }, [activateNetwork]);

  const initializeNeuralNetwork = useCallback(() => {
    const newNeurons: Neuron[] = [];
    const newConnections: Connection[] = [];

    // Input layer (8 neurons)
    for (let i = 0; i < 8; i++) {
      newNeurons.push({
        id: i,
        x: 80,
        y: 60 + i * 35,
        layer: 'input',
        activation: Math.random(),
        bias: Math.random() - 0.5
      });
    }

    // Hidden layer 1 (12 neurons)
    for (let i = 0; i < 12; i++) {
      newNeurons.push({
        id: i + 8,
        x: 200,
        y: 35 + i * 25,
        layer: 'hidden',
        activation: Math.random(),
        bias: Math.random() - 0.5
      });
    }

    // Hidden layer 2 (10 neurons)
    for (let i = 0; i < 10; i++) {
      newNeurons.push({
        id: i + 20,
        x: 320,
        y: 45 + i * 28,
        layer: 'hidden',
        activation: Math.random(),
        bias: Math.random() - 0.5
      });
    }

    // Output layer (6 neurons)
    for (let i = 0; i < 6; i++) {
      newNeurons.push({
        id: i + 30,
        x: 440,
        y: 70 + i * 40,
        layer: 'output',
        activation: Math.random(),
        bias: Math.random() - 0.5
      });
    }

    // Create connections between layers
    // Input to Hidden 1
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 12; j++) {
        newConnections.push({
          from: newNeurons[i],
          to: newNeurons[j + 8],
          weight: (Math.random() - 0.5) * 2,
          active: false
        });
      }
    }

    // Hidden 1 to Hidden 2
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 10; j++) {
        newConnections.push({
          from: newNeurons[i + 8],
          to: newNeurons[j + 20],
          weight: (Math.random() - 0.5) * 2,
          active: false
        });
      }
    }

    // Hidden 2 to Output
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 6; j++) {
        newConnections.push({
          from: newNeurons[i + 20],
          to: newNeurons[j + 30],
          weight: (Math.random() - 0.5) * 2,
          active: false
        });
      }
    }

    setNeurons(newNeurons);
    setConnections(newConnections);
    startThinking();
  }, [startThinking]);

  useEffect(() => {
    // Show the visual after 3 seconds to surprise visitors
    const timer = setTimeout(() => {
      setIsVisible(true);
      initializeNeuralNetwork();
    }, 3000);

    return () => clearTimeout(timer);
  }, [initializeNeuralNetwork]);

  const handleMouseEnter = () => {
    setIsThinking(true);
  };

  const handleMouseLeave = () => {
    setIsThinking(false);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className="relative w-[550px] h-[400px] bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 rounded-3xl backdrop-blur-md border border-slate-600/50 shadow-2xl overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Neural Network Background */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 550 400"
          >
            <defs>
              <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
              </linearGradient>
              <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.8)" />
                <stop offset="50%" stopColor="rgba(59, 130, 246, 0.8)" />
                <stop offset="100%" stopColor="rgba(147, 51, 234, 0.8)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="neuronGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Background grid */}
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(71, 85, 105, 0.1)" strokeWidth="1"/>
            </pattern>
            <rect width="550" height="400" fill="url(#grid)" />

            {/* Neural Network Connections */}
            {connections.map((conn, index) => {
              const opacity = conn.active ? 0.8 : 0.15;
              const strokeWidth = conn.active ? 2 : 1;
              const stroke = conn.active ? 'url(#activeGradient)' : 'url(#connectionGradient)';

              return (
                <line
                  key={`conn-${index}`}
                  x1={conn.from.x}
                  y1={conn.from.y}
                  x2={conn.to.x}
                  y2={conn.to.y}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  opacity={opacity}
                  className={conn.active ? 'animate-pulse' : ''}
                  filter={conn.active ? 'url(#glow)' : ''}
                />
              );
            })}

            {/* Data Flow Animations */}
            {dataFlows.map((flow) => {
              const x = flow.from.x + (flow.to.x - flow.from.x) * flow.progress;
              const y = flow.from.y + (flow.to.y - flow.from.y) * flow.progress;

              return (
                <circle
                  key={flow.id}
                  cx={x}
                  cy={y}
                  r="3"
                  fill={flow.color}
                  opacity="0.9"
                  filter="url(#glow)"
                />
              );
            })}

            {/* Neurons */}
            {neurons.map((neuron) => {
              const radius = neuron.layer === 'input' ? 8 :
                           neuron.layer === 'hidden' ? 6 : 10;
              const fill = neuron.activation > 0.7 ? '#10b981' :
                          neuron.activation > 0.4 ? '#3b82f6' :
                          neuron.activation > 0.2 ? '#f59e0b' : '#6b7280';

              return (
                <g key={`neuron-${neuron.id}`}>
                  {/* Neuron glow effect */}
                  <circle
                    cx={neuron.x}
                    cy={neuron.y}
                    r={radius + 3}
                    fill={fill}
                    opacity="0.2"
                    filter="url(#neuronGlow)"
                  />
                  {/* Neuron body */}
                  <circle
                    cx={neuron.x}
                    cy={neuron.y}
                    r={radius}
                    fill={fill}
                    stroke={neuron.activation > 0.5 ? '#ffffff' : 'rgba(255,255,255,0.3)'}
                    strokeWidth={neuron.activation > 0.5 ? 2 : 1}
                    className={neuron.activation > 0.7 ? 'animate-pulse' : ''}
                  />
                  {/* Activation indicator */}
                  {neuron.activation > 0.8 && (
                    <circle
                      cx={neuron.x}
                      cy={neuron.y}
                      r={radius - 2}
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="1"
                      opacity="0.8"
                      className="animate-ping"
                    />
                  )}
                </g>
              );
            })}

            {/* Layer Labels */}
            <text x="80" y="25" textAnchor="middle" className="text-xs fill-slate-400 font-medium">
              INPUT LAYER
            </text>
            <text x="200" y="25" textAnchor="middle" className="text-xs fill-slate-400 font-medium">
              HIDDEN LAYER 1
            </text>
            <text x="320" y="25" textAnchor="middle" className="text-xs fill-slate-400 font-medium">
              HIDDEN LAYER 2
            </text>
            <text x="440" y="25" textAnchor="middle" className="text-xs fill-slate-400 font-medium">
              OUTPUT LAYER
            </text>
          </svg>

          {/* Status indicators */}
          <div className="absolute top-4 left-4 flex space-x-2">
            <div className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-sm rounded-full px-3 py-1 border border-slate-600">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-400">NEURAL NET</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-800/80 backdrop-blur-sm rounded-full px-3 py-1 border border-slate-600">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-blue-400">ACTIVE</span>
            </div>
          </div>

          {/* Network Statistics */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-slate-800/80 backdrop-blur-sm rounded-xl p-4 border border-slate-600">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-cyan-400">{neurons.filter(n => n.activation > 0.5).length}</div>
                  <div className="text-xs text-slate-400">Active Neurons</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-400">{connections.filter(c => c.active).length}</div>
                  <div className="text-xs text-slate-400">Active Connections</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-400">{dataFlows.length}</div>
                  <div className="text-xs text-slate-400">Data Flows</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-400">99.2%</div>
                  <div className="text-xs text-slate-400">Accuracy</div>
                </div>
              </div>

              {/* Network activity bar */}
              <div className="mt-3 bg-slate-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, (neurons.filter(n => n.activation > 0.5).length / neurons.length) * 100 + 20)}%`
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 w-8 h-8 bg-slate-800/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors pointer-events-auto border border-slate-600"
          >
            ✕
          </button>

          {/* Neural Network Status */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl px-6 py-4 border border-slate-600">
              <div className="flex items-center justify-center space-x-3 mb-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <span className="text-lg font-bold text-cyan-400">NEURAL NETWORK</span>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div className="text-sm text-slate-300">
                Deep Learning • Pattern Recognition • AI Processing
              </div>
              {isThinking && (
                <div className="flex justify-center space-x-1 mt-2">
                  <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-1 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
