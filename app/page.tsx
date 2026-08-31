import React from 'react';
import { CreatorWizard } from '@/components/creators/CreatorWizard';
import { MagicCursor } from '@/components/viewer/MagicCursor';
import { InteractiveShowcase } from '@/components/landing/InteractiveShowcase';
import { Sparkles, Gift, Lock, Calendar, ShieldCheck, Zap, Heart, Star, Smile, Rocket, HelpCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-amber-400 selection:text-slate-950 relative">
      {/* Magic Wand Cursor Effect */}
      <MagicCursor />

      {/* Navigation Header */}
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-pink-500/30 border border-yellow-300">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <span className="text-xl font-extrabold tracking-tight font-kids text-amber-300">
              Momentum Kids & Magic
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#builder"
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-slate-950 rounded-2xl text-xs font-black shadow-lg shadow-pink-500/30 transition-all font-kids border border-yellow-200"
            >
              🚀 Crear Experiencia Mágica
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs border border-amber-300 shadow-lg shadow-amber-500/30 font-kids">
            <Sparkles className="w-3.5 h-3.5" />
            🎈 ¡Modo Mágico para Niños, Cumpleaños y Aventuras! 🚀
          </div>

          <h1 className="text-4xl sm:text-6xl font-black font-kids tracking-tight leading-tight">
            Sorpresas Mágicas y <br />
            <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent drop-shadow">
              Regalos Inolvidables 🎈✨
            </span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-kids">
            Diseña aventuras de búsqueda del tesoro, calendarios de sorpresas con globos animados y cápsulas mágicas. Comparte con tus hijos, sobrinos y seres queridos en 1 clic.
          </p>

          {/* 3D Balloons Banner Display */}
          <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden border-4 border-amber-400/80 shadow-2xl shadow-pink-500/40 my-6 transform hover:scale-105 transition-transform bg-slate-900">
            <img src="/images/kids_party_balloons.jpg" alt="Fiesta de Globos" className="w-full h-56 sm:h-72 object-cover" />
            <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-yellow-300 text-center shadow-lg">
              <span className="text-xs font-bold font-kids text-amber-300">🎉 Globos Animados, Sonidos Mágicos & Confeti 🚀</span>
            </div>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-bold text-slate-200 font-kids">
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-emerald-500/40 text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Enlaces Tokenizados 100% Seguros</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-amber-500/40 text-amber-300">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Sin Descargas ni Registros</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-purple-500/40 text-purple-300">
              <Gift className="w-4 h-4 text-purple-400" />
              <span>Sonidos & Globos Animados 🎈</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sandbox Section */}
      <section className="px-4">
        <InteractiveShowcase />
      </section>

      {/* Main Builder Wizard Section */}
      <section id="builder" className="py-12 border-t border-white/10 bg-slate-950/80">
        <CreatorWizard />
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold font-kids bg-cyan-400 text-slate-950 px-3 py-1 rounded-full border border-cyan-300">
            ✨ Diversión Asegurada
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-kids text-amber-300">
            Tres Formatos Mágicos para Cada Ocasión
          </h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto font-kids">
            Elige el formato perfecto para sorprender a los niños y celebrar la vida.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-slate-900/80 border-2 border-amber-400/40 backdrop-blur-xl shadow-xl hover:border-amber-300 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mb-6 border-2 border-amber-300 font-bold text-2xl shadow-lg shadow-amber-400/30">
              <Calendar className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-kids text-amber-300 mb-2">Calendarios de Sorpresas</h3>
            <p className="text-slate-300 text-xs leading-relaxed font-kids">
              7, 12 o 24 días de pequeñas misiones, regalos, notas de voz de papá/mamá y preguntas de superhéroes que se abren cada día.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/80 border-2 border-purple-400/40 backdrop-blur-xl shadow-xl hover:border-purple-300 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-purple-500 text-white flex items-center justify-center mb-6 border-2 border-purple-300 font-bold text-2xl shadow-lg shadow-purple-500/30">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-kids text-purple-300 mb-2">Baúl del Tesoro Secreto</h3>
            <p className="text-slate-300 text-xs leading-relaxed font-kids">
              Cápsulas del tiempo con temporizador en vivo en milisegundos. Si intentan abrir antes de la fecha de cumpleaños, ¡reciben una alerta juguetona!
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-900/80 border-2 border-pink-400/40 backdrop-blur-xl shadow-xl hover:border-pink-300 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-pink-500 text-white flex items-center justify-center mb-6 border-2 border-pink-300 font-bold text-2xl shadow-lg shadow-pink-500/30">
              <Gift className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-kids text-pink-300 mb-2">Tarjetas Animadas 3D</h3>
            <p className="text-slate-300 text-xs leading-relaxed font-kids">
              Sobres interactivos con efectos 3D, música alegre de celebración, fotos animadas y mensajes afectuosos.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-xs text-slate-400 font-kids">
        <p>© 2026 Momentum Kids & Magic Platform. Desarrollado con estándares God Mode de Ingeniería.</p>
      </footer>
    </main>
  );
}
