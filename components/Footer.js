'use client';

import Link from 'next/link';
import { FaGithub, FaTwitter, FaDiscord, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Brand */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
            <span className="text-2xl font-bold text-white">F</span>
          </div>
          <div>
            <div className="text-xl font-bold gradient-text">Fiercexontan</div>
            <div className="text-xs text-accent-cyan">Support Portal</div>
          </div>
        </div>

        <p className="text-white/60 text-sm mb-8 max-w-2xl">
          Professional blockchain support for all your crypto needs. Multi-chain wallet assistance, transaction support, and expert guidance available 24/7.
        </p>

        {/* Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
          <div>
            <h3 className="text-white font-bold mb-3 text-sm">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-white/60 hover:text-accent-cyan text-xs">Help Center</Link></li>
              <li><Link href="/submit-ticket" className="text-white/60 hover:text-accent-cyan text-xs">Submit Ticket</Link></li>
              <li><Link href="/track-ticket" className="text-white/60 hover:text-accent-cyan text-xs">Track Ticket</Link></li>
              <li><Link href="/faq" className="text-white/60 hover:text-accent-cyan text-xs">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-3 text-sm">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-white/60 hover:text-accent-cyan text-xs">About Us</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-accent-cyan text-xs">Contact</Link></li>
              <li><Link href="/blog" className="text-white/60 hover:text-accent-cyan text-xs">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-3 text-sm">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-white/60 hover:text-accent-cyan text-xs">Privacy</Link></li>
              <li><Link href="/terms" className="text-white/60 hover:text-accent-cyan text-xs">Terms</Link></li>
              <li><Link href="/cookies" className="text-white/60 hover:text-accent-cyan text-xs">Cookies</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-3 text-sm">Social</h3>
            <div className="flex gap-2">
              <a href="https://github.com/Fiercexontan-Ops" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent-cyan flex items-center justify-center">
                <FaGithub className="text-white text-sm" />
              </a>
              <a href="https://twitter.com/fiercexontan" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent-cyan flex items-center justify-center">
                <FaTwitter className="text-white text-sm" />
              </a>
              <a href="https://discord.gg/fiercexontan" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent-cyan flex items-center justify-center">
                <FaDiscord className="text-white text-sm" />
              </a>
              <a href="https://t.me/fiercexontan" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-accent-cyan flex items-center justify-center">
                <FaTelegram className="text-white text-sm" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs">© {currentYear} Fiercexontan-Ops. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}