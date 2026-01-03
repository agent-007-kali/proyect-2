'use client';

import { useEffect, useState } from 'react';

const Terminal = () => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  
  const terminalLines = [
    { content: 'user@site:~$ ai-agent --task "Create stunning landing page for a tech agency specializing in AI solutions"', delay: 100 },
    { content: '[Agent] Analyzing requirements...', delay: 2000 },
    { content: '[Agent] Step 1: Design modern hero with terminal demo', delay: 3000 },
    { content: '[Agent] Step 2: Implement responsive layout with Next.js', delay: 3500 },
    { content: '[Agent] Step 3: Add agentic animation for wow factor', delay: 4000 },
    { content: '[Agent] Step 4: Optimize performance and SEO', delay: 4500 },
    { content: '[Agent] Generating code...', delay: 6000 },
    { 
      content: [
        `<span class="text-blue-400">import</span> { Terminal } <span class="text-blue-400">from</span> <span class="text-green-400">'@/components/Terminal'</span>;`,
        `<span class="text-blue-400">import</span> { AgenticAI } <span class="text-blue-400">from</span> <span class="text-green-400">'@/lib/ai'</span>;`,
        ``,
        `<span class="text-purple-400">export default function</span> <span class="text-yellow-400">HomePage</span>() {`,
        `  <span class="text-purple-400">return</span> (`,
        `    &lt;<span class="text-red-400">section</span> className="<span class="text-green-400">hero</span>"&gt;`,
        `      &lt;<span class="text-red-400">Terminal</span> animation="<span class="text-green-400">agentic-demo</span>" /&gt;`,
        `    &lt;/<span class="text-red-400">section</span>&gt;`,
        `  );`,
        `}`
      ].join('\n'),
      delay: 7000 
    },
    { content: '[Progress] Building... ████ 45%', delay: 10000 },
    { content: '[Progress] Building... ████████ 78%', delay: 11000 },
    { content: '[Progress] Building... ██████████████████ 100%', delay: 12000 },
    { content: '[Success] Deployment complete!', delay: 14000 },
    { content: 'Website live: https://youragency.com', delay: 14500 },
    { content: 'Impressive results achieved with autonomous agents.', delay: 15000 },
    { content: 'Ready to empower your business with AI? Let\'s talk.', delay: 17000 },
  ];

  useEffect(() => {
    // Add terminal lines sequentially
    const addLine = (index: number) => {
      if (index >= terminalLines.length) {
        // Stop blinking cursor after last line
        setTimeout(() => setShowCursor(false), 2000);
        return;
      }

      const line = terminalLines[index];
      const typingSpeed = Array.isArray(line.content) ? 15 : 50;
      
      // Add line character by character
      let charIndex = 0;
      const currentContent: string[] = [];
      
      const typeChar = () => {
        if (charIndex < line.content.length) {
          currentContent.push(line.content.charAt(charIndex));
          setVisibleLines(prev => [
            ...prev.slice(0, -1),
            currentContent.join('') + (showCursor ? '<span class="cursor"></span>' : '')
          ]);
          charIndex++;
          setTimeout(typeChar, typingSpeed);
        } else {
          // Move to next line after delay
          setVisibleLines(prev => [...prev, '']);
          setTimeout(() => addLine(index + 1), line.delay);
        }
      };

      setVisibleLines(prev => [...prev.slice(0, -1), currentContent.join('') + (showCursor ? '<span class="cursor"></span>' : '')]);
      typeChar();
    };

    // Initialize with first line
    setVisibleLines(['']);
    addLine(0);

    // Blinking cursor animation
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="w-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-950 border border-slate-700 shadow-2xl transition-all duration-300 hover:shadow-cyan-500/20 max-w-4xl mx-auto">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-slate-950 border-b border-slate-800">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center text-slate-400 text-sm font-mono">
          agentic-ai-terminal
        </div>
      </div>
      
      {/* Terminal Content */}
      <div className="font-mono text-sm md:text-base p-4 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 h-64 md:h-72 overflow-y-auto">
        <div className="text-green-400 animate-pulse text-center mb-2">
          ███ █▄▄ █ █▀█ █▀█ █▄░█ █▀█ ▀█▀ █ █▀▀ █▀▀ █▄█
        </div>
        
        {visibleLines.map((line, index) => (
          <div 
            key={index}
            className={`text-slate-300 whitespace-pre-wrap ${index === visibleLines.length - 1 ? 'last-line' : ''}`}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
        
        {/* Scanline overlay effect */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[length:10px_10px] animate-scanline" />
      </div>
    </div>
  );
};

export default Terminal;
