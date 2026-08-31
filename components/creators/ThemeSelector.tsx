'use client';

import React from 'react';
import { Sparkles, Heart, Gift, PartyPopper, Rocket } from 'lucide-react';

export type ThemeType = 'minimalist' | 'festive' | 'romantic' | 'party' | 'kids';

interface ThemeOption {
  id: ThemeType;
  name: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  borderAccent: string;
  bgPreview: string;
  previewImage?: string;
}

export const THEMES: ThemeOption[] = [
  {
    id: 'minimalist',
    name: 'Minimalista Elegante',
    description: 'Estilo limpio, tipografía sofisticada y colores neutros.',
    icon: Sparkles,
    gradient: 'from-slate-900 to-indigo-950',
    borderAccent: 'border-indigo-500',
    bgPreview: 'bg-slate-900 text-indigo-400',
  },
  {
    id: 'festive',
    name: 'Festivo & Navideño',
    description: 'Tonos dorados, rojo carmesí y verde esmeralda con calidez.',
    icon: Gift,
    gradient: 'from-red-950 via-slate-900 to-emerald-950',
    borderAccent: 'border-amber-400',
    bgPreview: 'bg-red-900 text-amber-300',
  },
  {
    id: 'romantic',
    name: 'Romántico & Amor',
    description: 'Tonos rosas, rosa pastel y detalles delicados.',
    icon: Heart,
    gradient: 'from-rose-950 via-slate-900 to-pink-950',
    borderAccent: 'border-rose-400',
    bgPreview: 'bg-rose-950 text-rose-300',
  },
  {
    id: 'party',
    name: 'Cumpleaños & Fiesta',
    description: 'Vibrante, divertido, tonos neón púrpura y magenta.',
    icon: PartyPopper,
    gradient: 'from-purple-950 via-slate-900 to-pink-950',
    borderAccent: 'border-purple-400',
    bgPreview: 'bg-purple-900 text-pink-300',
  },
  {
    id: 'kids',
    name: 'Mundo Mágico & Niños 🎈',
    description: 'Aventura infantil, globos 3D, superhéroes, estrellas y stickers divertidos.',
    icon: Rocket,
    gradient: 'from-amber-400 via-pink-500 to-cyan-400',
    borderAccent: 'border-yellow-300',
    bgPreview: 'bg-yellow-400 text-slate-950 font-bold',
    previewImage: '/images/kids_party_balloons.jpg',
  },
];

interface ThemeSelectorProps {
  selectedTheme: ThemeType;
  onSelectTheme: (theme: ThemeType) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedTheme,
  onSelectTheme,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {THEMES.map((theme) => {
        const Icon = theme.icon;
        const isSelected = selectedTheme === theme.id;

        return (
          <button
            key={theme.id}
            type="button"
            onClick={() => onSelectTheme(theme.id)}
            className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-300 backdrop-blur-xl ${
              isSelected
                ? `${theme.borderAccent} bg-white/10 shadow-lg shadow-indigo-500/20 scale-[1.02]`
                : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-xl ${theme.bgPreview} shadow-inner flex items-center justify-center`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white text-lg">{theme.name}</h4>
                  {isSelected && (
                    <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-500/40">
                      Seleccionado
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                  {theme.description}
                </p>
                {theme.previewImage && (
                  <div className="mt-3 rounded-xl overflow-hidden border-2 border-yellow-300 shadow-md">
                    <img src={theme.previewImage} alt={theme.name} className="w-full h-24 object-cover" />
                  </div>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};
