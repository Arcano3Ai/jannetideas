import React from 'react';
import { CreatorWizard } from '@/components/creators/CreatorWizard';
import { Sparkles, Gift, Lock, Calendar, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-extrabold tracking-tight font-heading text-white">
              Momentum
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#builder"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all"
            >
              Crear Experiencia
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 text-center overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            Experiencias Digitales Interactivas & Unboxing en Tiempo Real
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight leading-tight">
            Sorpresas Digitales que <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Perduran en el Tiempo
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Diseña calendarios de adviento, cápsulas del tiempo con temporizador en vivo y tarjetas interactivas. Comparte emociones con un solo enlace seguro, sin descargas ni registros.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Enlaces Tokenizados Criptográficos</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Sin Registro para Destinatarios</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-purple-400" />
              <span>Desempacado & Confeti Animado</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Builder Wizard Section */}
      <section id="builder" className="py-12 border-t border-white/5 bg-slate-950/60">
        <CreatorWizard />
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            Tres Formatos, Infinitas Emociones
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Elige el formato perfecto según la ocasión y sorprende a quien más quieres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Calendarios de Adviento</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Configura 7, 12 o 24 días de regalos diarios. Fotos, notas de voz o trivias que se desbloquean automáticamente cada medianoche.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cápsulas del Tiempo</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Guarda cartas y videos bajo un temporizador en vivo. Si el destinatario intenta abrir antes de tiempo, recibe una denegación juguetona.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mb-6">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Tarjetas de Felicitación</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Sobres animados con efectos 3D, música y galerías para cumpleaños, aniversarios o momentos inolvidables.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Momentum Platform. Diseñado con estándares Senior Principal de Ingeniería.</p>
      </footer>
    </main>
  );
}
