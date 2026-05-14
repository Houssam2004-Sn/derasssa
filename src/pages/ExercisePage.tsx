import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FileCode, Award, CheckCircle2, ChevronDown, ChevronUp, Layers, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExerciseType } from '../types';

export const ExercisePage: React.FC = () => {
  const { exercises, branches } = useApp();
  const [searchParams] = useSearchParams();
  const initialBranch = searchParams.get('branch') || 'ALL';

  const [selectedBranchId, setSelectedBranchId] = useState<string>(initialBranch);
  const [selectedType, setSelectedType] = useState<ExerciseType | 'ALL'>('ALL');
  const [openAnswerId, setOpenAnswerId] = useState<string | null>(null);

  const filteredExercises = exercises.filter((ex) => {
    const matchBranch = selectedBranchId === 'ALL' || ex.branch_id === selectedBranchId;
    const matchType = selectedType === 'ALL' || ex.type === selectedType;
    return matchBranch && matchType;
  });

  const typeBadges: Record<ExerciseType, { label: string; color: string }> = {
    pratique: { label: 'Pratic Exercice', color: 'bg-violet-50 text-violet-700 border-violet-200' },
    efm: { label: 'EFM Contrôle', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    controle: { label: 'Contrôle Continu', color: 'bg-amber-50 text-amber-700 border-amber-200' }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-black text-violet-600 uppercase tracking-wider">
          <FileCode className="w-4 h-4 text-amber-500" />
          <span>Simulateurs et Cas d'Entreprise</span>
        </div>
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
          Exercices Pratiques & EFM
        </h1>
        <p className="text-sm text-zinc-600 max-w-3xl font-medium">
          Consultez les énoncés officiels de travaux pratiques et de préparation à l'Examen de Fin de Module (EFM). Rédigez vos solutions en autonomie avant de dérouler les pistes de correction.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 sm:p-7 rounded-3xl border border-zinc-200 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Type Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-black uppercase text-zinc-500">Type d'évaluation :</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType('ALL')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedType === 'ALL' ? 'bg-zinc-900 text-white shadow-xs' : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                Tous
              </button>
              {(['pratique', 'efm', 'controle'] as ExerciseType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedType === t ? 'bg-violet-600 text-white shadow-xs' : 'bg-zinc-50 text-zinc-600 hover:bg-zinc-100'
                  }`}
                >
                  {typeBadges[t].label}
                </button>
              ))}
            </div>
          </div>

          {/* Branch Filter Selector */}
          <div className="space-y-2 sm:w-80 shrink-0">
            <label className="block text-xs font-black uppercase text-zinc-500">Filière associée :</label>
            <select
              value={selectedBranchId}
              onChange={(e) => setSelectedBranchId(e.target.value)}
              className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden font-bold text-zinc-800 transition-all"
            >
              <option value="ALL">Toutes les filières ({exercises.length})</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.specialization.replace('Option ', '')}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* List */}
      {filteredExercises.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200">
          <p className="text-sm font-medium text-zinc-500">Aucun énoncé ne correspond à vos filtres actuels.</p>
          <button
            onClick={() => { setSelectedType('ALL'); setSelectedBranchId('ALL'); }}
            className="mt-2 text-xs font-bold text-violet-600 hover:underline flex items-center gap-1 mx-auto"
          >
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Réinitialiser les filtres</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredExercises.map((ex) => {
            const branchObj = branches.find(b => b.id === ex.branch_id);
            const modObj = branchObj?.modules.find(m => m.id === ex.module_id);
            const badge = typeBadges[ex.type] || { label: 'Exercice', color: 'bg-zinc-50 text-zinc-700 border-zinc-200' };
            const isOpen = openAnswerId === ex.id;

            return (
              <div key={ex.id} className="bg-white border border-zinc-200/80 rounded-3xl overflow-hidden shadow-xs hover:border-violet-300 transition-all hover:shadow-md">
                <div className="p-6 sm:p-8 space-y-4">
                  
                  {/* Facade header */}
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-black uppercase px-3 py-0.5 rounded-full border ${badge.color}`}>
                          {badge.label}
                        </span>
                        {modObj && (
                          <span className="text-xs text-zinc-500 font-bold">
                            Module {modObj.code} • {modObj.year}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-zinc-900 pt-0.5">
                        {ex.title}
                      </h3>
                      
                      {branchObj && (
                        <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium pt-0.5">
                          <Layers className="w-3.5 h-3.5 text-amber-500" />
                          <span>{branchObj.domain} - {branchObj.specialization}</span>
                        </div>
                      )}
                    </div>

                    <span className="text-[10px] bg-zinc-50 text-zinc-400 font-bold px-2.5 py-1 rounded-md border border-zinc-100">
                      Ref: {ex.id}
                    </span>
                  </div>

                  {/* Content statement area */}
                  <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-100/80 shadow-inner">
                    <h4 className="text-[11px] font-black text-zinc-400 uppercase tracking-wider mb-1.5">Énoncé du sujet :</h4>
                    <p className="text-xs sm:text-sm text-zinc-800 whitespace-pre-wrap font-mono leading-relaxed">
                      {ex.content || 'Consultez la documentation ou le fichier rattaché pour les directives détaillées.'}
                    </p>
                  </div>

                  {/* Action row to toggle custom validation / answer guidelines */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-zinc-100">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          alert(`Solution validée en mémoire locale. Continuez à pratiquer pour exceller à l'OFPPT !`);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-700 font-black text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Marquer comme fait</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setOpenAnswerId(isOpen ? null : ex.id)}
                      className="text-xs font-bold text-zinc-600 hover:text-violet-600 flex items-center gap-1 transition-colors self-end sm:self-auto"
                    >
                      <span>{isOpen ? 'Masquer indices' : 'Voir pistes de solution'}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-violet-600" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Pistes de Solution */}
                  {isOpen && (
                    <div className="mt-4 pt-4 border-t border-dashed border-zinc-200 bg-amber-50/40 p-5 rounded-2xl space-y-2 animate-in fade-in duration-150 border border-amber-100">
                      <div className="flex items-center gap-1.5 text-xs font-black text-amber-900">
                        <Award className="w-4 h-4 text-amber-600" />
                        <span>Guide de Réponse & Critères de Réussite :</span>
                      </div>
                      <ul className="list-disc list-inside text-xs text-zinc-700 space-y-1.5 font-medium leading-relaxed">
                        <li>Identifiez clairement les contraintes posées dans la consigne.</li>
                        <li>Respectez scrupuleusement la nomenclature officielle des modules de l'OFPPT.</li>
                        <li>Testez vos commandes de routage ou vos composants React avant le rendu définitif.</li>
                        <li>En cas de doute, échangez avec vos camarades de filière sur le salon de Chat en direct.</li>
                      </ul>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
