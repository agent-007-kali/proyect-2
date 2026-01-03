'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface TestimonialData {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  project: string;
  results: string[];
  avatar?: string;
}

const testimonials: TestimonialData[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechFlow Solutions',
    content: 'Alex transformed our customer support with an intelligent chatbot that handles 80% of inquiries automatically. The AI solution paid for itself within 3 months through reduced support costs and improved customer satisfaction.',
    rating: 5,
    project: 'AI Customer Support Chatbot',
    results: [
      '80% reduction in support tickets',
      '24/7 customer assistance',
      '95% customer satisfaction rate',
      '$50K annual cost savings'
    ]
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CTO',
    company: 'DataDriven Inc',
    content: 'The analytics dashboard Alex built gives us real-time insights we never had before. His AI-powered predictions have helped us optimize inventory and reduce waste by 35%. Exceptional technical skills and business understanding.',
    rating: 5,
    project: 'AI Analytics Dashboard',
    results: [
      '35% reduction in inventory waste',
      'Real-time predictive analytics',
      'Mobile-responsive dashboard',
      'Integration with existing ERP'
    ]
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'EcomBoost',
    content: 'Our personalized recommendation engine increased conversion rates by 45% and average order value by 28%. Alex\'s attention to detail and innovative approach to AI implementation exceeded our expectations.',
    rating: 5,
    project: 'AI Recommendation Engine',
    results: [
      '45% increase in conversion rates',
      '28% higher average order value',
      'Personalized product suggestions',
      'A/B testing framework included'
    ]
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Operations Manager',
    company: 'LogiTech Solutions',
    content: 'The workflow automation Alex implemented eliminated 15 hours of manual work per week across our team. The AI system learns and improves continuously, making our operations more efficient every month.',
    rating: 5,
    project: 'Workflow Automation System',
    results: [
      '15 hours saved per week',
      '99.5% automation accuracy',
      'Self-learning AI algorithms',
      'Comprehensive reporting dashboard'
    ]
  }
];

const TestimonialCard: React.FC<{ testimonial: TestimonialData; index: number }> = ({
  testimonial,
  index
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 p-8 relative overflow-hidden group"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative">
        {/* Quote icon */}
        <div className="flex justify-between items-start mb-6">
          <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400 opacity-20" />
          <div className="flex space-x-1">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>

        {/* Testimonial content */}
        <blockquote className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6 text-lg">
          &ldquo;{testimonial.content}&rdquo;
        </blockquote>

        {/* Results highlights */}
        <div className="mb-6">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Key Results:</h4>
          <ul className="space-y-2">
            {testimonial.results.map((result, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: (index * 0.1) + (idx * 0.1) + 0.3 }}
                className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{result}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Project info */}
        <div className="mb-6 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            Project: {testimonial.project}
          </div>
        </div>

        {/* Author info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-slate-900 dark:text-white">
              {testimonial.name}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {testimonial.role} at {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="testimonials-section" className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Client Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            See how AI-powered solutions have transformed businesses across industries.
            Real results from real clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Join Our Success Stories?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Let&apos;s discuss how AI can transform your business. Get a free consultation and see your own success story.
            </p>
            <button
              onClick={onOpenContact}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Your AI Journey
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
