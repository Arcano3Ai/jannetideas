'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, Volume2, Image as ImageIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GreetingCardViewProps {
  title: string;
  senderName: string;
  recipientName: string;
  theme: string;
  items: Array<{
    title: string | null;
    content: string | null;
    mediaUrl: string | null;
    mediaType: string | null;
  }>;
}

export const GreetingCardView: React.FC<GreetingCardViewProps> = ({
  title,
  senderName,
  recipientName,
  theme,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenCard = () => {
    setIsOpen(true);
    try {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });
    } catch (e) {
      // fallback
    }
  };

  const item = items[0] || {};

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center text-white min-h-[80vh] flex flex-col justify-center items-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            className="w-full max-w-md cursor-pointer"
            onClick={handleOpenCard}
          >
            <div className="relative group bg-gradient-to-br from-rose-900 via-slate-900 to-indigo-950 border-2 border-rose-400/40 p-8 sm:p-12 rounded-3xl shadow-2xl backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-rose-400 hover:shadow-rose-500/30">
              <div className="w-20 h-20 bg-rose-500/20 text-rose-300 rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-500/40 group-hover:scale-110 transition-transform">
                <Mail className="w-10 h-10 animate-pulse" />
              </div>
              <span className="text-xs font-semibold text-rose-300 tracking-wider uppercase block mb-2">
                Tarjeta Digital Interactiva
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                {title}
              </h2>
              <p className="text-xs text-slate-300 mt-3">
                De: <span className="font-bold text-rose-300">{senderName}</span>
              </p>
              <div className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/30">
                <Heart className="w-4 h-4 fill-white" />
                Haz clic para Abrir la Tarjeta
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-slate-900/90 border border-rose-500/40 p-8 sm:p-12 rounded-3xl backdrop-blur-2xl text-left space-y-6 shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-xl text-white font-heading">{title}</h3>
              </div>
              <span className="text-xs text-rose-300 font-medium">De: {senderName}</span>
            </div>

            {item.mediaUrl && item.mediaType === 'IMAGE' && (
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img src={item.mediaUrl} alt="Tarjeta" className="w-full object-cover max-h-96" />
              </div>
            )}

            {item.mediaUrl && item.mediaType === 'AUDIO' && (
              <div className="p-4 bg-rose-950/60 rounded-2xl border border-rose-500/30 flex items-center gap-4">
                <Volume2 className="w-6 h-6 text-rose-400 animate-pulse shrink-0" />
                <audio src={item.mediaUrl} controls className="w-full h-8" />
              </div>
            )}

            {item.content && (
              <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 font-serif italic text-slate-100 text-base leading-relaxed whitespace-pre-wrap shadow-inner">
                "{item.content}"
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold"
              >
                Volver a Cerrar Sobre
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
