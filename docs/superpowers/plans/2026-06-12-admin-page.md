# Admin Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar página oculta `/admin` com login e painel de gerenciamento completo (participantes, aulas, materiais).

**Architecture:** Uma única página `AdminPage.tsx` que alterna entre tela de login e painel via estado `isAuthenticated`. O painel usa abas locais e consome o `AppContext` existente para participantes e aulas, e chama a API `/api/materials` para materiais. A rota `/admin` é registrada no `App.tsx` fora do layout da Navbar.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, React Router DOM 6, AppContext existente, fetch API.

---

## Arquivos

| Arquivo | Ação |
|---|---|
| `src/pages/AdminPage.tsx` | Criar — página completa com login + painel |
| `src/App.tsx` | Modificar — rota `/admin` sem Navbar |

---

### Task 1: Ajustar App.tsx para suportar rota /admin sem Navbar

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Ler o arquivo atual**

Conteúdo atual de `src/App.tsx`:
```tsx
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
```

- [ ] **Step 2: Substituir conteúdo de App.tsx**

Substituir pelo seguinte (usa `useLocation` para esconder Navbar em `/admin`):

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat: adiciona rota /admin sem navbar"
```

---

### Task 2: Criar AdminPage.tsx — tela de login

**Files:**
- Create: `src/pages/AdminPage.tsx`

- [ ] **Step 1: Criar o arquivo com a estrutura base e tela de login**

```tsx
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const ADMIN_USER = 'Admin';
const ADMIN_PASS = 'CarlosUniacademiaVaiseFuder';

type Tab = 'participantes' | 'aulas' | 'materiais';

type MaterialType = 'pdf' | 'video' | 'link' | 'arquivo';

interface Material {
  id: string;
  title: string;
  description: string;
  type: MaterialType;
  url: string;
  uploadDate: string;
}

