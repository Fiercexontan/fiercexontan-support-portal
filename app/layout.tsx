'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingBlockchain from '@/components/FloatingBlockchain';
import TawkChat from '@/components/TawkChat';
import { Web3ModalProvider } from '@/components/Web3ModalProvider';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Fiercexontan Support Portal - Multi-Chain Blockchain Support</title>
        <meta name="description" content="Professional blockchain support for all your crypto needs. Multi-chain wallet assistance, transaction support, and expert guidance available 24/7." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Web3ModalProvider>
          {/* Animated background elements */}
          <FloatingBlockchain />
          
          {/* Main layout structure */}
          <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />
            
            {/* Main content with top padding for fixed navbar */}
            <main className="flex-1 pt-20">
              {children}
            </main>
            
            <Footer />
          </div>

          {/* Live chat widget */}
          <TawkChat />
        </Web3ModalProvider>
      </body>
    </html>
  );
}