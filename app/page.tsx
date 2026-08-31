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
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs border border-amber-300 shadow-lg shadow-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            🎈 ¡Modo Mágico para Niños, Cumpleaños y Aventuras! 🚀
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-kids tracking-tight leading-tight">
            Sorpresas Mágicas y <br />
            <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent drop-shadow">
              Regalos Inolvidables 🎈✨
            </span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Diseña aventuras de búsqueda del tesoro, calendarios de sorpresas con globos animados y cápsulas mágicas. Comparte con tus hijos, sobrinos y seres queridos en 1 clic.
          </p>

          {/* 3D Balloons Banner Display */}
          <div className="relative mx-auto max-w-sm rounded-3xl overflow-hidden border-4 border-amber-400/60 shadow-2xl shadow-pink-500/30 my-4 transform hover:scale-105 transition-transform">
            <img src="/images/kids_party_balloons.jpg" alt="Fiesta de Globos" className="w-full h-48 sm:h-64 object-cover" />
            <div className="absolute bottom-2 left-2 right-2 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-center">
              <span className="text-xs font-bold font-kids text-amber-300">🎉 Globos Animados, Música & Confeti Mágico 🚀</span>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-bold text-slate-200 font-kids">
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-emerald-500/40 text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Enlaces Tokenizados 100% Seguros</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-amber-500/40 text-amber-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Sin Descargas ni Registros</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-purple-500/40 text-purple-300">
              <Gift className="w-4 h-4 text-purple-400" />
              <span>Sonidos & Globos Animados 🎈</span>
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
