'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSearch, FaClock, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { formatDate } from '@/lib/constants';

function TrackTicketContent() {
  const searchParams = useSearchParams();
  const [ticketNumber, setTicketNumber] = useState(searchParams.get('ticket') || '');
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchParams.get('ticket')) {
      handleSearch();
    }
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    
    if (!ticketNumber.trim()) {
      setError('Please enter a ticket number');
      return;
    }

    setLoading(true);
    setError('');
    setTicket(null);

    try {
      const response = await fetch(`/api/tickets?ticketNumber=${ticketNumber}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Ticket not found. Please check the ticket number and try again.');
        }
        throw new Error('Failed to fetch ticket details');
      }

      const data = await response.json();
      setTicket(data);
    } catch (err) {
      console.error('Error fetching ticket:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 border-yellow-400';
      case 'in_progress': return 'text-blue-400 border-blue-400';
      case 'resolved': return 'text-green-400 border-green-400';
      case 'closed': return 'text-gray-400 border-gray-400';
      default: return 'text-white/60 border-white/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <FaClock />;
      case 'in_progress': return <FaSpinner className="animate-spin" />;
      case 'resolved': return <FaCheckCircle />;
      case 'closed': return <FaCheckCircle />;
      default: return <FaClock />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-400';
      case 'normal': return 'bg-green-500/20 text-green-400 border-green-400';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-400';
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-400';
      default: return 'bg-white/10 text-white/60 border-white/30';
    }
  };

  return (
    <div className="page-transition min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Track Your <span className="gradient-text">Ticket</span>
          </h1>
          <p className="text-xl text-white/70">
            Enter your ticket number to track its status
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              placeholder="Enter ticket number (e.g., TKT-001)"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaSearch /> {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </motion.form>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400"
          >
            {error}
          </motion.div>
        )}

        {/* Ticket Details */}
        {ticket && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-lg p-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{ticket.ticketNumber}</h2>
                <p className="text-white/60">{ticket.subject}</p>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 border rounded-full ${getStatusColor(ticket.status)}`}>
                {getStatusIcon(ticket.status)}
                <span className="capitalize">{ticket.status.replace('_', ' ')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-white/60 text-sm font-semibold mb-2">PRIORITY</h3>
                <span className={`inline-block px-3 py-1 rounded-full border text-sm ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                </span>
              </div>
              <div>
                <h3 className="text-white/60 text-sm font-semibold mb-2">CREATED</h3>
                <p className="text-white">{formatDate(ticket.createdAt)}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white/60 text-sm font-semibold mb-2">DESCRIPTION</h3>
              <p className="text-white/80">{ticket.description}</p>
            </div>

            {ticket.updates && ticket.updates.length > 0 && (
              <div>
                <h3 className="text-white/60 text-sm font-semibold mb-4">UPDATES</h3>
                <div className="space-y-4">
                  {ticket.updates.map((update, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <p className="text-white/60 text-sm mb-2">{formatDate(update.date)}</p>
                      <p className="text-white">{update.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </motion.div>
          )}
        </div>
      </div>
    );
  }
  
  export default function TrackTicketPage() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <TrackTicketContent />
      </Suspense>
    );
  }