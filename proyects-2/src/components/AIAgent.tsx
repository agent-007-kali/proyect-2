'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'agent';
  timestamp: Date;
}

interface ConversationContext {
  userName?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  company?: string;
  conversationHistory: string[];
}

const KNOWLEDGE_BASE = {
  services: {
    chatbots: "I specialize in building intelligent conversational AI that goes beyond simple Q&A. My chatbots use advanced NLP, context awareness, and machine learning to provide personalized customer experiences. They can handle complex multi-turn conversations, integrate with your CRM, and even close sales autonomously. Each chatbot learns from interactions and becomes more helpful over time.",
    analytics: "My AI-powered analytics platforms don't just display data—they understand it. Using advanced machine learning algorithms, they automatically detect anomalies, predict trends, identify opportunities, and provide actionable insights in real-time. From predictive customer behavior to automated reporting, these systems turn raw data into strategic advantages.",
    recommendations: "I build sophisticated recommendation engines that increase conversion rates by 15-30% through intelligent personalization. These systems analyze user behavior patterns, contextual data, and collaborative filtering to deliver hyper-relevant suggestions. They work across e-commerce, content platforms, and SaaS applications.",
    automation: "Beyond simple task automation, I create intelligent workflow systems that adapt to changing conditions. Using agentic AI principles, these systems can make decisions, handle exceptions, and continuously optimize processes. From customer onboarding to complex business workflows, they eliminate repetitive work while maintaining quality and compliance.",
    custom_ai: "For unique challenges, I develop custom AI solutions from scratch. This includes computer vision systems, natural language understanding platforms, predictive modeling, and autonomous agents. Each solution is tailored to your specific use case and built for scalability and reliability."
  },
  technologies: {
    frontend: "React, Next.js, TypeScript, Tailwind CSS, Framer Motion",
    backend: "Node.js, Python, FastAPI, PostgreSQL, Redis, GraphQL",
    ai: "TensorFlow, PyTorch, OpenAI GPT-4, Anthropic Claude, Hugging Face Transformers, LangChain, Pinecone, Weaviate",
    cloud: "AWS (EC2, Lambda, S3, SageMaker), Vercel, Supabase, Stripe, SendGrid",
    tools: "Docker, Kubernetes, GitHub Actions, Terraform, DataDog, Sentry"
  },
  expertise: {
    ml_engineering: "End-to-end machine learning pipelines, model training, deployment, and monitoring",
    nlp: "Advanced text processing, sentiment analysis, entity recognition, conversational AI",
    computer_vision: "Image recognition, object detection, OCR, video analysis",
    data_engineering: "ETL pipelines, data warehousing, real-time processing, analytics",
    full_stack: "Modern web applications with AI integration, API design, microservices",
    devops: "CI/CD, infrastructure as code, monitoring, security, scalability"
  },
  industries: {
    healthcare: "AI for medical diagnosis, patient monitoring, drug discovery, healthcare automation",
    finance: "Fraud detection, algorithmic trading, risk assessment, personalized financial advice",
    ecommerce: "Recommendation engines, dynamic pricing, inventory optimization, customer insights",
    education: "Personalized learning, automated grading, content generation, student analytics",
    manufacturing: "Predictive maintenance, quality control, supply chain optimization",
    legal: "Document analysis, contract review, legal research, compliance automation"
  },
  pricing: {
    consultation: "Free 30-minute consultation to discuss your project",
    small_projects: "$5,000 - $15,000 for AI features and chatbots",
    medium_projects: "$15,000 - $50,000 for full AI applications",
    large_projects: "$50,000+ for enterprise AI systems",
    maintenance: "$500-$2,000/month for ongoing support and updates"
  },
  process: {
    discovery: "Deep dive into your business needs, technical requirements, and success metrics",
    design: "AI architecture design, technology selection, and solution planning",
    development: "Agile development with weekly demos and continuous integration",
    testing: "Comprehensive testing including unit tests, integration tests, and user acceptance",
    deployment: "Production deployment with monitoring, backup, and rollback capabilities",
    support: "30 days free support, then ongoing maintenance packages"
  },
  faq: {
    timeline: "AI projects typically take 6-16 weeks. Simple integrations (2-4 weeks), complex applications (8-12 weeks), full AI systems (12-16 weeks). I provide detailed timelines during consultation.",
    maintenance: "All projects include 30 days of free support. After that, I offer tiered maintenance packages: Basic ($500/month) - bug fixes and security updates, Standard ($1,000/month) - includes feature updates, Premium ($2,000/month) - 24/7 support and custom development.",
    scalability: "Every solution I build is designed for scale from day one. I use cloud-native architectures, microservices, and auto-scaling to ensure your AI systems can grow with your business needs.",
    security: "Security is built into every layer. I implement end-to-end encryption, secure API design, GDPR compliance, regular security audits, and follow OWASP guidelines. For sensitive data, I can implement on-premises deployments.",
    data_privacy: "I ensure all AI solutions comply with data protection regulations. This includes data minimization, purpose limitation, consent management, and secure data handling practices.",
    integration: "I specialize in seamless integrations. Whether you need to connect with existing CRM, ERP, databases, or third-party APIs, I ensure smooth data flow and minimal disruption.",
    customization: "Every solution is custom-built for your specific needs. I don't use templates or one-size-fits-all approaches. Each AI system is tailored to your business processes and goals.",
    roi: "Most clients see ROI within 3-6 months. AI chatbots typically pay for themselves in 2-4 months, analytics platforms in 3-6 months, and automation systems often see immediate productivity gains."
  }
};

