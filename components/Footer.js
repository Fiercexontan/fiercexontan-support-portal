'use client';

import Link from 'next/link';
import { FaGithub, FaTwitter, FaDiscord, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Main Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <FaGithub className="text-lg text-black" />
              </div>
              <span className="text-white font-semibold">Fiercexontan</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Professional blockchain support for all your crypto needs.
            </p>
            <div className="flex gap-3">
              <a href="https://github.com/Fiercexontan-Ops" target="_blank" rel="noopener noreferrer" 
                 className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <FaGithub className="text-gray-400" />
              </a>
              <a href="https://twitter.com/fiercexontan" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <FaTwitter className="text-gray-400" />
              </a>
              <a href="https://discord.gg/fiercexontan" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <FaDiscord className="text-gray-400" />
              </a>
              <a href="https://t.me/fiercexontan" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                <FaTelegram className="text-gray-400" />
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-gray-400 hover:text-white text-sm transition-colors">Help Center</Link></li>
              <li><Link href="/submit-ticket" className="text-gray-400 hover:text-white text-sm transition-colors">Submit Ticket</Link></li>
              <li><Link href="/track-ticket" className="text-gray-400 hover:text-white text-sm transition-colors">Track Ticket</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">© {currentYear} Fiercexontan-Ops. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}