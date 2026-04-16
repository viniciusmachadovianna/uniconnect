import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import Participants from './pages/Participants';
import Visitors from './pages/Visitors';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/activities" element={<ProtectedRoute><Activities /></ProtectedRoute>} />
        {/* Apenas ADMIN acessa estas rotas */}
        <Route path="/participants" element={<ProtectedRoute role="ADMIN"><Participants /></ProtectedRoute>} />
        <Route path="/visitors" element={<ProtectedRoute role="ADMIN"><Visitors /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}