const PERSONALITY_RESPONSES = {
  greetings: [
    "Hello! I'm Alex, a senior AI engineer specializing in agentic systems and intelligent applications. I help businesses build AI that actually thinks and learns. What exciting project are we tackling today? 🚀",
    "Hi there! Thanks for reaching out. I'm Alex, and I've spent the last decade building cutting-edge AI solutions for startups and enterprises. I'm passionate about creating AI that makes a real difference. What's your vision?",
    "Welcome! I'm Alex, an AI architect who designs and builds autonomous systems. From conversational AI to predictive analytics, I create intelligent solutions that scale. Let's discuss how AI can transform your business! 💡"
  ],
  expertise_intro: [
    "As someone who's built AI systems for healthcare, finance, e-commerce, and manufacturing, I understand the unique challenges each industry faces. I don't just code AI—I architect intelligent systems that solve real business problems.",
    "With experience across multiple industries, I bring deep technical knowledge combined with business acumen. I focus on ROI and measurable impact, not just cool technology.",
    "My approach combines cutting-edge AI research with practical engineering. I stay current with the latest developments while ensuring solutions are production-ready and maintainable."
  ],
  project_assessment: [
    "Based on what you've described, this sounds like an excellent candidate for AI automation. The key will be identifying the highest-impact use cases first.",
    "I can see several opportunities where AI could significantly improve your processes. Let me break down the potential approaches and their expected ROI.",
    "This is a perfect scenario for intelligent automation. Let me outline a phased approach that delivers quick wins while building toward full AI transformation."
  ],
  technical_depth: [
    "From an architectural standpoint, we'll need to consider data pipelines, model training infrastructure, and real-time inference capabilities. I typically recommend starting with cloud-native solutions that can scale.",
    "The technical stack will depend on your specific requirements, but I generally favor Python for AI/ML workloads, React/Next.js for modern interfaces, and cloud platforms like AWS or Vercel for deployment.",
    "Security and compliance are critical considerations. We'll implement end-to-end encryption, GDPR compliance, and regular security audits as part of the development process."
  ],
  industry_specific: {
    healthcare: "In healthcare, I've built AI systems for diagnostic assistance, patient monitoring, and administrative automation. The key is balancing innovation with regulatory compliance and patient privacy.",
    finance: "Financial services require the highest levels of security and accuracy. I've implemented fraud detection systems, algorithmic trading platforms, and personalized financial advice engines.",
    ecommerce: "E-commerce AI focuses on personalization and operational efficiency. I've built recommendation engines that increase conversion rates by 25-40% and inventory systems that reduce stockouts by 60%.",
    education: "Educational AI can personalize learning experiences and automate administrative tasks. I've created adaptive learning platforms and automated grading systems that scale to thousands of users."
  },
  follow_up_questions: [
    "To give you the most accurate recommendation, could you tell me about your current tech stack and team size?",
    "What's your timeline for implementation, and do you have a specific budget range in mind?",
    "Are there any existing systems or processes you'd like the AI to integrate with?",
    "What are your key success metrics? How will you measure the AI system's impact?",
    "Do you have any concerns about data privacy, security, or regulatory compliance?"
  ],
  closing_statements: [
    "I'm excited about the possibilities here! Based on our conversation, I can provide a detailed technical proposal and project timeline. Would you like to schedule a consultation to discuss next steps?",
    "This sounds like a project with tremendous potential. I'd love to dive deeper into the technical requirements and provide you with a comprehensive solution outline.",
    "Great conversation! I can see several high-impact opportunities where AI can transform your operations. Let's set up a time to discuss the technical approach and project scope."
  ]
};

