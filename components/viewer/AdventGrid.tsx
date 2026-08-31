'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Gift, Sparkles, Check, Heart } from 'lucide-react';
import { MediaModal } from './MediaModal';

export interface AdventItem {
  id: string;
  dayNumber: number;
  title: string | null;
  content: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  isLocked: boolean;
  unlockDate?: string | null;
  quizData?: any;
}

interface AdventGridProps {
  title: string;
  senderName: string;
  recipientName: string;
  theme: string;
  items: AdventItem[];
}

export const AdventGrid: React.FC<AdventGridProps> = ({
  title,
  senderName,
  recipientName,
  theme,
  items,
}) => {
  const [selectedItem, setSelectedItem] = useState<AdventItem | null>(null);
  const [openedDays, setOpenedDays] = useState<Record<number, boolean>>({});

  const handleOpenDay = (item: AdventItem) => {
    if (item.isLocked) return;
    setOpenedDays((prev) => ({ ...prev, [item.dayNumber]: true }));
    setSelectedItem(item);
  };

  const KIDS_STICKERS = ['⭐', '🚀', '🎈', '🎨', '🦄', '🦸‍♂️', '🎮', '🏆', '🍦', '🦖', '💥', '🌟'];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header Greeting Card Banner */}
      <div className="text-center mb-12 space-y-3">
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold ${
          theme === 'kids'
            ? 'bg-amber-400 text-slate-950 font-bold border-2 border-amber-300 shadow-lg shadow-amber-500/30'
            : 'bg-amber-500/10 border border-amber-500/30 text-amber-300'
        }`}>
          <Sparkles className="w-4 h-4" />
          {theme === 'kids' ? '🚀 Aventura Infantil de Sorpresas 🎈' : 'Calendario Especial de Sorpresas'}
        </div>
        <h1 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-heading ${
          theme === 'kids' ? 'text-amber-300 drop-shadow-md' : 'text-white'
        }`}>
          {title}
        </h1>
        <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto">
          Un viaje lleno de magia preparado por <span className="font-bold text-amber-300">{senderName}</span> para{' '}
          <span className="font-bold text-cyan-300">{recipientName}</span>! 🌟
        </p>
      </div>

      {/* Grid of Days */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
        {items.map((item) => {
          const isOpened = openedDays[item.dayNumber];
          const isLocked = item.isLocked;

          return (
            <motion.div
              key={item.id || item.dayNumber}
              whileHover={!isLocked ? { scale: 1.05, rotate: 1 } : { scale: 0.98 }}
              whileTap={!isLocked ? { scale: 0.95 } : {}}
              className="relative aspect-square"
            >
              <button
                type="button"
                onClick={() => handleOpenDay(item)}
                disabled={isLocked}
                className={`w-full h-full rounded-2xl p-4 flex flex-col items-center justify-between border-2 transition-all duration-300 shadow-xl overflow-hidden ${
                  isLocked
                    ? 'border-white/10 bg-slate-900/40 text-slate-500 cursor-not-allowed opacity-60'
                    : isOpened
                    ? 'border-amber-400 bg-gradient-to-br from-amber-500/20 via-slate-900 to-indigo-950 text-amber-300 shadow-amber-500/20 ring-2 ring-amber-400/40'
                    : 'border-indigo-500/40 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white hover:border-amber-400 hover:shadow-indigo-500/30'
                }`}
              >
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs font-black tracking-widest text-slate-400 uppercase">
                    DÍA
                  </span>
                  {isLocked ? (
                    <Lock className="w-4 h-4 text-slate-500" />
                  ) : isOpened ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                  )}
                </div>

                <div className="my-auto text-center">
                  <span className="text-3xl sm:text-4xl font-extrabold font-heading block">
                    {item.dayNumber}
                  </span>
                  {!isLocked && (
                    <span className="text-[10px] font-semibold text-amber-300 tracking-wider uppercase block mt-1">
                      {isOpened ? 'Abierto' : '¡Abrir!'}
                    </span>
                  )}
                </div>

                <div className="w-full flex items-center justify-center">
                  {isLocked ? (
                    <span className="text-[9px] text-slate-500 font-medium">Bloqueado</span>
                  ) : (
                    <Gift className="w-5 h-5 text-amber-400" />
                  )}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Modal for Opened Day */}
      {selectedItem && (
        <MediaModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          dayNumber={selectedItem.dayNumber}
          title={selectedItem.title}
          content={selectedItem.content}
          mediaUrl={selectedItem.mediaUrl}
          mediaType={selectedItem.mediaType}
          quizData={selectedItem.quizData}
          senderName={senderName}
          theme={theme}
        />
      )}
    </div>
  );
};
