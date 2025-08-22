import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Importe as páginas
import CreateComunicado from './pages/Create';
import FeedbackPage from './pages/Feedback';
import AnalyticsPage from './pages/Analytics';
import ViewComunicado from './pages/View';

function App() {
  const location = useLocation();
  const isPublicPage = location.pathname.startsWith('/comunicado/') || location.pathname.startsWith('/feedback/');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      {!isPublicPage && <Header />}

      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/create" element={<CreateComunicado />} />
          <Route path="/comunicado/:id" element={<ViewComunicado />} />
          <Route path="/feedback/:tokenFeedback" element={<FeedbackPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/" element={<CreateComunicado />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;