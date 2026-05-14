import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BookOpen, ChevronDown, Video, FileText, FileCode, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FormationLevel } from '../types';

export const BranchesPage: React.FC = () => {
  const { branches, videos, pdfs, exercises } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // URL Domain Pre-filter
  const initialDomain = searchParams.get('domain') || 'ALL';
  const [selectedDomain, setSelectedDomain] = useState<string>(initialDomain);
  const [selectedLevel, setSelectedLevel] = useState<FormationLevel | 'ALL'>('ALL');
  
  // Drill-down State 1: Tracks currently open parent Filière (Domain)
  const [expandedDomain, setExpandedDomain] = useState<string | null>(null);
  
  // Drill-down State 2: Tracks currently selected Option (Specialization) inside an open Filière
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);

  // Sync initial searchParams state
  useEffect(() => {
    const domainParam = searchParams.get('domain');
    if (domainParam && domainParam !== 'ALL') {
      setSelectedDomain(domainParam);
      setExpandedDomain(domainParam);
      // Automatically pre-select first sub-option of this parent filière
      const match = branches.find(b => b.domain === domainParam);
      if (match) setSelectedBranchId(match.id);
    }
  }, [searchParams, branches]);

  // Extract distinct parent Filières (Domains)
  const uniqueDomains = Array.from(new Set(branches.map(b => b.domain)));
  const allDomainOptions = ['ALL', ...uniqueDomains];

  const handleDomainFilterChange = (domain: string) => {
    setSelectedDomain(domain);
    if (domain === 'ALL') {
      searchParams.delete('domain');
      setExpandedDomain(null);
    } else {
      searchParams.set('domain', domain);
      setExpandedDomain(domain);
      // Auto open first option
      const match = branches.find(b => b.domain === domain);
      if (match) setSelectedBranchId(match.id);
    }
    setSearchParams(searchParams);
  };

  const toggleDomainPanel = (domain: string) => {
    const nextState = expandedDomain === domain ? null : domain;
    setExpandedDomain(nextState);
    if (nextState) {
      // Pre-select first specialization tab inside this domain
      const match = branches.find(b => b.domain === domain && (selectedLevel === 'ALL' || b.level === selectedLevel));
      if (match) setSelectedBranchId(match.id);
    }
  };

  const levelBadges: Record<FormationLevel, { label: string; color: string }> = {
    TS: { label: 'TS', color: 'bg-violet-50 text-violet-700 border-violet-200' },
    T: { label: 'T', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    Q: { label: 'Q', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    S: { label: 'S', color: 'bg-rose-50 text-rose-700 border-rose-200' }
  };

  // Filter parent domains based on level and selected filters
  const filteredDomainsToRender = uniqueDomains.filter(domain => {
    if (selectedDomain !== 'ALL' && domain !== selectedDomain) return false;
    // Check if this domain contains any branches matching the active Level
    const hasActiveLevels = branches.some(b => b.domain === domain && (selectedLevel === 'ALL' || b.level === selectedLevel));
    return hasActiveLevels;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Page Header */}
      <div className="border-b border-zinc-200/80 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-black text-violet-600 uppercase tracking-wider">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span>Catalogue National des Filières</span>
        </div>
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
          Filières & Options OFPPT
        </h1>
        <p className="text-sm text-zinc-600 max-w-3xl font-medium">
          Découvrez la hiérarchie en double niveau. Cliquez sur une <strong className="text-violet-600 font-bold">Filière principale</strong> pour dérouler ses différentes options de spécialisation et consulter les modules associés.
        </p>
      </div>

      {/* Top Filter Controls */}
      <div className="bg-white border border-zinc-200 rounded-3xl p-5 sm:p-7 space-y-5 shadow-xs">
        <div>
          <label className="block text-xs font-black uppercase text-zinc-500 tracking-wider mb-2.5">
            Filtrer par Filière Principale
          </label>
          <div className="flex flex-wrap gap-2">
            {allDomainOptions.map((domain) => (
              <button
                key={domain}
                onClick={() => handleDomainFilterChange(domain)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedDomain === domain
                    ? 'bg-zinc-900 text-white shadow-md shadow-zinc-900/10'
                    : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                }`}
              >
                {domain === 'ALL' ? 'Toutes les Filières' : domain}
              </button>
            ))}
          </div>
        </div>

        {/* Level Filter Selector */}
        <div className="pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase text-zinc-500">Niveau de Qualification :</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setSelectedLevel('ALL')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedLevel === 'ALL' ? 'bg-violet-600 text-white shadow-xs' : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                Tous
              </button>
              {(['TS', 'T', 'Q', 'S'] as FormationLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedLevel === lvl ? 'bg-violet-600 text-white shadow-xs' : 'text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  {lvl === 'TS' ? 'Technicien Spécialisé' : lvl === 'T' ? 'Technicien' : lvl === 'Q' ? 'Qualification' : 'Spécialisation'} ({lvl})
                </button>
              ))}
            </div>
          </div>

          <div className="text-xs font-bold text-zinc-500">
            Résultat : <strong className="text-violet-600 font-black">{filteredDomainsToRender.length}</strong> filière(s) principale(s)
          </div>
        </div>
      </div>

      {/* Main Double-Level Accordion View */}
      <div className="space-y-4">
        {filteredDomainsToRender.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-zinc-300">
            <p className="text-sm font-medium text-zinc-500">Aucune filière ne correspond à vos critères.</p>
            <button
              onClick={() => { setSelectedDomain('ALL'); setSelectedLevel('ALL'); setExpandedDomain(null); }}
              className="mt-2 text-xs font-bold text-violet-600 hover:underline flex items-center gap-1 mx-auto"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Réinitialiser les filtres</span>
            </button>
          </div>
        ) : (
          filteredDomainsToRender.map((domainTitle) => {
            const isDomainOpen = expandedDomain === domainTitle;
            
            // Gather all options (specializations) belonging to this parent filière
            const childBranches = branches.filter(b => b.domain === domainTitle && (selectedLevel === 'ALL' || b.level === selectedLevel));
            
            // Calculate total aggregate assets
            const dModulesCount = childBranches.reduce((sum, b) => sum + b.modules.length, 0);
            const dVideosCount = childBranches.reduce((sum, b) => sum + videos.filter(v => v.branch_id === b.id).length, 0);
            const dPdfsCount = childBranches.reduce((sum, b) => sum + pdfs.filter(p => p.branch_id === b.id).length, 0);
            const dExercisesCount = childBranches.reduce((sum, b) => sum + exercises.filter(e => e.branch_id === b.id).length, 0);

            // Active Specialization Option Object inside this panel
            const activeChildBranch = childBranches.find(b => b.id === selectedBranchId) || childBranches[0];

            return (
              <div 
                key={domainTitle} 
                className={`bg-white border rounded-3xl transition-all duration-200 overflow-hidden ${
                  isDomainOpen 
                    ? 'border-violet-600 shadow-xl ring-1 ring-violet-100' 
                    : 'border-zinc-200 hover:border-violet-300 shadow-xs'
                }`}
              >
                {/* Outer Accordion Trigger: Main Filière Banner */}
                <button
                  onClick={() => toggleDomainPanel(domainTitle)}
                  className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 focus:outline-hidden group"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold group-hover:bg-violet-600 group-hover:text-white transition-colors">
                        <Layers className="w-4 h-4 text-amber-500" />
                      </div>
                      <span className="text-xs font-black text-violet-600 tracking-wider uppercase">Filière Parent</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-zinc-900 leading-tight group-hover:text-violet-700 transition-colors">
                      {domainTitle}
                    </h3>

                    {/* Levels badge ribbon available inside this parent filière */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                      <span className="text-[11px] text-zinc-400 font-medium">Niveaux inclus :</span>
                      {Array.from(new Set(childBranches.map(b => b.level))).map(lvl => (
                        <span key={lvl} className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${levelBadges[lvl]?.color || 'bg-zinc-100'}`}>
                          {lvl === 'TS' ? 'Technicien Spécialisé' : lvl === 'T' ? 'Technicien' : lvl === 'Q' ? 'Qualif' : 'Spécialisation'}
                        </span>
                      ))}
                      <span className="text-xs text-zinc-300 font-bold ml-1">•</span>
                      <span className="text-xs font-bold text-zinc-500">{childBranches.length} Option(s)</span>
                    </div>
                  </div>

                  {/* Right summary counters */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-zinc-100 shrink-0">
                    <div className="flex items-center gap-3 text-xs font-bold text-zinc-500 bg-zinc-50 px-3.5 py-2 rounded-2xl border border-zinc-100">
                      <span title="Modules inclus" className="text-zinc-600 font-extrabold">{dModulesCount} modules</span>
                      <span className="text-zinc-300">|</span>
                      <span title="Vidéos disponibles" className="flex items-center gap-1">
                        <Video className="w-3.5 h-3.5 text-violet-500" />
                        {dVideosCount}
                      </span>
                      <span title="Supports PDF" className="flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-amber-500" />
                        {dPdfsCount}
                      </span>
                      <span title="Exercices & EFM" className="flex items-center gap-1">
                        <FileCode className="w-3.5 h-3.5 text-emerald-500" />
                        {dExercisesCount}
                      </span>
                    </div>

                    <div className={`p-2.5 rounded-xl transition-all ${isDomainOpen ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20 rotate-180' : 'bg-zinc-50 text-zinc-400 group-hover:bg-violet-50 group-hover:text-violet-600'}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </div>
                </button>

                {/* Expanded State: Reveals Inner Options (Specializations) tab selector and active module list */}
                {isDomainOpen && (
                  <div className="border-t border-zinc-200 bg-zinc-50/60 p-6 sm:p-8 space-y-6 animate-in fade-in duration-150">
                    
                    {/* Inner Options Tabs Selector */}
                    <div className="space-y-2">
                      <label className="block text-xs font-black uppercase text-zinc-500 tracking-wider">
                        Sélectionnez l'Option de Spécialisation :
                      </label>
                      
                      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border border-zinc-200/80 shadow-inner">
                        {childBranches.map((childOption) => {
                          const isActiveTab = activeChildBranch?.id === childOption.id;
                          return (
                            <button
                              key={childOption.id}
                              onClick={() => setSelectedBranchId(childOption.id)}
                              className={`flex-1 min-w-[200px] text-left p-3 rounded-xl transition-all flex flex-col justify-between border ${
                                isActiveTab 
                                  ? 'bg-violet-600 text-white font-bold border-violet-600 shadow-md shadow-violet-600/20' 
                                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-transparent font-medium'
                              }`}
                            >
                              <div className="space-y-0.5">
                                <span className={`inline-block text-[9px] font-black uppercase px-2 py-0.2 rounded-md ${isActiveTab ? 'bg-violet-700 text-amber-300' : 'bg-zinc-200 text-zinc-600'}`}>
                                  Niveau {childOption.level}
                                </span>
                                <span className="block text-xs sm:text-sm font-bold truncate">
                                  {childOption.specialization}
                                </span>
                              </div>
                              <span className={`text-[10px] block pt-1 ${isActiveTab ? 'text-violet-200 font-normal' : 'text-zinc-400'}`}>
                                {childOption.modules.length} modules rattachés
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Active Option Context Content view */}
                    {activeChildBranch && (
                      <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-xs space-y-6 animate-in fade-in duration-150">
                        
                        {/* Option description header banner */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
                          <div className="space-y-1 max-w-2xl">
                            <span className="text-xs font-black text-violet-600 uppercase tracking-wide block">
                              Option : {activeChildBranch.specialization}
                            </span>
                            <p className="text-xs text-zinc-600 font-medium leading-relaxed">
                              {activeChildBranch.description}
                            </p>
                          </div>

                          {/* Action Hub ribbon shortcuts for this specific option */}
                          <div className="flex flex-wrap gap-2 shrink-0">
                            <Link
                              to={`/videos?branch=${activeChildBranch.id}`}
                              className="px-3 py-1.5 rounded-xl bg-violet-50 text-violet-700 hover:bg-violet-100 text-[11px] font-bold transition-all flex items-center gap-1.5"
                            >
                              <Video className="w-3 h-3" />
                              <span>Vidéos</span>
                            </Link>
                            
                            <Link
                              to={`/exercises?branch=${activeChildBranch.id}`}
                              className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[11px] font-bold transition-all flex items-center gap-1.5"
                            >
                              <FileCode className="w-3 h-3" />
                              <span>Sujets EFM</span>
                            </Link>

                            <Link
                              to={`/certificates?branch=${activeChildBranch.id}`}
                              className="px-3 py-1.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 text-[11px] font-bold transition-all flex items-center gap-1.5 shadow-xs"
                            >
                              <CheckCircle2 className="w-3 h-3 text-amber-300" />
                              <span>Certificat</span>
                            </Link>
                          </div>
                        </div>

                        {/* Grouped Modules breakdown inside this specific Option */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                          
                          {/* 1ère année */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-zinc-200">
                              <span className="w-2.5 h-2.5 rounded-full bg-violet-600"></span>
                              <h4 className="text-xs font-black text-zinc-900 uppercase tracking-wider">
                                Modules 1ère année
                              </h4>
                              <span className="ml-auto text-[10px] bg-violet-50 text-violet-700 font-extrabold px-2 py-0.5 rounded-md">
                                {activeChildBranch.modules.filter(m => m.year === '1ère année').length}
                              </span>
                            </div>

                            {activeChildBranch.modules.filter(m => m.year === '1ère année').length === 0 ? (
                              <p className="text-xs text-zinc-400 italic font-medium">Aucun module pour cette année.</p>
                            ) : (
                              <div className="space-y-2">
                                {activeChildBranch.modules.filter(m => m.year === '1ère année').map((mod) => {
                                  const mPdfs = pdfs.filter(p => p.module_id === mod.id).length;
                                  const mVideos = videos.filter(v => v.module_id === mod.id).length;
                                  const mExes = exercises.filter(e => e.module_id === mod.id).length;

                                  return (
                                    <div key={mod.id} className="p-3 bg-zinc-50/80 rounded-xl border border-zinc-200/60 hover:border-violet-300 transition-colors flex items-center justify-between gap-2">
                                      <div className="space-y-1 pr-2">
                                        <span className="inline-block text-[9px] font-black text-violet-600 bg-violet-50 px-2 py-0.2 rounded-md">
                                          {mod.code}
                                        </span>
                                        <p className="text-xs font-bold text-zinc-800 leading-tight">
                                          {mod.title}
                                        </p>
                                      </div>

                                      <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold shrink-0">
                                        {mVideos > 0 && <span className="bg-violet-50 text-violet-700 px-1.5 py-0.5 rounded-md" title="Vidéos">🎥 {mVideos}</span>}
                                        {mPdfs > 0 && <span className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md" title="PDFs">📄 {mPdfs}</span>}
                                        {mExes > 0 && <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md" title="Exercices">⚙️ {mExes}</span>}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* 2ème année */}
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 pb-2 border-b border-zinc-200">
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                              <h4 className="text-xs font-black text-zinc-900 uppercase tracking-wider">
                                Modules 2ème année
                              </h4>
                              <span className="ml-auto text-[10px] bg-amber-50 text-amber-700 font-extrabold px-2 py-0.5 rounded-md">
                                {activeChildBranch.modules.filter(m => m.year === '2ème année').length}
                              </span>
                            </div>

                            {activeChildBranch.modules.filter(m => m.year === '2ème année').length === 0 ? (
                              <p className="text-xs text-zinc-400 italic font-medium">Aucun module spécifié en 2ème année.</p>
                            ) : (
                              <div className="space-y-2">
                                {activeChildBranch.modules.filter(m => m.year === '2ème année').map((mod) => {
                                  const mPdfs = pdfs.filter(p => p.module_id === mod.id).length;
                                  const mVideos = videos.filter(v => v.module_id === mod.id).length;
                                  const mExes = exercises.filter(e => e.module_id === mod.id).length;

                                  return (
                                    <div key={mod.id} className="p-3 bg-zinc-50/80 rounded-xl border border-zinc-200/60 hover:border-amber-300 transition-colors flex items-center justify-between gap-2">
                                      <div className="space-y-1 pr-2">
                                        <span className="inline-block text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.2 rounded-md">
                                          {mod.code}
                                        </span>
                                        <p className="text-xs font-bold text-zinc-800 leading-tight">
                                          {mod.title}
                                        </p>
                                      </div>

                                      <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold shrink-0">
                                        {mVideos > 0 && <span className="bg-violet-50 text-violet-700 px-1.5 py-0.5 rounded-md" title="Vidéos">🎥 {mVideos}</span>}
                                        {mPdfs > 0 && <span className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md" title="PDFs">📄 {mPdfs}</span>}
                                        {mExes > 0 && <span className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-md" title="Exercices">⚙️ {mExes}</span>}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                        </div>

                      </div>
                    )}

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
