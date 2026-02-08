'use client';

import Link from 'next/link';
import { FaGithub, FaTwitter, FaDiscord, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Support',
      links: [
        { name: 'Help Center', path: '/help' },
        { name: 'Submit Ticket', path: '/submit-ticket' },
        { name: 'Track Ticket', path: '/track-ticket' },
        { name: 'FAQ', path: '/faq' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Blog', path: '/blog' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Data Policy', path: '/data-policy' },
      ],
    },
  ];

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com/Fiercexontan-Ops', label: 'GitHub' },
    { icon: FaTwitter, url: 'https://twitter.com/fiercexontan', label: 'Twitter' },
    { icon: FaDiscord, url: 'https://discord.gg/fiercexontan', label: 'Discord' },
    { icon: FaTelegram, url: 'https://t.me/fiercexontan', label: 'Telegram' },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center">
                <span className="text-2xl font-bold text-white">F</span>
              </div>
              <div>
                <div className="text-xl font-bold gradient-text">Fiercexontan</div>
                <div className="text-xs text-accent-cyan">Support Portal</div>
              </div>
            </div>
            <p className="text-white/60 text-sm mb-6 max-w-md">
              Professional blockchain support for all your crypto needs. Multi-chain wallet assistance,
              transaction support, and expert guidance available 24/7.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gradient-accent flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="text-white text-lg" />
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.path}
                      className="text-white/60 hover:text-accent-cyan transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2">Stay Connected</h3>
            <p className="text-white/60 text-sm mb-4">
              Subscribe to our newsletter for updates on new features and support resources.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field flex-1"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm">
            © {currentYear} Fiercexontan-Ops. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
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

      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-accent opacity-50"></div>
    </footer>
  );
}