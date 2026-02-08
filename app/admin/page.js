'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { formatDate } from '@/lib/constants';

export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [updateForm, setUpdateForm] = useState({
    status: '',
    adminNotes: '',
    resolution: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple password check - in production, use proper authentication
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin123') {
      setAuthenticated(true);
      fetchTickets();
    } else {
      alert('Invalid password');
    }
  };

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const url = filter === 'all' 
        ? '/api/tickets' 
        : `/api/tickets?status=${filter}`;
      
      const response = await fetch(url);
      const data = await response.json();
      setTickets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchTickets();
    }
  }, [authenticated, filter]);

  const handleUpdateTicket = async (e) => {
    e.preventDefault();
    if (!selectedTicket) return;

    try {
      const response = await fetch('/api/tickets', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketNumber: selectedTicket.ticket_number,
          status: updateForm.status || selectedTicket.status,
          adminNotes: updateForm.adminNotes || selectedTicket.admin_notes,
          resolution: updateForm.resolution || selectedTicket.resolution,
        }),
      });

      if (response.ok) {
        alert('Ticket updated successfully');
        setSelectedTicket(null);
        setUpdateForm({ status: '', adminNotes: '', resolution: '' });
        fetchTickets();
      }
    } catch (error) {
      console.error('Error updating ticket:', error);
      alert('Failed to update ticket');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      case 'in_progress': return 'bg-blue-500/20 text-blue-400';
      case 'resolved': return 'bg-green-500/20 text-green-400';
      case 'closed': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-white/10 text-white/60';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'normal': return 'text-green-400';
      case 'low': return 'text-blue-400';
      default: return 'text-white/60';
    }
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.wallet_address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: tickets.length,
    pending: tickets.filter(t => t.status === 'pending').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-8 max-w-md w-full"
        >
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Admin Dashboard
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/60">Manage support tickets and user requests</p>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-xl p-6">
            <div className="text-3xl font-bold gradient-text mb-1">{stats.total}</div>
            <div className="text-white/60 text-sm">Total Tickets</div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <div className="text-3xl font-bold text-yellow-400 mb-1">{stats.pending}</div>
            <div className="text-white/60 text-sm">Pending</div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400 mb-1">{stats.in_progress}</div>
            <div className="text-white/60 text-sm">In Progress</div>
          </div>
          <div className="glass-card rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-1">{stats.resolved}</div>
            <div className="text-white/60 text-sm">Resolved</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tickets..."
                  className="input-field pl-12 w-full"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {['all', 'pending', 'in_progress', 'resolved', 'closed'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    filter === status
                      ? 'bg-accent-cyan text-white'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="glass-card rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="spinner"></div>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="text-center py-12 text-white/60">
              No tickets found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-white/80 font-semibold">Ticket #</th>
                    <th className="px-6 py-4 text-left text-white/80 font-semibold">Subject</th>
                    <th className="px-6 py-4 text-left text-white/80 font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-white/80 font-semibold">Priority</th>
                    <th className="px-6 py-4 text-left text-white/80 font-semibold">Created</th>
                    <th className="px-6 py-4 text-left text-white/80 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-accent-cyan font-mono text-sm">
                        {ticket.ticket_number}
                      </td>
                      <td className="px-6 py-4 text-white">{ticket.subject}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-semibold ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/60 text-sm">
                        {formatDate(ticket.created_at)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => {
                            setSelectedTicket(ticket);
                            setUpdateForm({
                              status: ticket.status,
                              adminNotes: ticket.admin_notes || '',
                              resolution: ticket.resolution || ''
                            });
                          }}
                          className="text-accent-cyan hover:text-accent-blue transition-colors font-medium"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Update Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">Update Ticket</h2>
                  <p className="text-white/60 font-mono text-sm">{selectedTicket.ticket_number}</p>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-white/60 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-white/60 text-sm mb-1">Wallet Address</p>
                  <p className="text-accent-cyan font-mono text-sm break-all">{selectedTicket.wallet_address}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Subject</p>
                  <p className="text-white">{selectedTicket.subject}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm mb-1">Description</p>
                  <p className="text-white/80">{selectedTicket.description}</p>
                </div>
              </div>

              <form onSubmit={handleUpdateTicket} className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Status</label>
                  <select
                    value={updateForm.status}
                    onChange={(e) => setUpdateForm({...updateForm, status: e.target.value})}
                    className="input-field"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Admin Notes</label>
                  <textarea
                    value={updateForm.adminNotes}
                    onChange={(e) => setUpdateForm({...updateForm, adminNotes: e.target.value})}
                    className="input-field min-h-25"
                    placeholder="Add notes for the user..."
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Resolution</label>
                  <textarea
                    value={updateForm.resolution}
                    onChange={(e) => setUpdateForm({...updateForm, resolution: e.target.value})}
                    className="input-field min-h-25"
                    placeholder="Describe how the issue was resolved..."
                  />
                </div>

                <div className="flex gap-4">
                  <button type="submit" className="btn-primary flex-1">
                    Update Ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTicket(null)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}