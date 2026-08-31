'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Lock,
  Gift,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Copy,
  Sparkles,
  Share2,
  Clock,
  Plus,
  Edit2,
  ExternalLink,
} from 'lucide-react';
import { ThemeSelector, ThemeType } from './ThemeSelector';
import { DayItemEditor, DayItemData } from './DayItemEditor';

export type ExperienceType = 'ADVENT' | 'TIME_CAPSULE' | 'GREETING_CARD';

export const CreatorWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<ExperienceType>('ADVENT');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [theme, setTheme] = useState<ThemeType>('festive');
  const [targetDate, setTargetDate] = useState<string>(
    new Date(Date.now() + 86400000 * 7).toISOString().slice(0, 16)
  );
  const [daysCount, setDaysCount] = useState<number>(7);

  // Items for Advent or Capsule
  const [items, setItems] = useState<DayItemData[]>([
    {
      dayNumber: 1,
      title: 'Día 1: Una sorpresa para iniciar',
      content: '¡Bienvenidos a este viaje especial de sorpresas diarias!',
      mediaUrl: '',
      mediaType: 'TEXT',
    },
  ]);

  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Synchronize days array when daysCount changes for ADVENT
  const handleDaysCountChange = (count: number) => {
    setDaysCount(count);
    const newItems: DayItemData[] = Array.from({ length: count }, (_, i) => {
      const dayNum = i + 1;
      return (
        items[i] || {
          dayNumber: dayNum,
          title: `Día ${dayNum}: Revelación especial`,
          content: '',
          mediaUrl: '',
          mediaType: 'TEXT',
        }
      );
    });
    setItems(newItems);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (type === 'ADVENT' && items.length !== daysCount) {
        handleDaysCountChange(daysCount);
      }
    }
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCreateExperience = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        type,
        title: title || (type === 'ADVENT' ? 'Mi Calendario de Sorpresas' : type === 'TIME_CAPSULE' ? 'Cápsula del Tiempo Secreta' : 'Tarjeta de Felicitación Especial'),
        subtitle,
        senderName: senderName || 'Alguien que te aprecia',
        recipientName: recipientName || 'Querido/a amigo/a',
        theme,
        targetDate: targetDate ? new Date(targetDate).toISOString() : null,
        items,
      };

      const res = await fetch('/api/experiences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.token) {
        setGeneratedToken(data.token);
        setStep(4);
      } else {
        alert(data.error || 'Error al guardar la experiencia');
      }
    } catch (err) {
      console.error('Error submitting wizard:', err);
      alert('Error de conexión con el servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareUrl = generatedToken
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/v/${generatedToken}`
    : '';

  const handleCopyLink = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleApplyKidsPreset = () => {
    setType('ADVENT');
    setTitle('🚀 Búsqueda del Tesoro Mágico & Sorpresas 🎈');
    setSenderName('Los Magos de la Casa 🪄');
    setRecipientName('Mi Campeón / Campeona Favorita ⭐');
    setTheme('kids');
    setDaysCount(7);
    setItems([
      { dayNumber: 1, title: '¡Día 1: Misión Espacial Secreta! 🚀', content: '¡Felicidades! Has comenzado la gran aventura del tesoro. ¡Revisa debajo de tu almohada o tu escritorio!', mediaUrl: '', mediaType: 'TEXT' },
      { dayNumber: 2, title: '¡Día 2: Trivia de Superhéroes! 🦸‍♂️', content: 'Responde correctamente para ganar tu primer sticker mágico:', mediaUrl: '', mediaType: 'QUIZ', quizData: { question: '¿Cuál es el superpoder más genial del universo?', options: ['Volar a la luna 🚀', 'Súper velocidad ⚡', 'Invisibilidad 🔮', '¡Todos los anteriores! 🎉'], correctIndex: 3 } },
      { dayNumber: 3, title: '¡Día 3: Premio de Valentía! 🦖', content: '¡Felicidades por ser una persona súper valiente y genial hoy! 🏆⭐', mediaUrl: '', mediaType: 'TEXT' },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Wizard Header / Stepper */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Momentum Experience Builder
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
          Crea una Experiencia Inolvidable
        </h1>
        <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">
          Diseña sorpresas digitales interactivas, calendarios de adviento o cápsulas del tiempo para compartir mediante un enlace único.
        </p>

        {/* Quick Kids Preset Banner */}
        <div className="mt-4">
          <button
            type="button"
            onClick={handleApplyKidsPreset}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 text-slate-950 rounded-2xl text-xs font-black shadow-lg shadow-pink-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto font-kids border-2 border-yellow-300"
          >
            <span>✨ ¡Cargar Plantilla Mágica para Niños! (1-Clic) 🎈</span>
          </button>
        </div>

        {/* Stepper Dots */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mt-8">
          {[
            { num: 1, label: 'Tipo' },
            { num: 2, label: 'Contenido' },
            { num: 3, label: 'Diseño' },
            { num: 4, label: 'Compartir' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.num
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 ring-2 ring-indigo-400/50'
                    : step > s.num
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'bg-slate-800 text-slate-500 border border-white/5'
                }`}
              >
                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span
                className={`text-xs font-medium hidden sm:inline ${
                  step === s.num ? 'text-white' : 'text-slate-500'
                }`}
              >
                {s.label}
              </span>
              {s.num < 4 && <div className="w-6 sm:w-12 h-[1px] bg-white/10 hidden xs:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step Contents */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <h2 className="text-xl font-bold text-white text-center mb-6">
              Paso 1: Selecciona el formato de tu experiencia
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Type Card: Advent Calendar */}
              <button
                type="button"
                onClick={() => setType('ADVENT')}
                className={`p-6 rounded-2xl border-2 text-left transition-all backdrop-blur-xl flex flex-col justify-between ${
                  type === 'ADVENT'
                    ? 'border-indigo-500 bg-indigo-950/40 shadow-xl shadow-indigo-500/20 scale-[1.02]'
                    : 'border-white/10 bg-slate-900/60 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/30">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Calendario de Adviento</h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Cuenta regresiva por días (7, 12 o 24). Cada día desbloquea una foto, mensaje o trivia interactiva.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-semibold text-amber-400">
                  <span>Revelación Diaria</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Type Card: Time Capsule */}
              <button
                type="button"
                onClick={() => setType('TIME_CAPSULE')}
                className={`p-6 rounded-2xl border-2 text-left transition-all backdrop-blur-xl flex flex-col justify-between ${
                  type === 'TIME_CAPSULE'
                    ? 'border-indigo-500 bg-indigo-950/40 shadow-xl shadow-indigo-500/20 scale-[1.02]'
                    : 'border-white/10 bg-slate-900/60 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/30">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Cápsula del Tiempo</h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Establece una fecha y hora exacta de desbloqueo. Los recuerdos quedan sellados bajo una cuenta regresiva en vivo.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-semibold text-purple-400">
                  <span>Reloj en Tiempo Real</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              {/* Type Card: Digital Greeting Card */}
              <button
                type="button"
                onClick={() => setType('GREETING_CARD')}
                className={`p-6 rounded-2xl border-2 text-left transition-all backdrop-blur-xl flex flex-col justify-between ${
                  type === 'GREETING_CARD'
                    ? 'border-indigo-500 bg-indigo-950/40 shadow-xl shadow-indigo-500/20 scale-[1.02]'
                    : 'border-white/10 bg-slate-900/60 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-4 border border-rose-500/30">
                    <Gift className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Tarjeta Digital Animada</h3>
                  <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                    Tarjeta de felicitación interactiva con apertura de sobre, notas de voz, carta personal y galería multimedia.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs font-semibold text-rose-400">
                  <span>Unboxing Interactivo</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
              >
                Continuar al Contenido
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 bg-slate-900/60 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-xl"
          >
            <h2 className="text-xl font-bold text-white mb-4">
              Paso 2: Personaliza el Contenido y Mensajes
            </h2>

            {/* Common Metadata Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">De (Tu Nombre)</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Ej: Sergio / Tu amado/a..."
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Para (Destinatario)</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Ej: Jannet / Mi mejor amigo..."
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">Título Principal</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  type === 'ADVENT'
                    ? 'Ej: Cuenta Regresiva de Navidad para Ti'
                    : type === 'TIME_CAPSULE'
                    ? 'Ej: Cápsula de Recuerdos 2026'
                    : 'Ej: ¡Feliz Cumpleaños Especial!'
                }
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* ADVENT SPECIFIC: Number of Days & List of items */}
            {type === 'ADVENT' && (
              <div className="space-y-6 border-t border-white/10 pt-6">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Duración del Calendario (Días)
                  </label>
                  <div className="flex gap-3">
                    {[7, 12, 24].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => handleDaysCountChange(count)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          daysCount === count
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'border-white/10 bg-slate-950/50 text-slate-400 hover:text-white'
                        }`}
                      >
                        {count} Días
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Fecha de Inicio del Calendario (Día 1)
                  </label>
                  <input
                    type="datetime-local"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                {/* Day Items List & Editor */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-white">Editar Sorpresas Diarias:</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {items.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveItemIndex(idx)}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          activeItemIndex === idx
                            ? 'border-amber-400 bg-amber-500/20 text-amber-300 font-bold scale-[1.05]'
                            : item.content || item.mediaUrl
                            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                            : 'border-white/10 bg-slate-950/60 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-xs block font-bold">Día #{item.dayNumber}</span>
                        <span className="text-[10px] opacity-70 block truncate mt-0.5">
                          {item.title || 'Sin editar'}
                        </span>
                      </button>
                    ))}
                  </div>

                  {activeItemIndex !== null && items[activeItemIndex] && (
                    <div className="mt-4">
                      <DayItemEditor
                        item={items[activeItemIndex]}
                        onChange={(updated) => {
                          const newItems = [...items];
                          newItems[activeItemIndex] = updated;
                          setItems(newItems);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TIME CAPSULE SPECIFIC: Target Unlock Date & Secret Content */}
            {type === 'TIME_CAPSULE' && (
              <div className="space-y-6 border-t border-white/10 pt-6">
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-2 flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    Fecha y Hora de Desbloqueo Exacta
                  </label>
                  <input
                    type="datetime-local"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full sm:w-auto bg-slate-950/80 border border-purple-500/40 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-400 shadow-inner"
                  />
                  <p className="text-[11px] text-slate-400 mt-1.5">
                    Los recuerdos y archivos adjuntos permanecerán sellados bajo el baúl hasta este segundo exacto.
                  </p>
                </div>

                <div className="mt-4">
                  <DayItemEditor
                    item={items[0] || { title: 'Recuerdo Sellado', content: '', mediaUrl: '', mediaType: 'TEXT' }}
                    onChange={(updated) => setItems([updated])}
                  />
                </div>
              </div>
            )}

            {/* GREETING CARD SPECIFIC */}
            {type === 'GREETING_CARD' && (
              <div className="space-y-6 border-t border-white/10 pt-6">
                <DayItemEditor
                  item={items[0] || { title: 'Tu Mensaje Especial', content: '', mediaUrl: '', mediaType: 'TEXT' }}
                  onChange={(updated) => setItems([updated])}
                />
              </div>
            )}

            <div className="flex justify-between items-center mt-8 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-2.5 text-slate-400 hover:text-white rounded-xl text-sm font-medium flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Atrás
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30"
              >
                Siguiente: Personalizar Tema
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 bg-slate-900/60 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-xl"
          >
            <h2 className="text-xl font-bold text-white mb-2">
              Paso 3: Elige el Tema Visual & Estilo
            </h2>
            <p className="text-slate-400 text-xs mb-6">
              Selecciona la estética visual con la que tu destinatario interactuará al abrir el enlace.
            </p>

            <ThemeSelector selectedTheme={theme} onSelectTheme={setTheme} />

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-5 py-2.5 text-slate-400 hover:text-white rounded-xl text-sm font-medium flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Atrás
              </button>
              <button
                type="button"
                onClick={handleCreateExperience}
                disabled={isSubmitting}
                className="px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-xl shadow-indigo-500/30"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generando Enlace Seguro...
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generar Experiencia y Obtener Link
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && generatedToken && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 bg-slate-900/90 border border-emerald-500/40 p-8 sm:p-12 rounded-3xl backdrop-blur-2xl shadow-2xl relative overflow-hidden"
          >
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              ¡Tu Experiencia está Lista para Compartir!
            </h2>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Tu regalo digital ha sido tokenizado con alta seguridad. Envía este enlace a{' '}
              <strong className="text-amber-300">{recipientName || 'tu destinatario'}</strong>.
            </p>

            {/* Shareable Link Bar */}
            <div className="bg-slate-950 border border-white/15 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 max-w-xl mx-auto shadow-inner">
              <span className="text-indigo-300 text-xs sm:text-sm font-mono truncate w-full sm:w-auto px-2">
                {shareUrl}
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shrink-0"
              >
                <Copy className="w-4 h-4" />
                {copied ? '¡Enlace Copiado!' : 'Copiar Enlace'}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href={`/v/${generatedToken}`}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-2 border border-white/10 transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                Probar Vista del Destinatario
              </a>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setGeneratedToken(null);
                }}
                className="px-6 py-3 text-slate-400 hover:text-white text-xs font-semibold"
              >
                Crear Otra Experiencia
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
