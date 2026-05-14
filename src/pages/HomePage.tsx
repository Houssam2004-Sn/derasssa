import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Video, Award, MessageSquare, ArrowRight, CheckCircle2, Sparkles, Layers, FileCode } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FormationLevel } from '../types';

export const HomePage: React.FC = () => {
  const { branches, videos, exercises } = useApp();
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<FormationLevel | 'ALL'>('ALL');

  // Extract unique domains
  const uniqueDomains = Array.from(new Set(branches.map(b => b.domain)));

  const handleDomainClick = (domain: string) => {
    navigate(`/branches?domain=${encodeURIComponent(domain)}`);
  };

  const levelLabels: Record<FormationLevel, string> = {
    TS: 'Technicien Spécialisé',
    T: 'Technicien',
    Q: 'Qualification',
    S: 'Spécialisation'
  };

  return (
    <div className="space-y-16 pb-16 animate-in fade-in duration-300">
      {/* Premium Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-zinc-950 via-violet-950 to-zinc-950 text-white py-20 sm:py-32 rounded-b-[2.5rem] shadow-2xl border-b border-violet-500/20">
        {/* Futuristic glowing backdrops */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-400/20 backdrop-blur-md text-violet-300 text-xs font-black uppercase tracking-widest shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Plateforme Pédagogique Marocaine</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            Maîtrisez vos modules <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-violet-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              OFPPT
            </span> avec excellence
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-medium leading-relaxed">
            Accédez aux résumés de cours par année, regardez des tutoriels vidéo ciblés, résolvez des <strong className="text-white font-bold">Exercices Pratiques</strong> et préparez vos <strong className="text-white font-bold">Examens de Fin de Module (EFM)</strong>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/branches"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-black text-base transition-all duration-150 shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 group"
            >
              <BookOpen className="w-5 h-5 text-amber-300" />
              <span>Explorer les Domaines</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link
              to="/videos"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-900 border border-zinc-800 text-zinc-200 font-bold text-base transition-all duration-150 flex items-center justify-center gap-2 backdrop-blur-xs hover:border-zinc-700"
            >
              <Video className="w-5 h-5 text-violet-400" />
              <span>Vidéos Hub</span>
            </Link>
          </div>

          {/* Premium stats ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto pt-14 border-t border-zinc-800/80">
            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-white">{uniqueDomains.length}</div>
              <div className="text-xs text-zinc-400 font-bold tracking-wide uppercase">Grands Domaines</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-violet-400">{branches.length}</div>
              <div className="text-xs text-zinc-400 font-bold tracking-wide uppercase">Spécialisations</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-amber-400">{videos.length}+</div>
              <div className="text-xs text-zinc-400 font-bold tracking-wide uppercase">Tutoriels YouTube</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-emerald-400">{exercises.length}+</div>
              <div className="text-xs text-zinc-400 font-bold tracking-wide uppercase">EFM & Pratiques</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step Navigation Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            Navigation Simplifiée en 2 Étapes
          </h2>
          <p className="text-sm text-zinc-600 font-medium">
            Sélectionnez votre domaine d'expertise ci-dessous pour découvrir instantanément les spécialisations et leurs modules par année d'études.
          </p>
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedLevel('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedLevel === 'ALL'
                ? 'bg-zinc-900 text-white shadow-xs'
                : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
            }`}
          >
            Tous les niveaux
          </button>
          {(['TS', 'T', 'Q', 'S'] as FormationLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedLevel === level
                  ? 'bg-violet-600 text-white shadow-xs shadow-violet-600/20'
                  : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50'
              }`}
            >
              {levelLabels[level]} ({level})
            </button>
          ))}
        </div>

        {/* Domain Options grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {uniqueDomains.map((domain) => {
            const matchingBranches = branches.filter(b => b.domain === domain && (selectedLevel === 'ALL' || b.level === selectedLevel));
            if (selectedLevel !== 'ALL' && matchingBranches.length === 0) return null;

            const totalModules = matchingBranches.reduce((acc, curr) => acc + curr.modules.length, 0);

            return (
              <button
                key={domain}
                onClick={() => handleDomainClick(domain)}
                className="group relative bg-white border border-zinc-200 hover:border-violet-400 rounded-3xl p-6 text-left shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between h-full"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-violet-50 group-hover:bg-violet-600 text-violet-600 group-hover:text-white transition-colors flex items-center justify-center font-bold">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-zinc-900 group-hover:text-violet-600 transition-colors">
                      {domain}
                    </h3>
                    <p className="text-xs text-zinc-500 pt-1 line-clamp-2 font-medium">
                      Spécialisations professionnelles et modules d'apprentissage dédiés.
                    </p>
                  </div>

                  {/* Badges for active branches */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {matchingBranches.map((b) => (
                      <span key={b.id} className="inline-block text-[10px] bg-zinc-100 text-zinc-700 px-2.5 py-0.5 rounded-md font-bold">
                        {b.specialization.replace('Option ', '')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-violet-600">
                  <span className="text-zinc-400 font-medium">
                    {matchingBranches.length} filière{matchingBranches.length > 1 ? 's' : ''} • {totalModules} modules
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-150 text-amber-600 font-extrabold">
                    Dérouler
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Highlights - Practical exercises & EFM section */}
      <div className="bg-white border-y border-zinc-200/80 py-16 relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-black text-violet-600 uppercase tracking-widest bg-violet-50 px-3.5 py-1 rounded-full">
              Entraînement Approfondi
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
              Exercices Pratiques & Examens EFM
            </h2>
            <p className="text-sm text-zinc-600 font-medium">
              Consolidez votre savoir-faire technique avec de vrais énoncés d'examen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 space-y-4 hover:border-violet-300 transition-colors">
              <div className="flex items-center gap-2 text-violet-600 font-black text-base">
                <FileCode className="w-5 h-5 text-amber-500" />
                <span>Pratic Exercices</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                Des scénarios de cas concrets (calcul de sous-réseaux, création d'APIs, schémas électriques) pour assimiler la logique de chaque module.
              </p>
              <Link to="/exercises" className="inline-block text-xs font-bold text-violet-600 hover:underline">
                Voir les énoncés pratiques →
              </Link>
            </div>

            <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 space-y-4 hover:border-emerald-300 transition-colors">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-base">
                <Award className="w-5 h-5 text-emerald-500" />
                <span>EFM Contrôles</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                Préparez les évaluations globales de fin de cycle (Examen de Fin de Module) avec des sujets synthétiques minutés et complets.
              </p>
              <Link to="/exercises" className="inline-block text-xs font-bold text-emerald-600 hover:underline">
                S'exercer aux EFM →
              </Link>
            </div>

            <div className="bg-zinc-50 border border-zinc-200/80 rounded-3xl p-6 space-y-4 hover:border-amber-300 transition-colors">
              <div className="flex items-center gap-2 text-amber-600 font-black text-base">
                <MessageSquare className="w-5 h-5 text-violet-500" />
                <span>Entraide Interactive</span>
              </div>
              <p className="text-xs text-zinc-600 leading-relaxed font-medium">
                Rejoignez les salons de discussion par spécialisation pour poser vos questions, débloquer vos erreurs et partager vos solutions de TP.
              </p>
              <Link to="/chat" className="inline-block text-xs font-bold text-amber-600 hover:underline">
                Accéder au chat en direct →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick shortcut to Videos Hub preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-violet-950 via-purple-900 to-zinc-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden border border-violet-500/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-3 max-w-xl text-center md:text-left relative">
            <h3 className="text-2xl font-black tracking-tight">
              Besoin d'une explication en vidéo ?
            </h3>
            <p className="text-zinc-300 text-sm font-medium">
              Découvrez notre <strong className="text-amber-300 font-bold">Vidéos Hub</strong> recensant des dizaines de cours expliqués sur YouTube, filtrés par spécialisation et module.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 text-xs text-zinc-300 font-medium">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Sans publicité gênante</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-amber-400" /> Trié par module officiel</span>
            </div>
          </div>
          <Link
            to="/videos"
            className="px-6 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-sm rounded-xl transition-all text-center shrink-0 shadow-lg shadow-amber-500/20 relative"
          >
            Lancer le Vidéos Hub
          </Link>
        </div>
      </div>
    </div>
  );
};
