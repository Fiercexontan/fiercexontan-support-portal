'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaWallet, FaTicketAlt, FaChartLine, FaShieldAlt, FaClock, FaUsers } from 'react-icons/fa';
import GithubActivity from '@/components/GithubActivity';

export default function HomePage() {
  const features = [
    {
      icon: FaWallet,
      title: 'Multi-Chain Support',
      description: 'Connect and manage issues across Ethereum, Polygon, BSC, Arbitrum, and more.'
    },
    {
      icon: FaTicketAlt,
      title: 'Ticket Management',
      description: 'Submit, track, and resolve support tickets with our comprehensive system.'
    },
    {
      icon: FaShieldAlt,
      title: 'Secure & Private',
      description: 'Your wallet data and issues are encrypted and handled with maximum security.'
    },
    {
      icon: FaClock,
      title: '24/7 Availability',
      description: 'Submit tickets anytime and track their progress in real-time.'
    },
    {
      icon: FaChartLine,
      title: 'Real-Time Updates',
      description: 'Get instant notifications and live updates on your support tickets.'
    },
    {
      icon: FaUsers,
      title: 'Expert Team',
      description: 'Our blockchain specialists are ready to help with any crypto-related issues.'
    }
  ];

  const stats = [
    { label: 'Tickets Resolved', value: '2,500+' },
    { label: 'Happy Users', value: '1,200+' },
    { label: 'Supported Chains', value: '10+' },
    { label: 'Avg Response Time', value: '<2hrs' }
  ];

  return (
    <div className="page-transition">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Multi-Chain</span>
              <br />
              <span className="text-white">Blockchain Support</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto">
              Professional support for all your crypto needs. From wallet issues to transaction problems,
              we're here to help 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/submit-ticket">
                <button className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                  Submit a Ticket
                </button>
              </Link>
              <Link href="/track-ticket">
                <button className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                  Track Ticket
                </button>
              </Link>
            </div>

            {/* Live Status Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-8 inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/30"
            >
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-medium">Support Team Online</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We provide comprehensive blockchain support with cutting-edge tools and expert assistance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-accent flex items-center justify-center mb-6">
                  <feature.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GitHub Activity Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GithubActivity />
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 text-center relative overflow-hidden"
          >
            {/* Decorative gradient */}
            <div className="absolute inset-0 bg-gradient-accent opacity-5"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Help with Your Blockchain Issue?
              </h2>
              <p className="text-xl text-white/70 mb-8">
                Connect your wallet and submit a ticket. Our expert team will assist you promptly.
              </p>
              <Link href="/submit-ticket">
                <button className="btn-primary text-lg px-10 py-4">
                  Get Started Now
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}