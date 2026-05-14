import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Video, Search, ExternalLink, Play, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const VideosPage: React.FC = () => {
  const { videos, branches } = useApp();
  const [searchParams] = useSearchParams();
  const initialBranch = searchParams.get('branch') || 'ALL';

  const [selectedBranchId, setSelectedBranchId] = useState<string>(initialBranch);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  // Filter videos
  const filteredVideos = videos.filter((v) => {
    const matchBranch = selectedBranchId === 'ALL' || v.branch_id === selectedBranchId;
    const matchSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBranch && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="border-b border-zinc-200/80 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-black text-violet-600 uppercase tracking-wider">
          <Video className="w-4 h-4 text-amber-500" />
          <span>Contenu Audiovisuel Explicatif</span>
        </div>
        <h1 className="text-3xl font-black text-zinc-900 tracking-tight">
          Vidéos Hub OFPPT
        </h1>
        <p className="text-sm text-zinc-600 max-w-3xl font-medium">
          Visionnez des cours pratiques et des résumés de modules sur YouTube, organisés par filière d'études. Utilisez la barre de recherche pour un accès instantané à votre sujet de révision.
        </p>
      </div>

      {/* Top filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-3xl border border-zinc-200 shadow-xs">
        {/* Search Input */}
        <div className="md:col-span-2 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Rechercher une vidéo (ex: OSI, React, Docker, Moteur)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800"
          />
        </div>

        {/* Branch Selector */}
        <div>
          <select
            value={selectedBranchId}
            onChange={(e) => {
              setSelectedBranchId(e.target.value);
              setActiveVideoId(null);
            }}
            className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden font-bold text-zinc-800 transition-all"
          >
            <option value="ALL">Toutes les Filières ({videos.length})</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.domain.split(' ')[0]} - {b.specialization.replace('Option ', '')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active embedded preview area */}
      {activeVideoId && (
        <div className="bg-zinc-950 rounded-3xl overflow-hidden border border-violet-500/30 shadow-2xl animate-in zoom-in-95 duration-150 relative">
          <div className="absolute top-0 right-1/3 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
          {(() => {
            const vid = videos.find(v => v.id === activeVideoId);
            if (!vid) return null;
            const branchObj = branches.find(b => b.id === vid.branch_id);
            const modObj = branchObj?.modules.find(m => m.id === vid.module_id);

            return (
              <div className="p-5 sm:p-8 space-y-4 relative">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
                  <div>
                    <span className="text-[10px] font-black bg-violet-500/10 text-violet-400 border border-violet-500/20 px-2.5 py-0.5 rounded-md uppercase">
                      {modObj ? `${modObj.code} - ${modObj.year}` : 'Général'}
                    </span>
                    <h3 className="text-xl font-black text-white pt-1.5">{vid.title}</h3>
                  </div>
                  <button
                    onClick={() => setActiveVideoId(null)}
                    className="text-xs font-bold text-zinc-400 hover:text-white px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition-colors shrink-0 border border-zinc-800"
                  >
                    Fermer le lecteur
                  </button>
                </div>

                {/* Safe Embedded iframe */}
                <div className="relative w-full aspect-video bg-zinc-900 rounded-2xl overflow-hidden shadow-inner">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${vid.youtube_id}?autoplay=1&rel=0`}
                    title={vid.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  ></iframe>
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-400 pt-1 font-medium">
                  <span>Source: YouTube Officiel</span>
                  <a
                    href={`https://www.youtube.com/watch?v=${vid.youtube_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-amber-400 hover:underline font-bold"
                  >
                    <span>Ouvrir sur YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-zinc-200">
          <p className="text-sm font-medium text-zinc-500">Aucune vidéo ne correspond à votre critère de recherche.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedBranchId('ALL'); }}
            className="mt-2 text-xs font-bold text-violet-600 hover:underline"
          >
            Afficher toutes les vidéos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => {
            const branchObj = branches.find(b => b.id === vid.branch_id);
            const modObj = branchObj?.modules.find(m => m.id === vid.module_id);
            const isPlaying = activeVideoId === vid.id;

            return (
              <div
                key={vid.id}
                className={`bg-white border rounded-3xl overflow-hidden transition-all flex flex-col justify-between group/card ${
                  isPlaying ? 'border-violet-600 ring-2 ring-violet-100 shadow-xl' : 'border-zinc-200 hover:border-violet-300 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  {/* Thumbnail facade */}
                  <div className="relative aspect-video bg-zinc-100 group overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${vid.youtube_id}/hqdefault.jpg`}
                      alt={vid.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-zinc-950/40 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setActiveVideoId(vid.id)}
                        className="w-14 h-14 rounded-full bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center font-bold shadow-lg scale-95 group-hover:scale-105 transition-all"
                        title="Regarder"
                      >
                        <Play className="w-6 h-6 fill-white translate-x-0.5 text-amber-300" />
                      </button>
                    </div>

                    <span className="absolute bottom-3 right-3 text-[10px] bg-zinc-950/80 text-white font-bold px-2.5 py-1 rounded-md backdrop-blur-xs">
                      Tutoriel
                    </span>
                  </div>

                  {/* Details */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-violet-600">
                      <Layers className="w-3 h-3 text-amber-500" />
                      <span className="truncate max-w-[180px]">{branchObj?.specialization || 'Filière Générale'}</span>
                    </div>

                    <h3 className="text-sm font-black text-zinc-900 line-clamp-2 group-hover/card:text-violet-600 transition-colors">
                      {vid.title}
                    </h3>

                    {modObj && (
                      <span className="inline-block text-[10px] font-bold bg-zinc-50 text-zinc-600 px-2.5 py-0.5 rounded-md border border-zinc-100">
                        Module {modObj.code} • {modObj.year}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-5 pt-0 mt-2 border-t border-zinc-50 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setActiveVideoId(vid.id)}
                    className="font-black text-violet-600 hover:text-violet-700 flex items-center gap-1"
                  >
                    <span>{isPlaying ? 'En lecture...' : 'Visionner'}</span>
                  </button>

                  <a
                    href={`https://www.youtube.com/watch?v=${vid.youtube_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-600"
                    title="Ouvrir dans un nouvel onglet"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
