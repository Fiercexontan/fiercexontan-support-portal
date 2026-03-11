'use client';

import { motion } from 'framer-motion';
import { BLOCKCHAIN_ICONS } from '@/lib/constants';
import { useEffect, useState } from 'react';

export default function FloatingBlockchain() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-30">
      {BLOCKCHAIN_ICONS.slice(0, 6).map((icon, index) => (
        <motion.div
          key={icon.symbol}
          className="absolute"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            ],
            y: [
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
            ],
            rotate: [0, 180, 360],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: 25 + index * 3,
            repeat: Infinity,
            delay: index * 2,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center font-bold text-sm md:text-lg backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, ${icon.color}30, ${icon.color}10)`,
              border: `2px solid ${icon.color}40`,
              color: icon.color,
              boxShadow: `0 0 20px ${icon.color}20`,
            }}
          >
            {icon.symbol}
          </div>
        </motion.div>
      ))}
    </div>
  );
}