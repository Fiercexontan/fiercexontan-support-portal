'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{
      background: 'rgba(30, 30, 30, 0.7)',
      backdropFilter: 'saturate(180%) blur(20px)',
      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo - LEFT */}
          <Link href="/" className="flex items-center space-x-3 z-10">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, #0066FF 0%, #00D9B5 100%)'
            }}>
              <span className="text-2xl font-bold text-white">F</span>
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold" style={{
                background: 'linear-gradient(135deg, #0066FF 0%, #00D9B5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Fiercexontan</div>
              <div className="text-xs" style={{ color: '#00D9B5' }}>Support Portal</div>
            </div>
          </Link>

          {/* Desktop Menu - CENTER */}
          <div className="hidden md:flex items-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="text-white hover:text-cyan-400 transition-colors font-medium text-lg">
              Home
            </Link>
            <Link href="/submit-ticket" className="text-white hover:text-cyan-400 transition-colors font-medium text-lg">
              Submit Ticket
            </Link>
            <Link href="/track-ticket" className="text-white hover:text-cyan-400 transition-colors font-medium text-lg">
              Track Ticket
            </Link>
          </div>

          {/* Wallet Button - RIGHT */}
          <div className="hidden md:block">
            <w3m-button />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 py-4 space-y-4" style={{
          background: 'rgba(20, 20, 20, 0.9)',
          backdropFilter: 'blur(20px)'
        }}>
          <Link href="/" className="block text-white text-lg py-2">Home</Link>
          <Link href="/submit-ticket" className="block text-white text-lg py-2">Submit Ticket</Link>
          <Link href="/track-ticket" className="block text-white text-lg py-2">Track Ticket</Link>
          <div className="pt-4">
            <w3m-button />
          </div>
        </div>
      )}
    </nav>
  );
}