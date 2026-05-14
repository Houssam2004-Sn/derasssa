import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Video, FileText, FileCode, Plus, Trash2, ArrowLeft, CheckCircle2, Lock, Upload, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ExerciseType } from '../types';

export const AdminPage: React.FC = () => {
  const { branches, videos, pdfs, exercises, addVideo, deleteVideo, addPdf, deletePdf, addExercise, deleteExercise } = useApp();
  const navigate = useNavigate();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('derassa_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Tab switcher inside Admin dashboard
  const [activeTab, setActiveTab] = useState<'videos' | 'pdfs' | 'exercises'>('videos');

  // Input States for New Items
  const [vBranchId, setVBranchId] = useState(branches[0]?.id || '');
  const [vModuleId, setVModuleId] = useState('');
  const [vTitle, setVTitle] = useState('');
  const [vYoutubeId, setVYoutubeId] = useState('');

  const [pBranchId, setPBranchId] = useState(branches[0]?.id || '');
  const [pModuleId, setPModuleId] = useState('');
  const [pTitle, setPTitle] = useState('');
  const [pUrl, setPUrl] = useState('');
  const [pdfFile, setPdfFile] = useState<File | undefined>(undefined);

  const [eBranchId, setEBranchId] = useState(branches[0]?.id || '');
  const [eModuleId, setEModuleId] = useState('');
  const [eTitle, setETitle] = useState('');
  const [eType, setEType] = useState<ExerciseType>('pratique');
  const [eContent, setEContent] = useState('');

  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
    if (username === 'admin' && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('derassa_admin_auth', 'true');
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('derassa_admin_auth');
    navigate('/');
  };

  const handleAddVideoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vTitle || !vYoutubeId || !vBranchId) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    let cleanId = vYoutubeId.trim();
    if (cleanId.includes('v=')) {
      cleanId = cleanId.split('v=')[1]?.split('&')[0] || cleanId;
    } else if (cleanId.includes('youtu.be/')) {
      cleanId = cleanId.split('youtu.be/')[1]?.split('?')[0] || cleanId;
    }

    await addVideo({
      branch_id: vBranchId,
      module_id: vModuleId || 'general',
      title: vTitle,
      youtube_id: cleanId
    });

    setVTitle('');
    setVYoutubeId('');
    showFeedback('Succès : Vidéo ajoutée au catalogue Supabase et en mémoire locale !');
  };

  const handleAddPdfSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pTitle || !pBranchId) {
      alert('Veuillez spécifier le titre et la filière.');
      return;
    }

    await addPdf({
      branch_id: pBranchId,
      module_id: pModuleId || 'general',
      title: pTitle,
      file_url: pUrl || 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf'
    }, pdfFile);

    setPTitle('');
    setPUrl('');
    setPdfFile(undefined);
    showFeedback('Succès : Fichier PDF répertorié dans la base !');
  };

  const handleAddExerciseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eTitle || !eBranchId || !eContent) {
      alert('Veuillez fournir le titre, la filière et l\'énoncé du cas pratique.');
      return;
    }

    await addExercise({
      branch_id: eBranchId,
      module_id: eModuleId || 'general',
      title: eTitle,
      type: eType,
      content: eContent
    });

    setETitle('');
    setEContent('');
    showFeedback('Succès : Énoncé d\'entraînement inséré avec succès !');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl border border-zinc-100 relative z-10">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-violet-600 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-600/20 p-0.5">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                <img 
                  src="/logo.png" 
                  alt="Derassa Logo" 
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </div>
            <h2 className="text-2xl font-black text-zinc-900 pt-1">Espace Administration</h2>
            <p className="text-xs text-zinc-500 font-medium">
              Saisissez vos identifiants sécurisés pour configurer le catalogue Supabase.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl text-center border border-rose-200 animate-shake">
              Identifiants incorrects. Accès privé.
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider mb-1.5">
                Nom d'utilisateur
              </label>
              <input
                type="text"
                required
                placeholder="Ex: admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold text-zinc-800 focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider mb-1.5">
                Mot de passe secret
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-bold text-zinc-800 focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-violet-600 hover:bg-violet-700 text-white font-black text-sm rounded-xl transition-all shadow-md shadow-violet-600/20 flex items-center justify-center gap-2 pt-3"
            >
              <Lock className="w-4 h-4 text-amber-300" />
              <span>Connexion Sécurisée</span>
            </button>
          </form>

          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400 font-medium">
            <Link to="/" className="flex items-center gap-1 hover:text-zinc-600 transition-colors">
              <ArrowLeft className="w-3 h-3" />
              <span>Retour au site public</span>
            </Link>
            <span className="text-violet-600 font-bold">OFPPT Portal v2</span>
          </div>

        </div>
      </div>
    );
  }

  const selectedBranchForVideo = branches.find(b => b.id === vBranchId);
  const selectedBranchForPdf = branches.find(b => b.id === pBranchId);
  const selectedBranchForExercise = branches.find(b => b.id === eBranchId);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row">
      
      {/* Sidebar specific to Admin dashboard integrating public/logo.png */}
      <aside className="w-full md:w-64 bg-zinc-950 text-white flex flex-col shrink-0 border-b md:border-b-0 md:border-r border-zinc-800">
        
        {/* Brand & Logo inside Admin panel sidebar */}
        <div className="p-6 border-b border-zinc-800/80 flex items-center gap-3">
          <div className="p-1 bg-gradient-to-br from-violet-600 to-amber-500 rounded-xl">
            <img 
              src="/logo.png" 
              alt="Derassa Admin Logo" 
              className="w-8 h-8 object-contain"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <span className="block font-black text-lg leading-none bg-gradient-to-r from-violet-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              Derassa Admin
            </span>
            <span className="text-[10px] text-zinc-500 font-mono font-bold">SUPABASE CONNECTED</span>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="p-4 flex-1 space-y-1.5">
          <span className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest px-3 mb-2.5">
            Gestion du Catalogue
          </span>

          <button
            onClick={() => setActiveTab('videos')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'videos' ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Video className={`w-4 h-4 shrink-0 ${activeTab === 'videos' ? 'text-amber-300' : ''}`} />
            <span className="flex-1 text-left">Vidéos YouTube</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${activeTab === 'videos' ? 'bg-violet-700 text-white' : 'bg-zinc-900 text-zinc-500'}`}>{videos.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('pdfs')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'pdfs' ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <FileText className={`w-4 h-4 shrink-0 ${activeTab === 'pdfs' ? 'text-amber-300' : ''}`} />
            <span className="flex-1 text-left">Fichiers PDF</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${activeTab === 'pdfs' ? 'bg-violet-700 text-white' : 'bg-zinc-900 text-zinc-500'}`}>{pdfs.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'exercises' ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20' : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <FileCode className={`w-4 h-4 shrink-0 ${activeTab === 'exercises' ? 'text-amber-300' : ''}`} />
            <span className="flex-1 text-left">Pratic & EFM</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${activeTab === 'exercises' ? 'bg-violet-700 text-white' : 'bg-zinc-900 text-zinc-500'}`}>{exercises.length}</span>
          </button>

          <div className="pt-6 px-1">
            <div className="p-3.5 bg-zinc-900/80 rounded-2xl border border-zinc-800 text-[11px] text-zinc-400 space-y-1.5 font-medium">
              <div className="font-bold text-zinc-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Synchronisation Live</span>
              </div>
              <p className="text-[10px] leading-relaxed">Toute modification est synchronisée instantanément avec votre instance Supabase connectée.</p>
            </div>
          </div>
        </div>

        {/* Bottom Panel Info */}
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-zinc-900 hover:bg-zinc-850 text-zinc-300 text-xs font-bold rounded-xl transition-colors border border-zinc-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quitter le Panel</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-center text-[10px] text-zinc-500 hover:text-rose-400 underline font-medium block pt-1"
          >
            Déconnexion de session
          </button>
        </div>

      </aside>

      {/* Main Admin Workspace content */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto space-y-6">
        
        {/* Top ribbon banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs">
          <div>
            <span className="text-xs font-black text-violet-600 tracking-wider uppercase">Tableau de bord administrateur</span>
            <h1 className="text-2xl font-black text-zinc-900 pt-0.5">
              Gestionnaire de Contenu Universel
            </h1>
          </div>

          {feedback && (
            <div className="px-4 py-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{feedback}</span>
            </div>
          )}
        </div>

        {/* Tab 1: Videos Management */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-150">
            
            {/* Form Column */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <Plus className="w-4 h-4 text-violet-600" />
                <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wide">Ajouter une Vidéo</h3>
              </div>

              <form onSubmit={handleAddVideoSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">1. Filière de formation *</label>
                  <select
                    value={vBranchId}
                    onChange={(e) => {
                      setVBranchId(e.target.value);
                      setVModuleId('');
                    }}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800"
                  >
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.domain.split(' ')[0]} - {b.specialization}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">2. Module cible (Optionnel)</label>
                  <select
                    value={vModuleId}
                    onChange={(e) => setVModuleId(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800 font-medium"
                  >
                    <option value="">Tous les modules (Général)</option>
                    {selectedBranchForVideo?.modules.map(m => (
                      <option key={m.id} value={m.id}>[{m.code}] {m.title} ({m.year})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">3. Titre descriptif du cours *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Configuration du routage statique sous Cisco"
                    value={vTitle}
                    onChange={(e) => setVTitle(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">4. Identifiant ou lien YouTube *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: dQw4w9WgXcQ ou lien complet"
                    value={vYoutubeId}
                    onChange={(e) => setVYoutubeId(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-mono focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800"
                  />
                  <span className="block text-[10px] text-zinc-400 mt-1 font-medium">Collez le code de la vidéo après ?v= ou le lien entier.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs rounded-xl transition-all shadow-md shadow-violet-600/20 pt-3"
                >
                  Insérer dans Supabase
                </button>
              </form>
            </div>

            {/* Current Table Items Column */}
            <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-zinc-900 border-b border-zinc-100 pb-3">
                Vidéos Rémunérées en Base ({videos.length})
              </h3>

              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-2">
                {videos.map(v => {
                  const br = branches.find(b => b.id === v.branch_id);
                  return (
                    <div key={v.id} className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-between gap-3 hover:bg-white transition-colors hover:border-zinc-200">
                      <div className="space-y-1 truncate">
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-violet-600">
                          <span>{br?.specialization.replace('Option ', '') || 'Filière externe'}</span>
                        </div>
                        <h4 className="text-xs font-bold text-zinc-900 truncate">{v.title}</h4>
                        <span className="text-[10px] text-zinc-400 font-mono font-medium">ID: {v.youtube_id}</span>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Supprimer la vidéo "${v.title}" de la base ?`)) {
                            deleteVideo(v.id);
                            showFeedback('Vidéo retirée avec succès.');
                          }
                        }}
                        className="p-2.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                        title="Supprimer la ligne"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: PDFs Management */}
        {activeTab === 'pdfs' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-150">
            
            {/* Form Column */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <Plus className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wide">Référencer un PDF</h3>
              </div>

              <form onSubmit={handleAddPdfSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">1. Filière associée *</label>
                  <select
                    value={pBranchId}
                    onChange={(e) => {
                      setPBranchId(e.target.value);
                      setPModuleId('');
                    }}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800"
                  >
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.domain.split(' ')[0]} - {b.specialization}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">2. Module visé</label>
                  <select
                    value={pModuleId}
                    onChange={(e) => setPModuleId(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800 font-medium"
                  >
                    <option value="">Document général / Synthèse</option>
                    {selectedBranchForPdf?.modules.map(m => (
                      <option key={m.id} value={m.id}>[{m.code}] {m.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">3. Titre du document *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Support officiel de Réseaux Locaux"
                    value={pTitle}
                    onChange={(e) => setPTitle(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800 font-medium"
                  />
                </div>

                {/* PDF Storage trigger requested by user */}
                <div className="p-4 bg-violet-50/50 rounded-2xl border border-violet-100 space-y-2">
                  <label className="block text-xs font-black text-violet-900 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-amber-500" />
                    <span>Bucket Supabase "pdfs"</span>
                  </label>
                  
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setPdfFile(file);
                    }}
                    className="w-full text-[11px] text-zinc-600 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-[10px] file:font-black file:bg-violet-600 file:text-white hover:file:bg-violet-700 transition-colors"
                  />
                  <span className="block text-[10px] text-zinc-500 font-medium">
                    Sélectionnez un fichier pour l'envoyer sur le bucket cloud sécurisé.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">OU saisissez une URL externe directe :</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={pUrl}
                    onChange={(e) => setPUrl(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-mono focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs rounded-xl transition-all shadow-md shadow-violet-600/20 pt-3"
                >
                  Ajouter aux ressources
                </button>
              </form>
            </div>

            {/* Current PDFs Column */}
            <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-zinc-900 border-b border-zinc-100 pb-3">
                Documents et Polycopiés Enregistrés ({pdfs.length})
              </h3>

              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-2">
                {pdfs.map(p => {
                  const br = branches.find(b => b.id === p.branch_id);
                  return (
                    <div key={p.id} className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center justify-between gap-3 hover:bg-white transition-colors hover:border-zinc-200">
                      <div className="space-y-1 truncate">
                        <span className="text-[10px] font-black text-amber-600 block">{br?.specialization || 'Général'}</span>
                        <h4 className="text-xs font-bold text-zinc-900 truncate">{p.title}</h4>
                        <a href={p.file_url} target="_blank" rel="noreferrer" className="text-[10px] text-violet-600 hover:underline truncate block font-medium">
                          {p.file_url}
                        </a>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Supprimer le PDF "${p.title}" ?`)) {
                            deletePdf(p.id);
                            showFeedback('PDF supprimé avec succès.');
                          }
                        }}
                        className="p-2.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Exercises Management */}
        {activeTab === 'exercises' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-150">
            
            {/* Form Column */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                <Plus className="w-4 h-4 text-emerald-600" />
                <h3 className="text-sm font-black text-zinc-900 uppercase tracking-wide">Nouvel Énoncé Pratique</h3>
              </div>

              <form onSubmit={handleAddExerciseSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">1. Type d'exercice / EFM *</label>
                  <select
                    value={eType}
                    onChange={(e) => setEType(e.target.value as ExerciseType)}
                    className="w-full p-2.5 bg-violet-50 text-violet-900 border border-violet-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all"
                  >
                    <option value="pratique">Pratic Exercice (TP / Scénario)</option>
                    <option value="efm">EFM Contrôle (Sujet Global d'Examen)</option>
                    <option value="controle">Contrôle Continu (Évaluation)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">2. Filière ciblée *</label>
                  <select
                    value={eBranchId}
                    onChange={(e) => {
                      setEBranchId(e.target.value);
                      setEModuleId('');
                    }}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-bold focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800"
                  >
                    {branches.map(b => (
                      <option key={b.id} value={b.id}>{b.domain.split(' ')[0]} - {b.specialization}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">3. Module associé</label>
                  <select
                    value={eModuleId}
                    onChange={(e) => setEModuleId(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800 font-medium"
                  >
                    <option value="">Examen global inter-modules</option>
                    {selectedBranchForExercise?.modules.map(m => (
                      <option key={m.id} value={m.id}>[{m.code}] {m.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">4. Titre de l'évaluation *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Pratic Exercice : Calcul de sous-réseaux"
                    value={eTitle}
                    onChange={(e) => setETitle(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-zinc-700 mb-1.5">5. Énoncé textuel complet *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Rédigez la consigne, les données fournies et le barème de notation estimé..."
                    value={eContent}
                    onChange={(e) => setEContent(e.target.value)}
                    className="w-full p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs font-mono focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs rounded-xl transition-all shadow-md shadow-violet-600/20 pt-3"
                >
                  Publier l'exercice
                </button>
              </form>
            </div>

            {/* Current Exercises Table */}
            <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-zinc-200 shadow-xs space-y-4">
              <h3 className="text-sm font-black text-zinc-900 border-b border-zinc-100 pb-3">
                Énoncés d'Examen et TP Référencés ({exercises.length})
              </h3>

              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-2">
                {exercises.map(ex => {
                  const br = branches.find(b => b.id === ex.branch_id);
                  const isEfm = ex.type === 'efm';

                  return (
                    <div key={ex.id} className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-start justify-between gap-3 hover:bg-white transition-colors hover:border-zinc-200">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-md ${
                            isEfm ? 'bg-emerald-100 text-emerald-800' : 'bg-violet-100 text-violet-800'
                          }`}>
                            {ex.type === 'efm' ? 'EFM Contrôle' : ex.type === 'pratique' ? 'Pratic Exercice' : 'Contrôle'}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-bold">{br?.specialization || 'Général'}</span>
                        </div>

                        <h4 className="text-xs font-bold text-zinc-900">{ex.title}</h4>
                        <p className="text-[11px] text-zinc-500 line-clamp-2 font-mono bg-white p-2 rounded-xl border border-zinc-100 font-medium">
                          {ex.content}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          if (confirm(`Supprimer l'énoncé "${ex.title}" ?`)) {
                            deleteExercise(ex.id);
                            showFeedback('Exercice effacé du tableau de bord.');
                          }
                        }}
                        className="p-2.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};

export default AdminPage;
