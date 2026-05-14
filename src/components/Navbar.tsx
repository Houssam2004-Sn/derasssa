import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Video, FileCheck, Award, MessageSquare, Menu, X, User, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { currentUser, setCurrentUser, branches } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(() => !currentUser.isRegistered);
  const [modalLevel, setModalLevel] = useState<string>(currentUser.level || 'TS');

  // Trigger modal when user lands for first time if incomplete profile
  useEffect(() => {
    if (!currentUser.isRegistered) {
      setShowProfileModal(true);
    }
  }, [currentUser.isRegistered]);

  // If Admin panel is active via distinct route, we can hide standard navbar or provide access links
  const isAdminRoute = location.pathname.includes('/admin');

  if (isAdminRoute) {
    return null; // Admin interface uses its own sidebar dashboard layout
  }

  const navLinks = [
    { name: 'Filières', path: '/branches', icon: BookOpen },
    { name: 'Vidéos Hub', path: '/videos', icon: Video },
    { name: 'Exercices', path: '/exercises', icon: FileCheck },
    { name: 'Certificats', path: '/certificates', icon: Award },
    { name: 'Chat en direct', path: '/chat', icon: MessageSquare },
  ];

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const level = formData.get('level') as string;
    const branch_id = formData.get('branch_id') as string;
    if (name) {
      setCurrentUser({ ...currentUser, name, email, level, branch_id, isRegistered: true });
      setShowProfileModal(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo from public/logo.png - Top Left */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative p-1 bg-gradient-to-br from-violet-100 to-amber-100 rounded-xl transition-transform group-hover:scale-105 duration-200">
                <img 
                  src="/logo.png" 
                  alt="Derassa Logo" 
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain" 
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-violet-700 via-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Derassa
                </span>
                <span className="text-[11px] text-zinc-500 font-bold tracking-wide flex items-center gap-1 pt-1">
                  دراسة <span className="inline-block w-1 h-1 rounded-full bg-amber-400"></span> OFPPT
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all duration-150 ${
                      isActive
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-600/20'
                        : 'text-zinc-600 hover:text-violet-600 hover:bg-violet-50/80'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-zinc-400'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right side buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Profile Config */}
              <button
                onClick={() => setShowProfileModal(true)}
                className="flex items-center gap-2 text-left pl-2 pr-3 py-1.5 rounded-full border border-zinc-200 hover:border-violet-300 transition-colors bg-zinc-50 hover:bg-white"
                title="Modifier profil stagiaire"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 text-white flex items-center justify-center text-xs font-black shadow-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xs font-bold text-zinc-800 max-w-[100px] truncate">{currentUser.name}</span>
                  <span className="text-[10px] text-violet-600 font-semibold">Niveau {currentUser.level}</span>
                </div>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setShowProfileModal(true)}
                className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold"
              >
                {currentUser.name.charAt(0)}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 focus:outline-hidden"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-100 bg-white px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold ${
                    isActive
                      ? 'bg-violet-600 text-white'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-amber-300' : 'text-zinc-400'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div className="pt-2 mt-2 border-t border-zinc-100 flex items-center justify-between">
              <div className="text-xs text-zinc-500">Stagiaire : <strong className="text-zinc-800">{currentUser.name}</strong></div>
            </div>
          </div>
        )}
      </header>

      {/* User Profile Config Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/70 backdrop-blur-sm p-4 transition-all animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-100 relative animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-zinc-900">
                  {currentUser.isRegistered ? 'Profil du Stagiaire' : 'Créer un compte'}
                </h3>
                <p className="text-xs text-zinc-500">
                  {currentUser.isRegistered ? 'Modifiez vos informations à tout moment' : 'Configurez vos informations d\'études de base'}
                </p>
              </div>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-3">
              <div>
                <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider mb-1">
                  Nom Complet *
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={currentUser.name}
                  required
                  placeholder="Ex: Ahmed Alami"
                  className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden text-xs font-bold text-zinc-800 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider mb-1">
                  Email OFPPT ou Personnel *
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={currentUser.email || ''}
                  required
                  placeholder="Ex: nom.prenom@ofppt-edu.ma"
                  className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden text-xs font-bold text-zinc-800 transition-all"
                />
                <span className="block text-[9px] text-zinc-400 pt-0.5">Adresse institutionnelle ou compte personnel valide.</span>
              </div>

              <div>
                <label className="block text-xs font-black text-zinc-700 uppercase tracking-wider mb-1">
                  Niveau d'Étude Cible *
                </label>
                <select
                  name="level"
                  value={modalLevel}
                  onChange={(e) => setModalLevel(e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden text-xs font-bold text-zinc-800 transition-all"
                >
                  <option value="TS">Technicien Spécialisé (TS)</option>
                  <option value="T">Technicien (T)</option>
                  <option value="Q">Qualification (Q)</option>
                  <option value="S">Spécialisation (S)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-violet-700 uppercase tracking-wider mb-1">
                  Filière Associée (Niveau {modalLevel}) *
                </label>
                <select
                  name="branch_id"
                  defaultValue={currentUser.branch_id || ''}
                  className="w-full px-3 py-2 bg-violet-50/50 border border-violet-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden text-xs font-bold text-violet-900 transition-all"
                >
                  {branches.filter(b => b.level === modalLevel).map(b => (
                    <option key={b.id} value={b.id}>
                      {b.domain.split(' ')[0]} — {b.specialization.replace('Option ', '')}
                    </option>
                  ))}
                </select>
                <span className="block text-[9px] text-zinc-400 pt-0.5">La liste s'adapte dynamiquement au niveau d'étude sélectionné.</span>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-zinc-100">
                {currentUser.isRegistered && (
                  <button
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="px-4 py-2 text-xs font-bold text-zinc-600 hover:bg-zinc-100 rounded-xl transition-colors"
                  >
                    Annuler
                  </button>
                )}
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-black bg-violet-600 text-white hover:bg-violet-700 rounded-xl transition-all shadow-md shadow-violet-600/20 flex items-center gap-1.5 ml-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
                  <span>{currentUser.isRegistered ? 'Enregistrer les modifications' : 'Créer mon compte'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
