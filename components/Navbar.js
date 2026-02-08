'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import { formatAddress } from '@/lib/constants';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected } = useWeb3ModalAccount();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Submit Ticket', path: '/submit-ticket' },
    { name: 'Track Ticket', path: '/track-ticket' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl font-bold text-white">F</span>
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-bold gradient-text">Fiercexontan</div>
              <div className="text-xs text-accent-cyan">Support Portal</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-white/80 hover:text-accent-cyan transition-colors duration-300 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Wallet Connect Button */}
          <div className="hidden md:flex items-center space-x-4">
            <w3m-button />
            {isConnected && address && (
              <div className="px-4 py-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30">
                <span className="text-accent-cyan text-sm font-mono">
                  {formatAddress(address)}
                </span>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/10 animate-fadeIn">
          <div className="px-4 pt-4 pb-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="block text-white/80 hover:text-accent-cyan transition-colors duration-300 font-medium py-2"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10">
              <w3m-button />
              {isConnected && address && (
                <div className="mt-3 px-4 py-2 rounded-lg bg-accent-cyan/10 border border-accent-cyan/30">
                  <span className="text-accent-cyan text-sm font-mono">
                    {formatAddress(address)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}