export default function AIAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<ConversationContext>({ conversationHistory: [] });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Use useRef for generating unique IDs to avoid impure function calls
  const messageIdRef = useRef(0);

  // Helper function to get next message ID
  const getNextMessageId = useCallback(() => {
    messageIdRef.current += 1;
    return messageIdRef.current.toString();
  }, []);

  // Helper function to get random greeting
  const getRandomGreeting = useCallback(() => {
    return PERSONALITY_RESPONSES.greetings[Math.floor(Math.random() * PERSONALITY_RESPONSES.greetings.length)];
  }, []);

  // Helper function to get random contextual response
  const getRandomContextualResponse = useCallback((input: string): string => {
    const responses = [
      `I understand you're interested in ${context.projectType || 'AI development'}. I'd love to learn more about your specific needs. Could you tell me about the problem you're trying to solve or the goals you want to achieve?`,
      `Thanks for sharing that! As an AI specialist, I find that the most successful projects start with a clear understanding of the business objectives. What's the main challenge you're facing that AI could help with?`,
      `That's interesting! I can help you build an AI solution for that. To give you the most accurate advice, could you share a bit more about your current setup, team size, or any existing systems you're using?`,
      `I appreciate you reaching out about this. AI has tremendous potential in your use case. Let me ask - what's your timeline for implementing this solution, and do you have a preferred budget range?`,
      `Great question! I'm excited about the possibilities here. To provide you with the best recommendations, could you tell me about your target users and what success would look like for this project?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  }, [context.projectType]);

  // Use the helper function instead
  const generateContextualResponse = getRandomContextualResponse;

  const addAgentMessage = useCallback((text: string, quickReplies?: string[]) => {
    setIsTyping(true);
    // Variable typing delay based on message length
    const typingDelay = Math.min(1500, Math.max(800, text.length * 20));

    setTimeout(() => {
      const newMessage: Message = {
        id: getNextMessageId(),
        text,
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, newMessage]);
      setIsTyping(false);

      // Update conversation history
      setContext(prev => ({
        ...prev,
        conversationHistory: [...prev.conversationHistory, `Agent: ${text}`]
      }));

      if (quickReplies && quickReplies.length > 0) {
        setTimeout(() => {
          const optionsMessage: Message = {
            id: getNextMessageId(),
            text: quickReplies.join('|'),
            sender: 'agent',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, optionsMessage]);
        }, 500);
      }
    }, typingDelay);
  }, [getNextMessageId]);

  const addQuickReplies = useCallback((replies: string[]) => {
    setTimeout(() => {
      const optionsMessage: Message = {
        id: getNextMessageId(),
        text: replies.join('|'),
        sender: 'agent',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, optionsMessage]);
    }, 500);
  }, [getNextMessageId]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Start with personalized greeting
      setTimeout(() => {
        const greeting = getRandomGreeting();
        addAgentMessage(`${greeting}\n\nI can help you with:\n• AI-powered web applications\n• Machine learning integrations\n• Custom chatbots & assistants\n• Data analytics dashboards\n• Smart automation solutions\n\nWhat interests you most?`);
        addQuickReplies(['AI Chatbots', 'Data Analytics', 'Pricing Info', 'Project Consultation']);
      }, 500);
    }
  }, [isOpen, messages.length, getRandomGreeting, addAgentMessage, addQuickReplies]);


  const handleSendMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: getNextMessageId(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');

    // Update conversation history
    setContext(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, `User: ${text.trim()}`]
    }));

    // Process user input with enhanced NLP - moved to useEffect
    setTimeout(() => handleUserInput(text.trim()), 0);
  }, [getNextMessageId]);

  const extractContextInfo = useCallback((input: string) => {
    const lowerInput = input.toLowerCase();

    // Extract project types
    if (lowerInput.includes('chatbot') || lowerInput.includes('bot')) {
      setContext(prev => ({ ...prev, projectType: 'AI Chatbot' }));
    } else if (lowerInput.includes('analytics') || lowerInput.includes('dashboard')) {
      setContext(prev => ({ ...prev, projectType: 'Analytics Dashboard' }));
    } else if (lowerInput.includes('recommendation') || lowerInput.includes('personalization')) {
      setContext(prev => ({ ...prev, projectType: 'Recommendation Engine' }));
    } else if (lowerInput.includes('automation')) {
      setContext(prev => ({ ...prev, projectType: 'Workflow Automation' }));
    }

    // Extract budget information
    if (lowerInput.includes('$') || lowerInput.includes('budget') || lowerInput.includes('cost')) {
      // Could implement more sophisticated budget extraction
      setContext(prev => ({ ...prev, budget: 'mentioned' }));
    }
  }, []);

  const handleUserInput = useCallback((input: string) => {
    const lowerInput = input.toLowerCase();

    // Extract potential project information
    extractContextInfo(input);

    // Enhanced natural language processing and intent detection
    const intents = analyzeIntent(input);
    const response = generateIntelligentResponse(input, intents);

    if (response) {
      addAgentMessage(response.message);
      if (response.quickReplies) {
        addQuickReplies(response.quickReplies);
      }
      return;
    }

    // Fallback for unrecognized queries
    const contextualResponse = generateContextualResponse(input);
    addAgentMessage(contextualResponse);
    addQuickReplies(['Tell me about your services', 'Project pricing', 'Get consultation', 'View portfolio']);
  }, [extractContextInfo, addAgentMessage, addQuickReplies, generateContextualResponse]);

  // Advanced intent analysis
  const analyzeIntent = useCallback((input: string) => {
    const intents = {
      greeting: /\b(hello|hi|hey|greetings|good morning|good afternoon)\b/i,
      services: /\b(chatbot|bot|analytics|dashboard|automation|workflow|recommendation|ai|artificial intelligence|machine learning)\b/i,
      pricing: /\b(price|cost|pricing|budget|fee|quote|estimate|how much)\b/i,
      timeline: /\b(timeline|duration|how long|when|deadline|schedule)\b/i,
      portfolio: /\b(portfolio|examples|case studies|projects|work|experience)\b/i,
      consultation: /\b(consultation|meeting|call|talk|discuss|schedule)\b/i,
      technical: /\b(tech|technology|stack|framework|language|database|api)\b/i,
      industry: /\b(healthcare|finance|financial|ecommerce|education|legal|manufacturing|retail)\b/i,
      security: /\b(security|privacy|gdpr|compliance|encryption|safe)\b/i,
      scalability: /\b(scale|scalability|growth|performance|users|traffic)\b/i
    };

    const detected: Record<string, boolean> = {};
    for (const [intent, regex] of Object.entries(intents)) {
      if (regex.test(input)) {
        detected[intent] = true;
      }
    }

    return detected;
  }, []);

  // Intelligent response generation
  const generateIntelligentResponse = useCallback((input: string, intents: any) => {
    // Greeting responses
    if (intents.greeting && Object.keys(intents).length === 1) {
      const greeting = getRandomGreeting();
      return {
        message: `${greeting}\n\nI specialize in building intelligent AI applications that solve real business problems. Whether you need conversational AI, predictive analytics, or autonomous workflows, I can help you create AI that delivers measurable results.\n\nWhat type of AI solution are you looking to build?`,
        quickReplies: ['AI Chatbots', 'Data Analytics', 'Workflow Automation', 'Custom AI Solution']
      };
    }

    // Service-specific responses
    if (intents.services) {
      if (input.toLowerCase().includes('chatbot') || input.toLowerCase().includes('bot')) {
        return {
          message: `🤖 **Intelligent Conversational AI**\n\n${KNOWLEDGE_BASE.services.chatbots}\n\n**Key Capabilities:**\n• Multi-turn conversations with context awareness\n• Integration with CRM and helpdesk systems\n• Sentiment analysis and emotional intelligence\n• Automated lead qualification and routing\n• 24/7 availability with human handover\n• Continuous learning from interactions\n\n**Industries:** Customer support, sales, HR, education\n\n**Typical Results:** 60-80% reduction in support tickets, 30% faster response times\n\nWould you like to see pricing options or discuss a specific use case?`,
          quickReplies: ['Chatbot Pricing', 'Use Cases', 'Technical Details', 'Schedule Demo']
        };
      }

      if (input.toLowerCase().includes('analytics') || input.toLowerCase().includes('dashboard')) {
        return {
          message: `📊 **AI-Powered Business Intelligence**\n\n${KNOWLEDGE_BASE.services.analytics}\n\n**Advanced Features:**\n• Predictive analytics with confidence intervals\n• Anomaly detection and alerting\n• Automated report generation and distribution\n• Real-time KPI monitoring and optimization\n• Machine learning-driven insights\n• Custom visualization dashboards\n\n**Data Sources:** Databases, APIs, IoT sensors, user behavior\n\n**Business Impact:** 40-60% faster decision making, 25% cost reduction\n\nWhich type of data would you like to analyze and gain insights from?`,
          quickReplies: ['Analytics Pricing', 'Data Sources', 'ROI Calculator', 'Case Studies']
        };
      }

      if (input.toLowerCase().includes('automation') || input.toLowerCase().includes('workflow')) {
        return {
          message: `⚡ **Intelligent Process Automation**\n\n${KNOWLEDGE_BASE.services.automation}\n\n**Smart Automation Features:**\n• Agentic workflows that make decisions\n• Exception handling and error recovery\n• Integration with 1000+ business tools\n• Real-time monitoring and optimization\n• Human-in-the-loop capabilities\n• Continuous process improvement\n\n**Common Applications:**\n• Customer onboarding and support\n• Financial processing and compliance\n• Supply chain and inventory management\n• Content creation and distribution\n• Quality assurance and testing\n\n**ROI:** Typically 5-10x return within 12 months\n\nWhat business process would you like to optimize?`,
          quickReplies: ['Process Analysis', 'Automation Pricing', 'Integration Options', 'Success Stories']
        };
      }
    }

    // Pricing responses with context awareness
    if (intents.pricing) {
      const projectType = context.projectType;
      let pricingResponse = `💰 **Transparent AI Development Pricing**\n\n${KNOWLEDGE_BASE.pricing.consultation}\n\n`;

      if (projectType === 'AI Chatbot') {
        pricingResponse += `${KNOWLEDGE_BASE.pricing.small_projects}\n\n**Chatbot-Specific Features:**\n• Custom NLP model training\n• Multi-platform deployment\n• Analytics and optimization\n• CRM integration`;
      } else if (projectType === 'Analytics Dashboard') {
        pricingResponse += `${KNOWLEDGE_BASE.pricing.medium_projects}\n\n**Analytics-Specific Features:**\n• Data pipeline development\n• ML model integration\n• Real-time dashboards\n• Automated reporting`;
      } else {
        pricingResponse += `**Project-Based Pricing:**\n${KNOWLEDGE_BASE.pricing.small_projects}\n${KNOWLEDGE_BASE.pricing.medium_projects}\n${KNOWLEDGE_BASE.pricing.large_projects}\n\n**Ongoing Support:**\n${KNOWLEDGE_BASE.pricing.maintenance}`;
      }

      pricingResponse += `\n\n**What's Included:**\n✅ End-to-end development and deployment\n✅ AI/ML model training and optimization\n✅ 30 days free support and maintenance\n✅ Performance monitoring and scaling\n✅ Documentation and knowledge transfer\n✅ Security and compliance implementation\n\n**Development Process:**\n${Object.entries(KNOWLEDGE_BASE.process).map(([key, value]) => `• ${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`).join('\n')}\n\nReady to discuss your specific project requirements?`;

      return {
        message: pricingResponse,
        quickReplies: ['Get Free Quote', 'Project Consultation', 'View Process', 'Payment Terms']
      };
    }

    // Timeline responses
    if (intents.timeline) {
      return {
        message: `⏱️ **Realistic AI Development Timelines**\n\n${KNOWLEDGE_BASE.faq.timeline}\n\n**Timeline Breakdown:**\n• **Discovery & Planning:** 1-2 weeks\n• **Design & Architecture:** 1-3 weeks\n• **Development & Training:** 4-10 weeks\n• **Testing & Optimization:** 2-4 weeks\n• **Deployment & Launch:** 1-2 weeks\n\n**Factors Affecting Timeline:**\n• AI model complexity and training data requirements\n• Integration complexity with existing systems\n• Regulatory compliance and security requirements\n• Team size and availability\n• Scope and feature set\n\n**Agile Approach:** I use iterative development with weekly demos and checkpoints to ensure we're on track.\n\nWhat's your preferred timeline for completion?`,
        quickReplies: ['ASAP (Fast Track)', '3 Months', '6 Months', 'Flexible Timeline']
      };
    }

    // Technical expertise responses
    if (intents.technical) {
      return {
        message: `🛠️ **Full-Stack AI Development Expertise**\n\n**AI/ML Stack:**\n${KNOWLEDGE_BASE.technologies.ai}\n\n**Backend Architecture:**\n${KNOWLEDGE_BASE.technologies.backend}\n\n**Frontend Technologies:**\n${KNOWLEDGE_BASE.technologies.frontend}\n\n**Cloud & DevOps:**\n${KNOWLEDGE_BASE.technologies.cloud}\n\n**Specialized AI Capabilities:**\n• ${Object.values(KNOWLEDGE_BASE.expertise).join('\n• ')}\n\n**Why This Matters:** I don't just build AI features—I architect complete systems that are maintainable, scalable, and future-proof.\n\nWhat specific technical requirements does your project have?`,
        quickReplies: ['View Tech Stack', 'Integration Options', 'Scalability', 'Security Features']
      };
    }

    // Industry-specific responses
    if (intents.industry) {
      let industryResponse = `🏢 **Industry-Specific AI Solutions**\n\n`;

      if (input.toLowerCase().includes('healthcare') || input.toLowerCase().includes('medical')) {
        industryResponse += `${KNOWLEDGE_BASE.industries.healthcare}\n\n**Regulatory Compliance:** HIPAA, GDPR, data privacy\n**Typical Projects:** Diagnostic assistants, patient monitoring, administrative automation`;
      } else if (input.toLowerCase().includes('finance') || input.toLowerCase().includes('financial')) {
        industryResponse += `${KNOWLEDGE_BASE.industries.finance}\n\n**Regulatory Compliance:** SOC 2, PCI DSS, AML/KYC\n**Typical Projects:** Fraud detection, algorithmic trading, personalized advice`;
      } else if (input.toLowerCase().includes('ecommerce')) {
        industryResponse += `${KNOWLEDGE_BASE.industries.ecommerce}\n\n**Key Challenges:** Personalization at scale, inventory optimization\n**Typical Projects:** Recommendation engines, dynamic pricing, customer insights`;
      } else if (input.toLowerCase().includes('education')) {
        industryResponse += `${KNOWLEDGE_BASE.industries.education}\n\n**Key Focus:** Adaptive learning, accessibility\n**Typical Projects:** Personalized learning platforms, automated assessment`;
      }

      industryResponse += `\n\n**Industry Experience:** 50+ AI projects across healthcare, finance, e-commerce, education, manufacturing, and more.\n\nDo you have a specific industry challenge you'd like to address with AI?`;

      return {
        message: industryResponse,
        quickReplies: ['Healthcare AI', 'Finance AI', 'E-commerce AI', 'Other Industries']
      };
    }

    // Security and compliance responses
    if (intents.security) {
      return {
        message: `🔒 **Enterprise-Grade AI Security**\n\n${KNOWLEDGE_BASE.faq.security}\n\n**Security Implementation:**\n• End-to-end encryption for data in transit and at rest\n• Secure API design with authentication and authorization\n• Regular security audits and penetration testing\n• Compliance with GDPR, CCPA, HIPAA, SOC 2\n• Data minimization and purpose limitation\n• Secure deployment in your preferred cloud environment\n\n**Privacy by Design:** All AI systems are built with privacy considerations from day one.\n\n**Deployment Options:** Cloud, on-premises, or hybrid deployments available.\n\nWhat are your specific security or compliance requirements?`,
        quickReplies: ['GDPR Compliance', 'Security Audit', 'Deployment Options', 'Privacy Features']
      };
    }

    // Scalability responses
    if (intents.scalability) {
      return {
        message: `📈 **Built for Scale from Day One**\n\n${KNOWLEDGE_BASE.faq.scalability}\n\n**Scalability Architecture:**\n• Microservices-based design for independent scaling\n• Auto-scaling infrastructure (AWS, Kubernetes)\n• Database optimization and caching strategies\n• CDN integration for global performance\n• Real-time monitoring and alerting\n• Performance optimization and load testing\n\n**Performance Benchmarks:**\n• Handle millions of API requests daily\n• Process real-time data streams\n• Support thousands of concurrent users\n• Maintain sub-second response times\n\n**Growth Planning:** I design systems that can scale 10x-100x without major rewrites.\n\nWhat's your expected user base and performance requirements?`,
        quickReplies: ['Performance Testing', 'Load Balancing', 'Global Scaling', 'Monitoring Setup']
      };
    }

    // Portfolio/experience responses
    if (intents.portfolio) {
      return {
        message: `🚀 **Proven AI Development Track Record**\n\n**50+ Successful AI Projects Delivered**\n\n**Recent Highlights:**\n• **Healthcare AI Assistant:** Reduced patient wait times by 60%, integrated with EHR systems\n• **Financial Risk Assessment:** 85% fraud detection accuracy, processes 1M+ transactions daily\n• **E-commerce Analytics:** $2M additional revenue, 40% conversion rate improvement\n• **Conversational AI Platform:** Handles 10K+ conversations monthly, 95% user satisfaction\n\n**Client Industries:**\n${Object.keys(KNOWLEDGE_BASE.industries).join(', ')}\n\n**Technical Expertise:**\n• ${Object.keys(KNOWLEDGE_BASE.expertise).join('\n• ')}\n\n**Quality Assurance:**\n• Comprehensive testing (unit, integration, E2E)\n• Performance benchmarking\n• Security audits\n• User acceptance testing\n\nWould you like to see detailed case studies or discuss a similar project?`,
        quickReplies: ['View Case Studies', 'Technical Portfolio', 'Client Testimonials', 'Industry Examples']
      };
    }

    // Consultation responses
    if (intents.consultation) {
      return {
        message: `📅 **Free AI Strategy Consultation**\n\nLet's discuss how AI can transform your business. In our consultation, we'll cover:\n\n**Discovery Session (60 minutes):**\n• Understanding your business challenges and goals\n• Identifying high-impact AI opportunities\n• Technical feasibility assessment\n• ROI projections and timeline estimates\n• Recommended approach and next steps\n\n**What You'll Get:**\n• Detailed technical proposal\n• High-level project timeline\n• Investment requirements\n• Success metrics and KPIs\n• Implementation roadmap\n\n**No Commitment:** This is a free consultation to help you make informed decisions about AI investment.\n\n**Next Steps:** Reply with your availability and preferred time zone, and I'll send calendar invites for 2-3 options.\n\nWhen would be a good time for us to connect?`,
        quickReplies: ['Schedule Now', 'Morning (EST)', 'Afternoon (EST)', 'Different Time Zone']
      };
    }

    return null; // No specific intent matched
  }, [context.projectType, getRandomGreeting]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(currentInput);
    }
  };

  const handleOptionClick = (option: string) => {
    handleSendMessage(option);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-cyan-300 animate-pulse"
          aria-label="Open AI Assistant"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[420px] h-[600px] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700 backdrop-blur-xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white p-5 rounded-t-3xl relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 animate-pulse"></div>
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                  <span className="text-2xl">🚀</span>
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Alex - AI Developer</h3>
                <p className="text-sm opacity-90 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Online • Ready to help
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs opacity-75">AI Assistant</div>
                <div className="text-xs font-medium">v2.0</div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[320px] px-4 py-3 rounded-2xl shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
                    : 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-md border border-slate-200 dark:border-slate-600'
                }`}>
                  {message.text.includes('|') ? (
                    // Render quick reply options
                    <div className="space-y-2">
                      {message.text.split('|').map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="block w-full text-left p-3 rounded-xl bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 dark:hover:bg-slate-500 transition-all duration-200 text-sm font-medium border border-slate-200 dark:border-slate-500 hover:border-blue-300 dark:hover:border-blue-400 hover:shadow-md"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-sm leading-relaxed whitespace-pre-line">
                      {message.text}
                    </div>
                  )}
                  {/* Timestamp */}
                  <div className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-700 px-4 py-3 rounded-2xl rounded-bl-md border border-slate-200 dark:border-slate-600 shadow-sm">
                  <div className="flex space-x-2 items-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">Alex is typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
            <div className="flex space-x-3 items-end">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about AI development, pricing, or your project..."
                  className="w-full px-4 py-3 pr-12 border border-slate-300 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white transition-all duration-200"
                  disabled={isTyping}
                />
                {/* Input decoration */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                  💭
                </div>
              </div>
              <button
                onClick={() => handleSendMessage(currentInput)}
                disabled={!currentInput.trim() || isTyping}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white rounded-2xl p-3 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>

            {/* Context info */}
            {context.projectType && (
              <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 flex items-center space-x-2">
                <span className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full">
                  Current focus: {context.projectType}
                </span>
                {context.conversationHistory.length > 2 && (
                  <span className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full">
                    {context.conversationHistory.length} messages
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
