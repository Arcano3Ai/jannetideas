'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Lock, Volume2, Star, Check, HelpCircle } from 'lucide-react';
import { playMagicChimeSound } from '@/lib/sound';
import confetti from 'canvas-confetti';

export const InteractiveShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kids' | 'festive' | 'capsule'>('kids');
  const [openedBox, setOpenedBox] = useState<number | null>(null);

  const handleBoxClick = (boxNum: number) => {
    playMagicChimeSound();
    setOpenedBox(boxNum);
    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="bg-slate-900/80 border-2 border-amber-300/40 rounded-3xl p-6 sm:p-10 backdrop-blur-2xl shadow-2xl space-y-8 max-w-4xl mx-auto my-12">
      <div className="text-center space-y-3">
        <span className="text-xs font-black font-kids bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full border border-amber-300 shadow-md inline-block">
          🎮 Sandbox Interactivo en Vivo
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-kids text-amber-300 drop-shadow">
          ¡Prueba el Unboxing Mágico Aquí Mismo!
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
          Haz clic en las cajas de regalo de abajo para experimentar la magia de la apertura con sonidos y confeti en tiempo real.
        </p>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {[
            { id: 'kids', label: '🎈 Modo Niños Mágico' },
            { id: 'festive', label: '🎁 Navideño / Festivo' },
            { id: 'capsule', label: '🔐 Cápsula del Tiempo' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playMagicChimeSound();
                setActiveTab(tab.id as any);
                setOpenedBox(null);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 shadow-lg scale-105 border-2 border-yellow-300'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Grid Demo */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((boxNum) => {
          const isOpen = openedBox === boxNum;
          return (
            <motion.button
              key={boxNum}
              whileHover={{ scale: 1.1, rotate: [-2, 2, 0] }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleBoxClick(boxNum)}
              className={`aspect-square rounded-3xl p-4 flex flex-col items-center justify-between border-4 transition-all duration-300 shadow-xl overflow-hidden relative ${
                isOpen
                  ? 'border-yellow-300 bg-gradient-to-br from-yellow-300 via-pink-500 to-cyan-400 text-slate-950 shadow-yellow-400/50'
                  : 'border-pink-500 bg-gradient-to-br from-purple-900 via-indigo-950 to-pink-950 text-white shadow-pink-500/30 btn-kids-toy'
              }`}
            >
              <div className="w-full flex justify-between items-center text-xs font-black font-kids">
                <span>DÍA {boxNum}</span>
                {isOpen ? <Check className="w-4 h-4 text-slate-950" /> : <Sparkles className="w-4 h-4 text-amber-300 animate-bounce" />}
              </div>

              <div className="my-auto text-center font-kids">
                <span className="text-2xl block">
                  {['🚀', '🦄', '🦖', '🏆'][boxNum - 1]}
                </span>
                <span className="text-2xl font-extrabold text-amber-300 block">
                  #{boxNum}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider block mt-1 text-cyan-300">
                  {isOpen ? '¡Revelado!' : '¡Tocar aquí!'}
                </span>
              </div>

              <Gift className="w-5 h-5 text-pink-300 animate-pulse" />
            </motion.button>
          );
        })}
      </div>

      {/* Opened Surprise Display Panel */}
      <AnimatePresence>
        {openedBox && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-6 bg-slate-950 border-2 border-yellow-300 rounded-3xl text-center space-y-3 shadow-2xl relative"
          >
            <div className="p-3 bg-yellow-400 text-slate-950 rounded-full w-12 h-12 flex items-center justify-center mx-auto border-2 border-amber-300 animate-bounce font-extrabold text-xl">
              {['🚀', '🦄', '🦖', '🏆'][openedBox - 1]}
            </div>
            <h3 className="text-lg font-black font-kids text-amber-300">
              ¡Sorpresa #{openedBox} Revelada!
            </h3>
            <p className="text-xs text-slate-200 font-serif italic italic font-medium max-w-md mx-auto">
              "{['¡Tu aventura espacial comienza hoy! Revisa debajo de la almohada 🚀', '¡Ganaste una medalla de valentía y un unicornio brillante! 🦄', '¡Demostraste tener súper fuerza de dinosaurio! 🦖', '¡Eres el campeón absoluto de las sorpresas! 🏆'][openedBox - 1]}"
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
