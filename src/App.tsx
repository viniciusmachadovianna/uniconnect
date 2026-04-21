import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ParticipantesPage } from './pages/ParticipantesPage';
import { AulasPage } from './pages/AulasPage';
import { AtividadesPage } from './pages/AtividadesPage';
import './index.css';

function App() {
  return (
    <Router>
      <AppProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/participantes" element={<ParticipantesPage />} />
          <Route path="/aulas" element={<AulasPage />} />
          <Route path="/atividades" element={<AtividadesPage />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
