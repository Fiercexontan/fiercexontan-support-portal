'use client';

import { useState } from 'react';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { ISSUE_TYPES, generateTicketNumber } from '@/lib/constants';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function TicketForm() {
  const { address, isConnected } = useWeb3ModalAccount();
  const [formData, setFormData] = useState({
    issueType: '',
    subject: '',
    description: '',
    priority: 'normal'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      setError('Please connect your wallet first');
      return;
    }

    if (!formData.issueType || !formData.subject || !formData.description) {
      setError('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      const newTicketNumber = generateTicketNumber();
      
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketNumber: newTicketNumber,
          walletAddress: address,
          issueType: formData.issueType,
          subject: formData.subject,
          description: formData.description,
          priority: formData.priority,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit ticket');
      }

      const data = await response.json();
      setTicketNumber(newTicketNumber);
      setSubmitted(true);
      
      // Reset form
      setFormData({
        issueType: '',
        subject: '',
        description: '',
        priority: 'normal'
      });
    } catch (err) {
      console.error('Error submitting ticket:', err);
      setError('Failed to submit ticket. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto text-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheckCircle className="text-4xl text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">Ticket Submitted Successfully!</h2>
        <p className="text-white/70 mb-6">
          Your support ticket has been created. Please save your ticket number for tracking.
        </p>
        <div className="bg-accent-cyan/10 border-2 border-accent-cyan rounded-xl p-6 mb-8">
          <p className="text-white/60 text-sm mb-2">Your Ticket Number:</p>
          <p className="text-3xl font-bold text-accent-cyan font-mono">{ticketNumber}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => {
              setSubmitted(false);
              setTicketNumber('');
            }}
            className="btn-secondary"
          >
            Submit Another Ticket
          </button>
          <a href={`/track-ticket?ticket=${ticketNumber}`}>
            <button className="btn-primary w-full sm:w-auto">
              Track This Ticket
            </button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-6">Submit a Support Ticket</h2>
      
      {!isConnected ? (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6 mb-6 flex items-start space-x-3">
          <FaExclamationTriangle className="text-yellow-500 text-xl flex-shrink-0 mt-1" />
          <div>
            <p className="text-yellow-500 font-semibold mb-2">Wallet Not Connected</p>
            <p className="text-white/70 text-sm">
              Please connect your wallet using the button in the navigation bar to submit a ticket.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-accent-cyan/10 border border-accent-cyan/30 rounded-xl p-4 mb-6">
          <p className="text-white/60 text-sm mb-1">Connected Wallet:</p>
          <p className="text-accent-cyan font-mono text-sm break-all">{address}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Issue Type */}
        <div>
          <label className="block text-white font-medium mb-2">
            Issue Type <span className="text-red-400">*</span>
          </label>
          <select
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            className="input-field"
            required
            disabled={!isConnected}
          >
            <option value="">Select an issue type</option>
            {ISSUE_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="block text-white font-medium mb-2">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="input-field"
            disabled={!isConnected}
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-white font-medium mb-2">
            Subject <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Brief description of your issue"
            className="input-field"
            required
            disabled={!isConnected}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-white font-medium mb-2">
            Description <span className="text-red-400">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Please provide detailed information about your issue..."
            className="input-field min-h-[150px] resize-y"
            required
            disabled={!isConnected}
          />
          <p className="text-white/40 text-sm mt-2">
            Include transaction hashes, error messages, or any relevant details
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isConnected || submitting}
          className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="flex items-center justify-center">
              <div className="spinner mr-3"></div>
              Submitting...
            </span>
          ) : (
            'Submit Ticket'
          )}
        </button>
      </form>
    </div>
  );
}