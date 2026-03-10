'use client';

import Link from 'next/link';
import { FaGithub, FaTwitter, FaDiscord, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/Fiercexontan-Ops', label: 'GitHub' },
    { icon: FaTwitter, url: 'https://twitter.com/fiercexontan', label: 'Twitter' },
    { icon: FaDiscord, url: 'https://discord.gg/fiercexontan', label: 'Discord' },
    { icon: FaTelegram, url: 'https://t.me/fiercexontan', label: 'Telegram' },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Brand Section */}
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
          Professional blockchain support for all your crypto needs. Multi-chain wallet assistance,
          transaction support, and expert guidance available 24/7.
        </p>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          
          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/help" className="text-white/60 hover:text-accent-cyan text-sm transition-colors">Help Center</Link></li>
              <li><Link href="/submit-ticket" className="text-white/60 hover:text-accent-cyan text-sm transition-colors">Submit Ticket</Link></li>
              <li><Link href="/track-ticket" className="text-white/60 hover:text-accent-cyan text-sm transition-colors">Track Ticket</Link></li>
              <li><Link href="/faq" className="text-white/60 hover:text-accent-cyan text-sm transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-white/60 hover:text-accent-cyan text-sm transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-accent-cyan text-sm transition-colors">Contact</Link></li>
              <li><Link href="/blog" className="text-white/60 hover:text-accent-cyan text-sm transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-white/60 hover:text-accent-cyan text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-white/60 hover:text-accent-cyan text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/data-policy" className="text-white/60 hover:text-accent-cyan text-sm transition-colors">Data Policy</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Stay Connected</h3>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map((social) => (
                
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-gradient-accent flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="text-white text-base" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm text-center md:text-left">
            © {currentYear} Fiercexontan. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-white/40 hover:text-accent-cyan text-sm transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/40 hover:text-accent-cyan text-sm transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-white/40 hover:text-accent-cyan text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-accent opacity-50"></div>
    </footer>
  );
}