'use client';

import { motion } from 'framer-motion';
import { BLOCKCHAIN_ICONS } from '@/lib/constants';
import { useEffect, useState } from 'react';

export default function FloatingBlockchain() {
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });

  useEffect(() => {
    // Set dimensions after component mounts (client-side only)
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate random positions and durations for each icon
  const generateAnimationProps = (index) => {
    const baseDelay = index * 2;
    const baseDuration = 20 + (index * 3);
    
    return {
      initial: {
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        rotate: 0,
        opacity: 0,
      },
      animate: {
        x: [
          Math.random() * dimensions.width,
          Math.random() * dimensions.width,
          Math.random() * dimensions.width,
        ],
        y: [
          Math.random() * dimensions.height,
          Math.random() * dimensions.height,
          Math.random() * dimensions.height,
        ],
        rotate: [0, 360, 720],
        opacity: [0, 0.3, 0],
      },
      transition: {
        duration: baseDuration,
        repeat: Infinity,
        delay: baseDelay,
        ease: 'easeInOut',
      },
    };
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {BLOCKCHAIN_ICONS.map((icon, index) => (
        <motion.div
          key={icon.symbol}
          className="absolute w-16 h-16 md:w-20 md:h-20"
          {...generateAnimationProps(index)}
        >
          {/* Simple circular icon with gradient */}
          <div
            className="w-full h-full rounded-full flex items-center justify-center font-bold text-lg md:text-xl shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${icon.color}40, ${icon.color}20)`,
              border: `2px solid ${icon.color}60`,
              color: icon.color,
            }}
          >
            {icon.symbol}
          </div>
        </motion.div>
      ))}

      {/* Additional decorative floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? '#0066FF' : '#00D9B5',
          }}
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            opacity: 0,
          }}
          animate={{
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}