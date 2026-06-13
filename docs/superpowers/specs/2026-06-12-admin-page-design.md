# Admin Page Design

## Overview

Página oculta de administração em `/admin`. Não aparece na Navbar. Acessível apenas por quem conhece a URL. Permite gerenciar participantes, aulas e materiais via painel com abas.

## Autenticação

- Credenciais hardcoded: login `Admin`, senha `CarlosUniacademiaVaiseFuder`
- Estado local via `useState` — sem token, cookie ou persistência
- Ao recarregar, usuário precisa logar novamente
- Mesma página alterna entre tela de login e painel via estado `isAuthenticated`

## Tela de Login

- Formulário centralizado na tela (fundo escuro, card branco)
- Campos: Usuário e Senha (type="password")
- Botão "Entrar"
- Mensagem de erro visível se credenciais incorretas
- Sem link público para essa página

## Painel (pós-login)

### Layout
- Header: título "Painel Admin" + botão "Sair" (reseta `isAuthenticated` para false)
- 3 abas horizontais: Participantes | Aulas | Materiais
- Conteúdo da aba ativa renderizado abaixo

### Aba Participantes
- Tabela: Nome | Curso | Área | Status | Ações
- Ações por linha: Editar | Remover
- Botão "Adicionar Participante" abre formulário inline acima da tabela
- Formulário: nome, curso, área (select: Desenvolvedor/Professor/Marketing), status
- Usa `addParticipant`, `updateParticipant`, `deleteParticipant` do AppContext

### Aba Aulas
- Tabela: Título | Data | Local | Status | Ações
- Ações por linha: Editar | Remover
- Botão "Adicionar Aula" abre formulário inline
- Formulário: título, descrição, data/hora, local
- Usa `addClass`, `updateClass`, `deleteClass` do AppContext

### Aba Materiais
- Tabela: Título | Tipo | Data | Ações
- Ações por linha: Abrir | Remover
- Botão "Adicionar Material" abre formulário inline
- Formulário: título, descrição, tipo (pdf/video/link/arquivo), URL
- Chama API `/api/materials` (POST/DELETE) diretamente, igual ao OfficePage

## Arquivos a Criar/Modificar

| Arquivo | Ação |
|---|---|
| `src/pages/AdminPage.tsx` | Criar — página completa |
| `src/App.tsx` | Modificar — adicionar rota `/admin` sem Navbar |

## Decisões

- Navbar **não** é exibida na rota `/admin` — layout limpo para o admin
- Sem validação avançada de formulário (MVP)
- Sem confirmação antes de deletar (MVP)
- Materiais sem upload de arquivo — apenas URL
