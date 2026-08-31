'use client';

import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Music, Video, HelpCircle, X, Check } from 'lucide-react';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface DayItemData {
  dayNumber?: number;
  title: string;
  content: string;
  mediaUrl: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'TEXT' | 'QUIZ';
  quizData?: QuizQuestion;
}

interface DayItemEditorProps {
  item: DayItemData;
  onChange: (updated: DayItemData) => void;
  onClose?: () => void;
}

export const DayItemEditor: React.FC<DayItemEditorProps> = ({ item, onChange, onClose }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [showQuizEditor, setShowQuizEditor] = useState(item.mediaType === 'QUIZ');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        let detectedType: 'IMAGE' | 'VIDEO' | 'AUDIO' = 'IMAGE';
        if (file.type.startsWith('video/')) detectedType = 'VIDEO';
        else if (file.type.startsWith('audio/')) detectedType = 'AUDIO';

        onChange({
          ...item,
          mediaUrl: data.url,
          mediaType: detectedType,
        });
      }
    } catch (err) {
      console.error('Error uploading file:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleQuizChange = (field: string, value: any) => {
    const currentQuiz = item.quizData || {
      question: '',
      options: ['', '', '', ''],
      correctIndex: 0,
    };

    let updatedQuiz = { ...currentQuiz };
    if (field === 'question') updatedQuiz.question = value;
    else if (field.startsWith('option_')) {
      const idx = parseInt(field.split('_')[1], 10);
      const newOpts = [...updatedQuiz.options];
      newOpts[idx] = value;
      updatedQuiz.options = newOpts;
    } else if (field === 'correctIndex') {
      updatedQuiz.correctIndex = parseInt(value, 10);
    }

    onChange({
      ...item,
      mediaType: 'QUIZ',
      quizData: updatedQuiz,
    });
  };

  return (
    <div className="bg-slate-900/90 border border-white/15 rounded-2xl p-6 text-white space-y-5 backdrop-blur-2xl shadow-2xl relative">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          {item.dayNumber ? `Configurar Día ${item.dayNumber}` : 'Configurar Elemento Revelable'}
        </h3>
        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30 font-medium">
          Día #{item.dayNumber ?? 1}
        </span>
      </div>

      {/* Title */}
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1.5">
          Título de la sorpresa (opcional)
        </label>
        <input
          type="text"
          value={item.title}
          onChange={(e) => onChange({ ...item, title: e.target.value })}
          placeholder="Ej: Un recuerdo especial de nuestro viaje..."
          className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      {/* Secret Message / Note */}
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1.5">
          Mensaje secreto / Carta
        </label>
        <textarea
          rows={3}
          value={item.content}
          onChange={(e) => onChange({ ...item, content: e.target.value })}
          placeholder="Escribe algo especial que se revelará cuando se abra este día..."
          className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
        />
      </div>

      {/* Media Type Selector */}
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-2">
          Tipo de contenido revelable
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { type: 'IMAGE', label: 'Foto / GIF', icon: ImageIcon },
            { type: 'VIDEO', label: 'Video', icon: Video },
            { type: 'AUDIO', label: 'Nota de Voz', icon: Music },
            { type: 'QUIZ', label: 'Mini Trivia', icon: HelpCircle },
          ].map((m) => {
            const Icon = m.icon;
            const isSel = item.mediaType === m.type;
            return (
              <button
                key={m.type}
                type="button"
                onClick={() => {
                  if (m.type === 'QUIZ') {
                    setShowQuizEditor(true);
                    onChange({
                      ...item,
                      mediaType: 'QUIZ',
                      quizData: item.quizData || {
                        question: '¿Recuerdas dónde nos conocimos?',
                        options: ['En el café', 'En la universidad', 'En la playa', 'En una fiesta'],
                        correctIndex: 1,
                      },
                    });
                  } else {
                    setShowQuizEditor(false);
                    onChange({ ...item, mediaType: m.type as any });
                  }
                }}
                className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  isSel
                    ? 'border-indigo-500 bg-indigo-600/20 text-indigo-300 shadow-sm'
                    : 'border-white/10 bg-slate-950/40 text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Media File Upload or URL */}
      {item.mediaType !== 'QUIZ' && item.mediaType !== 'TEXT' && (
        <div className="space-y-3">
          <label className="block text-xs font-medium text-slate-300">
            Adjuntar archivo o pegar URL
          </label>
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <label className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition-colors shadow-lg shadow-indigo-600/20">
              <Upload className="w-4 h-4" />
              {isUploading ? 'Subiendo...' : 'Subir desde dispositivo'}
              <input
                type="file"
                accept="image/*,video/*,audio/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
            <span className="text-slate-500 text-xs font-medium">o</span>
            <input
              type="url"
              value={item.mediaUrl}
              onChange={(e) => onChange({ ...item, mediaUrl: e.target.value })}
              placeholder="https://ejemplo.com/mi-imagen.jpg"
              className="w-full flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {item.mediaUrl && (
            <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-white/10 flex items-center gap-3">
              {item.mediaType === 'IMAGE' && (
                <img
                  src={item.mediaUrl}
                  alt="Vista previa"
                  className="w-12 h-12 rounded-lg object-cover border border-white/10"
                />
              )}
              <div className="flex-1 truncate text-xs text-slate-300">
                <p className="font-semibold text-white">Archivo adjunto listo</p>
                <p className="truncate text-slate-500">{item.mediaUrl}</p>
              </div>
              <button
                type="button"
                onClick={() => onChange({ ...item, mediaUrl: '' })}
                className="text-slate-500 hover:text-red-400 text-xs p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quiz Editor */}
      {showQuizEditor && item.mediaType === 'QUIZ' && (
        <div className="p-4 bg-slate-950/90 rounded-xl border border-indigo-500/30 space-y-3">
          <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
            Editor de Pregunta de Trivia
          </h4>
          <div>
            <label className="block text-xs text-slate-400 mb-1">Pregunta:</label>
            <input
              type="text"
              value={item.quizData?.question || ''}
              onChange={(e) => handleQuizChange('question', e.target.value)}
              placeholder="¿Cuál es nuestro lugar favorito?"
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs text-slate-400">Opciones de respuesta:</label>
            {item.quizData?.options.map((opt, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`correct_${item.dayNumber || 'item'}`}
                  checked={item.quizData?.correctIndex === idx}
                  onChange={() => handleQuizChange('correctIndex', idx)}
                  className="accent-indigo-500"
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => handleQuizChange(`option_${idx}`, e.target.value)}
                  placeholder={`Opción ${idx + 1}`}
                  className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white"
                />
                {item.quizData?.correctIndex === idx && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-medium border border-emerald-500/30">
                    Correcta
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
