'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Clock, Sparkles, ShieldAlert, Heart, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TimeCapsuleViewProps {
  title: string;
  senderName: string;
  recipientName: string;
  targetDate: string | null;
  isLocked: boolean;
  items: Array<{
    title: string | null;
    content: string | null;
    mediaUrl: string | null;
    mediaType: string | null;
  }>;
}

export const TimeCapsuleView: React.FC<TimeCapsuleViewProps> = ({
  title,
  senderName,
  recipientName,
  targetDate,
  isLocked: initialIsLocked,
  items,
}) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [unlocked, setUnlocked] = useState(!initialIsLocked);
  const [showDenialNotice, setShowDenialNotice] = useState(false);

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (!unlocked) {
          setUnlocked(true);
          confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
        }
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate, unlocked]);

  const handleAttemptUnlock = () => {
    if (!unlocked) {
      setShowDenialNotice(true);
      setTimeout(() => setShowDenialNotice(false), 4000);
    } else {
      confetti({ particleCount: 100, spread: 80 });
    }
  };

  const formattedDate = targetDate
    ? new Date(targetDate).toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center text-white">
      {/* Header */}
      <div className="space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <Clock className="w-4 h-4" />
          Cápsula del Tiempo Digital
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-heading tracking-tight">
          {title}
        </h1>
        <p className="text-slate-300 text-sm sm:text-base">
          De: <strong className="text-purple-300">{senderName}</strong> • Para:{' '}
          <strong className="text-indigo-300">{recipientName}</strong>
        </p>
      </div>

      {/* Countdown Timer Display */}
      {!unlocked && (
        <div className="mb-12">
          <p className="text-slate-400 text-xs uppercase tracking-widest font-semibold mb-6">
            Tiempo Restante para la Apertura
          </p>
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
            {[
              { label: 'Días', val: timeLeft.days },
              { label: 'Horas', val: timeLeft.hours },
              { label: 'Minutos', val: timeLeft.minutes },
              { label: 'Segundos', val: timeLeft.seconds },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="bg-slate-900/80 border border-purple-500/30 rounded-2xl p-3 sm:p-5 backdrop-blur-xl shadow-xl shadow-purple-950/40"
              >
                <span className="text-2xl sm:text-5xl font-extrabold font-mono text-purple-300 block">
                  {String(unit.val).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium uppercase mt-1 block">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vault / Box Visual */}
      <div className="my-10">
        <button
          type="button"
          onClick={handleAttemptUnlock}
          className={`relative group mx-auto w-64 h-64 sm:w-80 sm:h-80 rounded-3xl border-2 flex flex-col items-center justify-center p-8 transition-all duration-500 shadow-2xl backdrop-blur-2xl ${
            unlocked
              ? 'border-emerald-400 bg-gradient-to-b from-emerald-950/40 via-slate-900 to-indigo-950 shadow-emerald-500/20 ring-4 ring-emerald-500/30 scale-105'
              : 'border-purple-500/40 bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 hover:border-purple-400 shadow-purple-500/20'
          }`}
        >
          <div className="mb-4">
            {unlocked ? (
              <div className="p-6 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/40 animate-bounce">
                <Unlock className="w-12 h-12" />
              </div>
            ) : (
              <div className="p-6 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/40 group-hover:scale-110 transition-transform">
                <Lock className="w-12 h-12" />
              </div>
            )}
          </div>

          <h3 className="text-xl font-bold font-heading">
            {unlocked ? '¡Cápsula Desbloqueada!' : 'Baúl Sellado'}
          </h3>
          <p className="text-xs text-slate-400 mt-2 max-w-xs">
            {unlocked
              ? 'Haz clic para revelar todos tus recuerdos guardados.'
              : `Este baúl se abrirá automáticamente el ${formattedDate}.`}
          </p>
        </button>
      </div>

      {/* Playful Denial Notice if clicked early */}
      <AnimatePresence>
        {showDenialNotice && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-md mx-auto p-4 rounded-2xl bg-rose-950/90 border border-rose-500/40 text-rose-200 text-xs font-semibold flex items-center justify-center gap-3 shadow-lg"
          >
            <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            <span>¡Aún no! Este baúl se abre el {formattedDate}. Vuelve pronto.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revealed Secret Content when Unlocked */}
      {unlocked && items.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-slate-900/90 border border-emerald-500/30 p-8 rounded-3xl backdrop-blur-2xl text-left space-y-6 max-w-2xl mx-auto shadow-2xl"
        >
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <Sparkles className="w-6 h-6 text-amber-400" />
            <div>
              <h2 className="text-xl font-bold text-white font-heading">
                {items[0].title || 'Mensaje de la Cápsula'}
              </h2>
              <p className="text-xs text-slate-400">Desbloqueado con éxito</p>
            </div>
          </div>

          {items[0].mediaUrl && items[0].mediaType === 'IMAGE' && (
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <img src={items[0].mediaUrl} alt="Recuerdo" className="w-full object-cover max-h-96" />
            </div>
          )}

          {items[0].mediaUrl && items[0].mediaType === 'VIDEO' && (
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg">
              <video src={items[0].mediaUrl} controls className="w-full max-h-96" />
            </div>
          )}

          {items[0].content && (
            <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 font-serif italic text-slate-200 text-base leading-relaxed whitespace-pre-wrap">
              "{items[0].content}"
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
