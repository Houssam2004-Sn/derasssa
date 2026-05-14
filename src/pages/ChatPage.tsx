import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MessageSquare, Send, Users, Layers, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ChatPage: React.FC = () => {
  const { branches, messages, currentUser, sendMessage } = useApp();
  const [searchParams] = useSearchParams();
  const initialBranch = searchParams.get('branch') || branches[0]?.id || '';

  const [activeBranchId, setActiveBranchId] = useState<string>(initialBranch);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  const activeBranchObj = branches.find((b) => b.id === activeBranchId);

  // Filter messages for current branch room
  const roomMessages = messages.filter((m) => m.branch_id === activeBranchId);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeBranchId) return;

    setIsSending(true);
    await sendMessage(activeBranchId, inputText);
    setInputText('');
    setIsSending(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Title Header */}
      <div className="mb-6 space-y-1">
        <div className="flex items-center gap-2 text-xs font-black text-violet-600 uppercase tracking-wider">
          <MessageSquare className="w-4 h-4 text-amber-500" />
          <span>Salons d'Entraide en Direct</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-900">
          Chat Communautaire OFPPT
        </h1>
        <p className="text-xs text-zinc-500 font-medium">
          Échangez avec vos camarades de filière, posez des questions sur les modules de 1ère ou 2ème année, et collaborez en temps réel.
        </p>
      </div>

      {/* Main dual pane chat shell */}
      <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-3 min-h-[600px] max-h-[750px]">
        
        {/* Left pane: sidebar list of available specialized channels */}
        <div className="border-r border-zinc-200 flex flex-col bg-zinc-50/50 max-h-[300px] md:max-h-none overflow-y-auto">
          <div className="p-4 border-b border-zinc-200 sticky top-0 bg-zinc-50 z-10 space-y-1">
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider block">
              Salons par Filière ({branches.length})
            </span>
            <p className="text-[11px] text-zinc-600 font-medium">Sélectionnez une option pour rejoindre la salle :</p>
          </div>

          <div className="divide-y divide-zinc-100">
            {branches.map((b) => {
              const isActive = b.id === activeBranchId;
              const msgCount = messages.filter(m => m.branch_id === b.id).length;

              return (
                <button
                  key={b.id}
                  onClick={() => setActiveBranchId(b.id)}
                  className={`w-full text-left p-4 transition-all flex flex-col justify-between relative ${
                    isActive 
                      ? 'bg-white text-violet-600 font-black border-l-4 border-violet-600 shadow-xs' 
                      : 'hover:bg-zinc-100/80 text-zinc-700 font-bold'
                  }`}
                >
                  <div className="space-y-1 pr-6">
                    <span className="block text-[10px] font-bold text-zinc-400">
                      {b.domain.split(' ')[0]} • {b.level}
                    </span>
                    <span className="block text-xs leading-tight line-clamp-1">
                      {b.specialization.replace('Option ', '')}
                    </span>
                  </div>

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-full font-mono font-bold">
                    <Users className="w-2.5 h-2.5 text-amber-500" />
                    {msgCount}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right pane: Active chat messaging area */}
        <div className="md:col-span-2 flex flex-col bg-white h-full relative">
          
          {/* Header info of active channel */}
          {activeBranchObj ? (
            <div className="p-4 border-b border-zinc-200 bg-white sticky top-0 z-10 flex items-center justify-between gap-2 shadow-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                  <Layers className="w-3.5 h-3.5 text-amber-500" />
                  <span className="font-bold">{activeBranchObj.domain}</span>
                </div>
                <h3 className="text-sm font-black text-zinc-900">
                  {activeBranchObj.specialization}
                </h3>
              </div>

              <div className="text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Connecté</span>
              </div>
            </div>
          ) : (
            <div className="p-4 border-b border-zinc-200 text-xs text-zinc-400 font-medium">
              Veuillez sélectionner un salon sur la gauche.
            </div>
          )}

          {/* Message scroll list */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-zinc-50/30">
            {roomMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400 p-8 space-y-2">
                <Sparkles className="w-8 h-8 text-amber-400/60 animate-pulse" />
                <p className="text-xs font-bold text-zinc-500">Aucun message dans ce salon pour l'instant.</p>
                <p className="text-[11px] text-zinc-400 max-w-xs font-medium">
                  Soyez le premier à poser une question ou partager une astuce de révision avec les autres stagiaires !
                </p>
              </div>
            ) : (
              roomMessages.map((msg) => {
                const isMe = msg.user_id === currentUser.id || msg.user_name === currentUser.name;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[80%] ${
                      isMe ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      <span className="text-[10px] font-black text-zinc-700">
                        {msg.user_name}
                      </span>
                      {isMe && <span className="text-[9px] bg-violet-100 text-violet-700 px-1.5 py-0.2 rounded-xs font-black">Moi</span>}
                      <span className="text-[9px] text-zinc-400 font-bold">
                        {new Date(msg.created_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed break-words shadow-xs font-medium ${
                        isMe
                          ? 'bg-violet-600 text-white rounded-tr-none'
                          : 'bg-white border border-zinc-200/80 text-zinc-800 rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom entry input form */}
          <form onSubmit={handleSend} className="p-3.5 border-t border-zinc-200 bg-white sticky bottom-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={`Envoyer un message en tant que ${currentUser.name}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                maxLength={400}
                className="flex-1 px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-xs sm:text-sm font-medium focus:bg-white focus:ring-2 focus:ring-violet-600 focus:outline-hidden transition-all text-zinc-800"
              />
              
              <button
                type="submit"
                disabled={isSending || !inputText.trim()}
                className="p-3 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white transition-all shadow-md shadow-violet-600/20 shrink-0"
                title="Transmettre le message"
              >
                <Send className="w-4 h-4 text-amber-300" />
              </button>
            </div>
            <div className="text-[9px] text-zinc-400 pt-1 px-1 font-bold">
              Connecté au canal de discussion en temps réel.
            </div>
          </form>

        </div>

      </div>

    </div>
  );
};
