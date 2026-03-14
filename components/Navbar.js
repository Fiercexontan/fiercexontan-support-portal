'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaGithub } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - GitHub Style */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <FaGithub className="text-2xl text-black" />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-semibold text-white">Blockchain Support</div>
            </div>
          </Link>

          {/* Desktop Menu - CENTER */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors font-medium">
              Home
            </Link>
            <Link href="/submit-ticket" className="text-gray-300 hover:text-white transition-colors font-medium">
              Submit Ticket
            </Link>
            <Link href="/track-ticket" className="text-gray-300 hover:text-white transition-colors font-medium">
              Track Ticket
            </Link>
          </div>

          {/* Connect Wallet - RIGHT */}
          <div className="hidden md:flex items-center">
            <w3m-button />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10">
          <div className="px-6 py-4 space-y-3">
            <Link href="/" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white py-2">
              Home
            </Link>
            <Link href="/submit-ticket" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white py-2">
              Submit Ticket
            </Link>
            <Link href="/track-ticket" onClick={() => setIsOpen(false)} className="block text-gray-300 hover:text-white py-2">
              Track Ticket
            </Link>
            <div className="pt-3 border-t border-white/10">
              <w3m-button />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}