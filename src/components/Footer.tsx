import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.includes('/admin');

  // Secure sequence counter state for invisible admin entry dot
  const [, setClickCount] = useState(0);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleSecretDotClick = () => {
    // Clear previous timer
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    setClickCount(prev => {
      const nextCount = prev + 1;
      if (nextCount >= 5) {
        navigate('/admin');
        return 0;
      }
      return nextCount;
    });

    // Reset sequence if no subsequent clicks occur within 3 seconds
    resetTimerRef.current = setTimeout(() => {
      setClickCount(0);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  if (isAdminRoute) return null;

  return (
    <footer className="bg-white border-t border-zinc-200/80 mt-20 relative overflow-hidden">
      {/* Absolute visual subtle ribbon */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 via-amber-500 to-emerald-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Logo and Summary */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 inline-block">
              <div className="p-1 bg-gradient-to-br from-violet-50 to-amber-50 rounded-xl inline-flex">
                <img 
                  src="/logo.png" 
                  alt="Derassa Logo" 
                  className="w-10 h-10 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-violet-700 via-purple-600 to-amber-600 bg-clip-text text-transparent">
                Derassa | دراسة
              </span>
            </Link>
            <p className="text-sm text-zinc-600 max-w-sm leading-relaxed font-medium">
              La plateforme de révision ultime dédiée aux stagiaires de l'OFPPT au Maroc. Accédez aux modules, vidéos explicatives, exercices pratiques et préparez vos examens de fin de module (EFM) en toute sérénité.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-bold pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Conforme aux programmes officiels de la formation professionnelle</span>
            </div>
          </div>

          {/* Col 2: Navigation rapide */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900">Navigation Rapide</h4>
            <ul className="space-y-2 text-sm text-zinc-600 font-medium">
              <li><Link to="/branches" className="hover:text-violet-600 transition-colors flex items-center gap-1.5"><span>Toutes les Filières</span></Link></li>
              <li><Link to="/videos" className="hover:text-violet-600 transition-colors flex items-center gap-1.5"><span>Vidéos Hub</span></Link></li>
              <li><Link to="/exercises" className="hover:text-violet-600 transition-colors flex items-center gap-1.5"><span>Exercices Pratiques & EFM</span></Link></li>
              <li><Link to="/certificates" className="hover:text-violet-600 transition-colors flex items-center gap-1.5"><span>Générateur de Certificat</span></Link></li>
              <li><Link to="/chat" className="hover:text-violet-600 transition-colors flex items-center gap-1.5"><span>Entraide & Messages</span></Link></li>
            </ul>
          </div>

          {/* Col 3: Pédagogie & Données */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-zinc-900">Pédagogie & Catalogue</h4>
            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
              Le répertoire de ressources synchronise en direct les modules, vidéos YouTube, et polycopiés de préparation accrédités pour une révision optimale.
            </p>
          </div>

        </div>

        <div className="border-t border-zinc-100 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4 font-medium">
          <div 
            onClick={handleSecretDotClick}
            className="flex items-center select-none cursor-default"
          >
            © {new Date().getFullYear()} Derassa. Créé avec passion pour l'excellence académique marocaine.
          </div>
          <div className="flex items-center gap-1 text-zinc-500">
            <span>Fait avec</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>pour les étudiants de l'OFPPT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
