# Uniconnect - Plataforma de Gestão de Atividades

## 📋 Sobre o Projeto

Uniconnect é uma plataforma de gestão de atividades desenvolvida para um grupo de extensão universitária. O site funciona como um MVP (Produto Mínimo Viável) para facilitar o registro, acompanhamento e compartilhamento de atividades realizadas pelo grupo.

## 🎯 Objetivos

- **Cadastro de Participantes**: Gerenciar membros do grupo de extensão
- **Registro de Aulas**: Documentar aulas ministradas pelo grupo
- **Registro de Atividades**: Registrar atividades comunitárias e seu impacto
- **Visualização Centralizada**: Consultar todas as informações em um único local

## 🏗️ Estrutura do Projeto

```
uniconnect/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   └── Navbar.tsx       # Navegação principal
│   ├── context/             # Context API
│   │   └── AppContext.tsx   # Estado global da aplicação
│   ├── pages/               # Páginas da aplicação
│   │   ├── HomePage.tsx     # Página inicial
│   │   ├── ParticipantesPage.tsx
│   │   ├── AulasPage.tsx
│   │   └── AtividadesPage.tsx
│   ├── App.tsx              # Componente raiz
│   ├── main.tsx             # Ponto de entrada
│   └── index.css            # Estilos globais
├── index.html               # Template HTML
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração TypeScript
├── vite.config.ts           # Configuração Vite
├── tailwind.config.js       # Configuração Tailwind CSS
├── postcss.config.js        # Configuração PostCSS
└── .eslintrc.cjs            # Configuração ESLint
```

## 🛠️ Tecnologias

- **React 18** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido
- **Tailwind CSS** - Utility-first CSS
- **React Router DOM** - Roteamento
- **Context API** - Gerenciamento de estado

## 📦 Instalação e Configuração

### Pré-requisitos

- Node.js 16+
- npm ou yarn

### Passos

1. **Instale as dependências**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

3. **Build para produção**
   ```bash
   npm run build
   ```

## 📄 Funcionalidades

### 🏠 Homepage
- Apresentação do projeto
- Estatísticas de atividades
- Acesso rápido aos módulos

### 👥 Participantes
- Visualização de participantes
- Adicionar novos participantes
- Campos: Nome, Email, Telefone, Área de atuação
- Status (Ativo/Inativo)

### 📚 Aulas Ministradas
- Gerenciamento de aulas
- Informações: Título, Descrição, Data, Duração, Instrutor, Local, Participantes
- Status (Agendada, Concluída, Cancelada)

### 🎯 Atividades
- Registro de atividades comunitárias
- Campos: Título, Descrição, Data, Duração, Local, Responsável, Impacto
- Status (Criada, Atualizada, Deletada)

## 🎨 Paleta de Cores

- **Primária**: Azul (#3B82F6)
- **Secundária**: Verde (#10B981)
- **Alerta**: Vermelho (#EF4444)
- **Aviso**: Laranja (#F59E0B)

## 📊 Estrutura de Dados

### Participante
```typescript
{
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  lastLogin?: Date;
}
```

### Aula
```typescript
{
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: number;
  instructor: string;
  location: string;
  participants: number;
  status: 'scheduled' | 'completed' | 'cancelled';
}
```

### Atividade
```typescript
{
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: number;
  location: string;
  responsible: string;
  impact: string;
  status: 'created' | 'updated' | 'deleted';
  images?: string[];
  videos?: string[];
  createdAt: Date;
  updatedAt?: Date;
}
```

## 🚀 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Faz build para produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa ESLint

## 📝 Notas de Desenvolvimento

- O projeto usa **Context API** para gerenciamento de estado
- As páginas são componentes de função com **React Hooks**
- **Tailwind CSS** é usado para estilização responsiva
- Todos os componentes são **TypeScript** tipados

## 🔄 Fluxo de Trabalho

1. Usuário acessa a Homepage
2. Navega entre as páginas (Participantes, Aulas, Atividades)
3. Pode adicionar, editar ou remover registros
4. Dados são armazenados no Context API (memória)

## ⚠️ Limitações da Versão Atual (MVP)

- Dados são armazenados apenas em memória (sem persistência)
- Sem integração com backend
- Sem autenticação
- Sem upload de imagens/vídeos
- Validação básica de formulários

## 🚧 Melhorias Futuras

- [ ] Integração com API backend
- [ ] Persistência de dados (Backend/Database)
- [ ] Autenticação de usuários
- [ ] Upload de mídias
- [ ] Filtros avançados
- [ ] Exportação de relatórios
- [ ] Notificações
- [ ] Dark mode

## 👨‍💻 Autores

Jackson Aparecido - Jean de Souza - Pedro Atalaia 

## 📄 Licença

Projeto de extensão universitária - 2024
