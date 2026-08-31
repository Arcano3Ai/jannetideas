'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  emoji: string;
}

const SPARKLE_COLORS = ['#fbbf24', '#f472b6', '#38bdf8', '#a855f7', '#4ade80'];
const EMOJIS = ['✨', '⭐', '💫', '🎈', '🌟'];

export const MagicCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    let particleId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Spawn a trailing sparkle particle periodically
      if (Math.random() < 0.4) {
        const newParticle: Particle = {
          id: particleId++,
          x: e.clientX + (Math.random() * 16 - 8),
          y: e.clientY + (Math.random() * 16 - 8),
          size: Math.floor(Math.random() * 10) + 12,
          color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        };

        setParticles((prev) => [...prev.slice(-15), newParticle]);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Main Wand Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-400 border-2 border-white shadow-lg shadow-amber-400/50 flex items-center justify-center text-[10px]"
        animate={{
          x: pos.x - 12,
          y: pos.y - 12,
          scale: isClicking ? 1.5 : 1,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 400, mass: 0.2 }}
      >
        ✨
      </motion.div>

      {/* Trailing Sparkle Particles */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
            animate={{
              opacity: 0,
              scale: 0.2,
              y: p.y + 20,
              x: p.x + (Math.random() * 20 - 10),
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ position: 'fixed', fontSize: `${p.size}px` }}
            className="drop-shadow-md select-none"
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
