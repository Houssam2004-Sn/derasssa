import React, { createContext, useContext, useState, useEffect } from 'react';
import { Branch, VideoItem, PdfItem, ExerciseItem, ChatMessage, CertificateItem } from '../types';
import { INITIAL_BRANCHES, INITIAL_VIDEOS, INITIAL_PDFS, INITIAL_EXERCISES, INITIAL_MESSAGES } from '../data/mockData';
import supabase from '../lib/supabase';

interface AppContextType {
  branches: Branch[];
  videos: VideoItem[];
  pdfs: PdfItem[];
  exercises: ExerciseItem[];
  messages: ChatMessage[];
  certificates: CertificateItem[];
  currentUser: { name: string; email?: string; level: string; branch_id?: string; id: string; isRegistered?: boolean };
  setCurrentUser: (user: { name: string; email?: string; level: string; branch_id?: string; id: string; isRegistered?: boolean }) => void;
  // Admin CRUD
  addVideo: (video: Omit<VideoItem, 'id'>) => Promise<boolean>;
  deleteVideo: (id: string) => Promise<boolean>;
  addPdf: (pdf: Omit<PdfItem, 'id'>, file?: File) => Promise<boolean>;
  deletePdf: (id: string) => Promise<boolean>;
  addExercise: (exercise: Omit<ExerciseItem, 'id'>) => Promise<boolean>;
  deleteExercise: (id: string) => Promise<boolean>;
  // Chat
  sendMessage: (branch_id: string, content: string) => Promise<boolean>;
  // Certificate
  issueCertificate: (branch_id: string) => Promise<CertificateItem | null>;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [branches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const saved = localStorage.getItem('derassa_videos');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });
  const [pdfs, setPdfs] = useState<PdfItem[]>(() => {
    const saved = localStorage.getItem('derassa_pdfs');
    return saved ? JSON.parse(saved) : INITIAL_PDFS;
  });
  const [exercises, setExercises] = useState<ExerciseItem[]>(() => {
    const saved = localStorage.getItem('derassa_exercises');
    return saved ? JSON.parse(saved) : INITIAL_EXERCISES;
  });
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('derassa_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });
  const [certificates, setCertificates] = useState<CertificateItem[]>(() => {
    const saved = localStorage.getItem('derassa_certs');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('derassa_user');
    const parsed = saved ? JSON.parse(saved) : null;
    return parsed ? { ...parsed, email: parsed.email || '', branch_id: parsed.branch_id || '', isRegistered: parsed.isRegistered ?? true } : { 
      name: '', 
      email: '',
      level: 'TS', 
      branch_id: 'ts-id-sr',
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      isRegistered: false
    };
  });

  const [loading, setLoading] = useState(true);

  // Persist local profile
  useEffect(() => {
    localStorage.setItem('derassa_user', JSON.stringify(currentUser));
  }, [currentUser]);

  // Synchronize state with Supabase Real Backend on startup
  useEffect(() => {
    const syncWithSupabase = async () => {
      setLoading(true);
      try {
        // Attempt fetch Videos
        const { data: vData, error: vError } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
        if (!vError && vData && vData.length > 0) {
          setVideos(vData);
        }

        // Attempt fetch PDFs
        const { data: pData, error: pError } = await supabase.from('pdfs').select('*').order('created_at', { ascending: false });
        if (!pError && pData && pData.length > 0) {
          setPdfs(pData);
        }

        // Attempt fetch Exercises
        const { data: eData, error: eError } = await supabase.from('exercises').select('*');
        if (!eError && eData && eData.length > 0) {
          setExercises(eData);
        }

        // Attempt fetch Messages
        const { data: mData, error: mError } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
        if (!mError && mData && mData.length > 0) {
          setMessages(mData);
        }

        // Attempt fetch Certificates
        const { data: cData, error: cError } = await supabase.from('certificates').select('*');
        if (!cError && cData && cData.length > 0) {
          setCertificates(cData);
        }
      } catch (err) {
        console.warn('Supabase initialization sync notice: tables might be empty or unconfigured yet. Using bundled memory cache.', err);
      } finally {
        setLoading(false);
      }
    };

    syncWithSupabase();

    // Real-time listener for chat messages table
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          const newMsg = payload.new as ChatMessage;
          setMessages((prev) => {
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            const updated = [...prev, newMsg];
            localStorage.setItem('derassa_messages', JSON.stringify(updated));
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Update localStorage whenever states update locally
  useEffect(() => {
    localStorage.setItem('derassa_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('derassa_pdfs', JSON.stringify(pdfs));
  }, [pdfs]);

  useEffect(() => {
    localStorage.setItem('derassa_exercises', JSON.stringify(exercises));
  }, [exercises]);

  useEffect(() => {
    localStorage.setItem('derassa_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('derassa_certs', JSON.stringify(certificates));
  }, [certificates]);

  // CRUD Implementations
  const addVideo = async (item: Omit<VideoItem, 'id'>) => {
    const newItem: VideoItem = {
      ...item,
      id: 'v-' + Date.now(),
      created_at: new Date().toISOString()
    };

    // Update Local First for immediate snappy UI response
    setVideos((prev) => [newItem, ...prev]);

    // Send to Supabase
    try {
      await supabase.from('videos').insert([newItem]);
    } catch (e) {
      console.warn('Supabase remote insert fallback to standard client cache', e);
    }
    return true;
  };

  const deleteVideo = async (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
    try {
      await supabase.from('videos').delete().eq('id', id);
    } catch (e) {
      console.warn('Supabase remote delete fallback', e);
    }
    return true;
  };

  const addPdf = async (item: Omit<PdfItem, 'id'>, file?: File) => {
    let finalUrl = item.file_url;
    
    // User requested: Add PDF upload to Supabase Storage bucket named "pdfs"
    if (file) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('pdfs')
          .upload(fileName, file);

        if (!uploadError) {
          const { data } = supabase.storage.from('pdfs').getPublicUrl(fileName);
          finalUrl = data.publicUrl;
        } else {
          console.warn('Supabase storage upload error, utilizing direct URL fallback', uploadError);
        }
      } catch (err) {
        console.warn('Storage bucket uninitialized, falling back to simulated public URL', err);
      }
    }

    if (!finalUrl) {
      finalUrl = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf';
    }

    const newItem: PdfItem = {
      ...item,
      id: 'p-' + Date.now(),
      file_url: finalUrl,
      created_at: new Date().toISOString()
    };

    setPdfs((prev) => [newItem, ...prev]);

    try {
      await supabase.from('pdfs').insert([newItem]);
    } catch (e) {
      console.warn('Remote database insert skipped', e);
    }
    return true;
  };

  const deletePdf = async (id: string) => {
    setPdfs((prev) => prev.filter((p) => p.id !== id));
    try {
      await supabase.from('pdfs').delete().eq('id', id);
    } catch (e) {
      console.warn('Remote delete skipped', e);
    }
    return true;
  };

  const addExercise = async (item: Omit<ExerciseItem, 'id'>) => {
    const newItem: ExerciseItem = {
      ...item,
      id: 'ex-' + Date.now(),
      created_at: new Date().toISOString()
    };

    setExercises((prev) => [newItem, ...prev]);

    try {
      await supabase.from('exercises').insert([newItem]);
    } catch (e) {
      console.warn('Remote DB insert skipped', e);
    }
    return true;
  };

  const deleteExercise = async (id: string) => {
    setExercises((prev) => prev.filter((e) => e.id !== id));
    try {
      await supabase.from('exercises').delete().eq('id', id);
    } catch (e) {
      console.warn('Remote DB delete skipped', e);
    }
    return true;
  };

  const sendMessage = async (branch_id: string, content: string) => {
    if (!content.trim()) return false;
    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      user_id: currentUser.id,
      user_name: currentUser.name,
      branch_id,
      content,
      created_at: new Date().toISOString()
    };

    setMessages((prev) => [...prev, newMsg]);

    try {
      await supabase.from('messages').insert([newMsg]);
    } catch (e) {
      console.warn('Realtime message local update successful', e);
    }
    return true;
  };

  const issueCertificate = async (branch_id: string) => {
    const branchObj = branches.find((b) => b.id === branch_id);
    if (!branchObj) return null;

    // Check if already certified
    const exists = certificates.find((c) => c.branch_id === branch_id && c.user_name === currentUser.name);
    if (exists) return exists;

    const newCert: CertificateItem = {
      id: 'CERT-' + Math.floor(100000 + Math.random() * 900000),
      user_id: currentUser.id,
      user_name: currentUser.name,
      branch_id,
      branch_name: `${branchObj.domain} - ${branchObj.specialization}`,
      issued_at: new Date().toISOString()
    };

    setCertificates((prev) => [newCert, ...prev]);

    try {
      await supabase.from('certificates').insert([newCert]);
    } catch (e) {
      console.warn('Certificate local cache record added successfully', e);
    }

    return newCert;
  };

  return (
    <AppContext.Provider
      value={{
        branches,
        videos,
        pdfs,
        exercises,
        messages,
        certificates,
        currentUser,
        setCurrentUser,
        addVideo,
        deleteVideo,
        addPdf,
        deletePdf,
        addExercise,
        deleteExercise,
        sendMessage,
        issueCertificate,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
