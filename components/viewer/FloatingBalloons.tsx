'use client';

import React from 'react';
import { motion } from 'framer-motion';

const BALLOON_COLORS = [
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#a855f7', // Purple
  '#ef4444', // Red
];

export const FloatingBalloons: React.FC = () => {
  // Generate 12 balloons with randomized positions, speeds, and colors
  const balloons = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 8.5 + 4) % 92}%`,
    color: BALLOON_COLORS[i % BALLOON_COLORS.length],
    size: 45 + (i % 4) * 15,
    delay: (i * 0.7) % 5,
    duration: 8 + (i % 5) * 2,
    emoji: ['🎈', '🌟', '🚀', '🦄', '🎈', '⭐', '🎈', '🍦'][i % 8],
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: '110vh', opacity: 0, scale: 0.8 }}
          animate={{
            y: '-20vh',
            x: [0, 15, -15, 0],
            opacity: [0, 0.9, 0.9, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            delay: b.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: b.left,
            fontSize: `${b.size}px`,
          }}
          className="drop-shadow-lg filter"
        >
          {b.emoji}
        </motion.div>
      ))}
    </div>
  );
};
