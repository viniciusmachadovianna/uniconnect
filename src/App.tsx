import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ParticipantesPage } from './pages/ParticipantesPage';
import { AulasPage } from './pages/AulasPage';
import { AboutPage } from './pages/AboutPage';
import { OfficePage } from './pages/OfficePage';

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
          <Route path="/office" element={<OfficePage />} />
          <Route path="/sobre" element={<AboutPage />} />

        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
