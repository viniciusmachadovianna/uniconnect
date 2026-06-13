import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { ParticipantesPage } from './pages/ParticipantesPage';
import { AulasPage } from './pages/AulasPage';
import { AboutPage } from './pages/AboutPage';
import { OfficePage } from './pages/OfficePage';
import { AdminPage } from './pages/AdminPage';

import './index.css';

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <>
      {!isAdmin && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/participantes" element={<ParticipantesPage />} />
        <Route path="/aulas" element={<AulasPage />} />
        <Route path="/office" element={<OfficePage />} />
        <Route path="/sobre" element={<AboutPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppProvider>
        <Layout />
      </AppProvider>
    </Router>
  );
}

export default App;
