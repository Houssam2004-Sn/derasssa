import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BranchesPage } from './pages/BranchesPage';
import { VideosPage } from './pages/VideosPage';
import { ExercisePage } from './pages/ExercisePage';
import { CertificatePage } from './pages/CertificatePage';
import { ChatPage } from './pages/ChatPage';
import AdminPage from './pages/AdminPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};



const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading } = useApp();
  return (
    <div className="min-h-screen flex flex-col font-sans text-zinc-800 bg-zinc-50">
      <Navbar />
      {loading && (
        <div className="h-1 bg-violet-100 w-full overflow-hidden shrink-0">
          <div className="h-full bg-gradient-to-r from-violet-600 via-amber-500 to-purple-600 animate-[pulse_1s_infinite] w-full"></div>
        </div>
      )}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/*" element={
            <MainLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/branches" element={<BranchesPage />} />
                <Route path="/videos" element={<VideosPage />} />
                <Route path="/exercises" element={<ExercisePage />} />
                <Route path="/certificates" element={<CertificatePage />} />
                <Route path="/chat" element={<ChatPage />} />
              </Routes>
            </MainLayout>
          } />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
