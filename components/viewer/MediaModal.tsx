'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, CheckCircle2, HelpCircle, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | null;
  dayNumber?: number | null;
  content?: string | null;
  mediaUrl?: string | null;
  mediaType?: string | null;
  quizData?: {
    question: string;
    options: string[];
    correctIndex: number;
  } | null;
  senderName?: string;
  theme?: string;
}

export const MediaModal: React.FC<MediaModalProps> = ({
  isOpen,
  onClose,
  title,
  dayNumber,
  content,
  mediaUrl,
  mediaType,
  quizData,
  senderName = 'Alguien especial',
}) => {
  const [selectedQuizIdx, setSelectedQuizIdx] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Fire confetti when opening an unlocked day or item
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // Fallback gracefully if confetti fails
      }
    }
  }, [isOpen]);

  const handleQuizSubmit = (idx: number) => {
    setSelectedQuizIdx(idx);
    setQuizAnswered(true);
    if (quizData && idx === quizData.correctIndex) {
      setIsCorrect(true);
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
      });
    } else {
      setIsCorrect(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          className="relative w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Top Decorative Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-snug">
                  {title || (dayNumber ? `Sorpresa Día #${dayNumber}` : 'Recuerdo Desbloqueado')}
                </h3>
                <p className="text-xs text-slate-400">De: {senderName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-y-auto space-y-5 pr-1">
            {/* Image display */}
            {mediaUrl && (mediaType === 'IMAGE' || !mediaType) && (
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-slate-950">
                <img
                  src={mediaUrl}
                  alt={title || 'Sorpresa'}
                  className="w-full max-h-80 object-cover"
                />
              </div>
            )}

            {/* Video Player */}
            {mediaUrl && mediaType === 'VIDEO' && (
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-slate-950">
                <video src={mediaUrl} controls className="w-full max-h-80" />
              </div>
            )}

            {/* Audio Note Player */}
            {mediaUrl && mediaType === 'AUDIO' && (
              <div className="p-4 bg-indigo-950/60 rounded-2xl border border-indigo-500/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                  <Volume2 className="w-6 h-6 animate-pulse" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-indigo-200 mb-1">Nota de Voz Especial</p>
                  <audio src={mediaUrl} controls className="w-full h-8" />
                </div>
              </div>
            )}

            {/* Secret Text / Letter */}
            {content && (
              <div className="bg-slate-950/80 p-5 rounded-2xl border border-white/10 leading-relaxed text-sm text-slate-200 whitespace-pre-wrap font-serif italic shadow-inner">
                "{content}"
              </div>
            )}

            {/* Interactive Mini Quiz */}
            {mediaType === 'QUIZ' && quizData && (
              <div className="bg-slate-950/90 p-5 rounded-2xl border border-purple-500/30 space-y-4">
                <div className="flex items-center gap-2 text-purple-300 font-semibold text-sm">
                  <HelpCircle className="w-5 h-5 text-purple-400" />
                  <span>{quizData.question}</span>
                </div>

                <div className="space-y-2">
                  {quizData.options.map((opt, idx) => {
                    let btnStyle = 'border-white/10 bg-slate-900 text-slate-200 hover:bg-slate-800';
                    if (quizAnswered) {
                      if (idx === quizData.correctIndex) {
                        btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold';
                      } else if (selectedQuizIdx === idx) {
                        btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-300';
                      }
                    }
                    return (
                      <button
                        key={idx}
                        disabled={quizAnswered}
                        onClick={() => handleQuizSubmit(idx)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-medium transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizAnswered && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold text-center ${
                      isCorrect
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {isCorrect ? '¡Correcto! Has respondido a la perfección.' : '¡Casi! Inténtalo de nuevo cuando quieras.'}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30"
            >
              Cerrar Sorpresa
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
