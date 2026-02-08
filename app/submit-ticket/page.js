'use client';

import TicketForm from '@/components/TicketForm';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaBook, FaComments } from 'react-icons/fa';

export default function SubmitTicketPage() {
  const helpResources = [
    {
      icon: FaQuestionCircle,
      title: 'FAQ',
      description: 'Check common questions and answers',
      link: '/faq'
    },
    {
      icon: FaBook,
      title: 'Documentation',
      description: 'Browse our help articles',
      link: '/docs'
    },
    {
      icon: FaComments,
      title: 'Live Chat',
      description: 'Chat with support instantly',
      action: 'chat'
    }
  ];

  return (
    <div className="page-transition min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Submit a <span className="gradient-text">Support Ticket</span>
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Having an issue? Fill out the form below and our team will get back to you as soon as possible.
          </p>
        </motion.div>

        {/* Help Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Need help right away?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {helpResources.map((resource, index) => (
              <div
                key={resource.title}
                className="glass-card rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => {
                  if (resource.action === 'chat') {
                    // Trigger Tawk.to chat
                    if (window.Tawk_API) {
                      window.Tawk_API.maximize();
                    }
                  } else if (resource.link) {
                    window.location.href = resource.link;
                  }
                }}
              >
                <div className="w-14 h-14 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <resource.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{resource.title}</h3>
                <p className="text-white/60 text-sm">{resource.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ticket Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <TicketForm />
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">What happens next?</h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start">
                <span className="text-accent-cyan mr-3 mt-1">1.</span>
                <span>Your ticket is assigned a unique tracking number</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-cyan mr-3 mt-1">2.</span>
                <span>Our team reviews your issue and assigns it to a specialist</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-cyan mr-3 mt-1">3.</span>
                <span>You receive updates via the ticket tracking page</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent-cyan mr-3 mt-1">4.</span>
                <span>The issue is resolved and your ticket is closed</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}