'use client';

import React, { useEffect, useState } from 'react';
import { AdventGrid } from '@/components/viewer/AdventGrid';
import { TimeCapsuleView } from '@/components/viewer/TimeCapsuleView';
import { GreetingCardView } from '@/components/viewer/GreetingCardView';
import { Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface ViewerPageProps {
  params: {
    token: string;
  };
}

export default function ExperienceViewerPage({ params }: ViewerPageProps) {
  const { token } = params;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExperience = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/experiences/${token}`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'No se pudo cargar la experiencia');
      }
      const exp = await res.json();
      setData(exp);
    } catch (err: any) {
      setError(err.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchExperience();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 text-sm font-medium animate-pulse">
          Desbloqueando experiencia digital...
        </p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-white text-center">
        <div className="p-4 bg-rose-500/20 text-rose-400 border border-rose-500/40 rounded-full mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-heading mb-2">Enlace no encontrado o expirado</h2>
        <p className="text-slate-400 text-sm max-w-md mb-6">{error}</p>
        <button
          onClick={fetchExperience}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-semibold flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Reintentar
        </button>
      </div>
    );
  }

  // Theme styling wrappers
  let themeBg = 'bg-slate-950';
  if (data.theme === 'festive') {
    themeBg = 'bg-gradient-to-br from-slate-950 via-red-950 to-slate-950';
  } else if (data.theme === 'romantic') {
    themeBg = 'bg-gradient-to-br from-slate-950 via-rose-950 to-slate-950';
  } else if (data.theme === 'party') {
    themeBg = 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950';
  }

  return (
    <main className={`min-h-screen ${themeBg} text-white transition-colors duration-500`}>
      {data.type === 'ADVENT' && (
        <AdventGrid
          title={data.title}
          senderName={data.senderName}
          recipientName={data.recipientName}
          theme={data.theme}
          items={data.items}
        />
      )}

      {data.type === 'TIME_CAPSULE' && (
        <TimeCapsuleView
          title={data.title}
          senderName={data.senderName}
          recipientName={data.recipientName}
          targetDate={data.targetDate}
          isLocked={data.isLocked}
          items={data.items}
        />
      )}

      {data.type === 'GREETING_CARD' && (
        <GreetingCardView
          title={data.title}
          senderName={data.senderName}
          recipientName={data.recipientName}
          theme={data.theme}
          items={data.items}
        />
      )}
    </main>
  );
}