export const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUser === ADMIN_USER && loginPass === ADMIN_PASS) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Usuário ou senha incorretos.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">Painel Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Usuário</label>
              <input
                type="text"
                value={loginUser}
                onChange={e => setLoginUser(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                value={loginPass}
                onChange={e => setLoginPass(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoComplete="current-password"
              />
            </div>
            {loginError && (
              <p className="text-red-600 text-sm font-medium">{loginError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <AdminPanel onLogout={() => setIsAuthenticated(false)} />;
};
```

- [ ] **Step 2: Commit parcial**

```bash
git add src/pages/AdminPage.tsx
git commit -m "feat: tela de login do admin"
```

---

### Task 3: Criar componente AdminPanel com abas

**Files:**
- Modify: `src/pages/AdminPage.tsx`

- [ ] **Step 1: Adicionar componente AdminPanel após o export AdminPage**

Adicionar ao final do arquivo `src/pages/AdminPage.tsx` (após o componente `AdminPage`):

```tsx
const AdminPanel: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>('participantes');

  const tabs: { key: Tab; label: string }[] = [
    { key: 'participantes', label: 'Participantes' },
    { key: 'aulas', label: 'Aulas' },
    { key: 'materiais', label: 'Materiais' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Painel Admin</h1>
        <button
          onClick={onLogout}
          className="bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
        >
          Sair
        </button>
      </div>

      {/* Abas */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo da aba */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'participantes' && <TabParticipantes />}
        {activeTab === 'aulas' && <TabAulas />}
        {activeTab === 'materiais' && <TabMateriais />}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/AdminPage.tsx
git commit -m "feat: estrutura do painel admin com abas"
```

---

### Task 4: Implementar aba Participantes

**Files:**
- Modify: `src/pages/AdminPage.tsx`

- [ ] **Step 1: Adicionar componente TabParticipantes ao final do arquivo**

```tsx
const TabParticipantes: React.FC = () => {
  const { participants, addParticipant, updateParticipant, deleteParticipant } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', curso: '', area: 'Desenvolvedor', status: 'active' as 'active' | 'inactive' });

  const resetForm = () => {
    setFormData({ name: '', curso: '', area: 'Desenvolvedor', status: 'active' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (p: typeof participants[0]) => {
    setFormData({ name: p.name, curso: p.curso, area: p.area, status: p.status });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateParticipant(editingId, formData);
    } else {
      addParticipant(formData);
    }
    resetForm();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900">Participantes ({participants.length})</h2>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
        >
          {showForm && !editingId ? 'Cancelar' : 'Adicionar Participante'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-6 mb-6 space-y-4">
          <h3 className="font-semibold text-slate-900">{editingId ? 'Editar Participante' : 'Novo Participante'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nome *</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Curso *</label>
              <input
                type="text"
                value={formData.curso}
                onChange={e => setFormData(p => ({ ...p, curso: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Área</label>
              <select
                value={formData.area}
                onChange={e => setFormData(p => ({ ...p, area: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="Desenvolvedor">Desenvolvedor</option>
                <option value="Professor">Professor</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData(p => ({ ...p, status: e.target.value as 'active' | 'inactive' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors">
              {editingId ? 'Salvar' : 'Adicionar'}
            </button>
            <button type="button" onClick={resetForm} className="text-sm text-slate-600 hover:text-slate-900 font-semibold px-4 py-2">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Nome</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Curso</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Área</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {participants.map(p => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                <td className="px-4 py-3 text-slate-600">{p.curso}</td>
                <td className="px-4 py-3 text-slate-600">{p.area}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-600'}`}>
                    {p.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-600 hover:text-blue-800 font-semibold text-xs">Editar</button>
                    <button onClick={() => deleteParticipant(p.id)} className="text-red-600 hover:text-red-800 font-semibold text-xs">Remover</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/AdminPage.tsx
git commit -m "feat: aba participantes no painel admin"
```

---

### Task 5: Implementar aba Aulas

**Files:**
- Modify: `src/pages/AdminPage.tsx`

- [ ] **Step 1: Adicionar componente TabAulas ao final do arquivo**

```tsx
const TabAulas: React.FC = () => {
  const { classes, addClass, updateClass, deleteClass } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '' });

  const resetForm = () => {
    setFormData({ title: '', description: '', date: '', location: '' });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (c: typeof classes[0]) => {
    const d = new Date(c.date);
    const pad = (n: number) => String(n).padStart(2, '0');
    const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    setFormData({ title: c.title, description: c.description, date: dateStr, location: c.location });
    setEditingId(c.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateClass(editingId, {
        title: formData.title,
        description: formData.description,
        date: new Date(formData.date),
        location: formData.location,
      });
    } else {
      addClass({
        title: formData.title,
        description: formData.description,
        date: new Date(formData.date),
        duration: 0,
        instructor: 'uniconnect',
        location: formData.location,
        participants: 0,
        status: 'completed',
      });
    }
    resetForm();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900">Aulas ({classes.length})</h2>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
        >
          {showForm && !editingId ? 'Cancelar' : 'Adicionar Aula'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-6 mb-6 space-y-4">
          <h3 className="font-semibold text-slate-900">{editingId ? 'Editar Aula' : 'Nova Aula'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Título *</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Local *</label>
              <input
                type="text"
                value={formData.location}
                onChange={e => setFormData(p => ({ ...p, location: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Data e Hora *</label>
              <input
                type="datetime-local"
                value={formData.date}
                onChange={e => setFormData(p => ({ ...p, date: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
              <input
                type="text"
                value={formData.description}
                onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors">
              {editingId ? 'Salvar' : 'Adicionar'}
            </button>
            <button type="button" onClick={resetForm} className="text-sm text-slate-600 hover:text-slate-900 font-semibold px-4 py-2">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Título</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Data</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Local</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {classes.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{c.title}</td>
                <td className="px-4 py-3 text-slate-600">{new Date(c.date).toLocaleDateString('pt-BR')}</td>
                <td className="px-4 py-3 text-slate-600">{c.location}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">{c.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(c)} className="text-blue-600 hover:text-blue-800 font-semibold text-xs">Editar</button>
                    <button onClick={() => deleteClass(c.id)} className="text-red-600 hover:text-red-800 font-semibold text-xs">Remover</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/AdminPage.tsx
git commit -m "feat: aba aulas no painel admin"
```

---

### Task 6: Implementar aba Materiais

**Files:**
- Modify: `src/pages/AdminPage.tsx`

- [ ] **Step 1: Adicionar componente TabMateriais ao final do arquivo**

```tsx
const TabMateriais: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', type: 'pdf' as MaterialType, url: '' });

  const fetchMaterials = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/materials');
      if (!res.ok) throw new Error('Falha ao buscar materiais');
      const data: Material[] = await res.json();
      setMaterials(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => { fetchMaterials(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Falha ao salvar material');
      const newMaterial: Material = await res.json();
      setMaterials(prev => [newMaterial, ...prev]);
      setFormData({ title: '', description: '', type: 'pdf', url: '' });
      setShowForm(false);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setError('');
    try {
      const res = await fetch(`/api/materials/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Falha ao remover material');
      setMaterials(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-900">Materiais ({materials.length})</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
        >
          {showForm ? 'Cancelar' : 'Adicionar Material'}
        </button>
      </div>

      {error && <div className="mb-4 text-red-600 text-sm font-medium">{error}</div>}
      {loading && <div className="mb-4 text-slate-500 text-sm">Carregando...</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-lg p-6 mb-6 space-y-4">
          <h3 className="font-semibold text-slate-900">Novo Material</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Título *</label>
              <input
                type="text"
                value={formData.title}
                onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo</label>
              <select
                value={formData.type}
                onChange={e => setFormData(p => ({ ...p, type: e.target.value as MaterialType }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="pdf">PDF</option>
                <option value="video">Vídeo</option>
                <option value="link">Link</option>
                <option value="arquivo">Arquivo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">URL *</label>
              <input
                type="url"
                value={formData.url}
                onChange={e => setFormData(p => ({ ...p, url: e.target.value }))}
                required
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
              <input
                type="text"
                value={formData.description}
                onChange={e => setFormData(p => ({ ...p, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors">
              Adicionar
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-sm text-slate-600 hover:text-slate-900 font-semibold px-4 py-2">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Título</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Tipo</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Data</th>
              <th className="text-left px-4 py-3 font-semibold text-slate-700">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {materials.map(m => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{m.title}</td>
                <td className="px-4 py-3 text-slate-600 uppercase text-xs font-semibold">{m.type}</td>
                <td className="px-4 py-3 text-slate-600">{new Date(m.uploadDate).toLocaleDateString('pt-BR')}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold text-xs">Abrir</a>
                    <button onClick={() => handleDelete(m.id)} className="text-red-600 hover:text-red-800 font-semibold text-xs">Remover</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit final**

```bash
git add src/pages/AdminPage.tsx
git commit -m "feat: aba materiais no painel admin"
```

---

### Task 7: Verificar build sem erros

**Files:** nenhum

- [ ] **Step 1: Rodar o type-check**

```bash
npx tsc --noEmit
```

Esperado: sem erros.

- [ ] **Step 2: Verificar no navegador**

Abrir `http://localhost:5173/admin` — deve aparecer a tela de login.
Entrar com `Admin` / `CarlosUniacademiaVaiseFuder` — deve aparecer o painel com as 3 abas.
Verificar que a Navbar não aparece na página `/admin`.

- [ ] **Step 3: Commit final**

```bash
git add -A
git commit -m "feat: página admin completa com login e painel de gerenciamento"
```
