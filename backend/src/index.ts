import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

interface Material {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'arquivo';
  url: string;
  uploadDate: string;
}

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

const materials: Material[] = [];
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

// Criar pasta de uploads se não existir
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  if (req.method === 'POST') {
    console.log('[body]', JSON.stringify(req.body));
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Bem-vindo ao UniConnect Backend' });
});

app.get('/api/materials', (req: Request, res: Response) => {
  console.log('[GET /api/materials] retornando', materials.length, 'itens');
  res.json(materials);
});

app.post('/api/materials/upload', (req: Request, res: Response) => {
  try {
    const { file, title } = req.body;

    if (!file || !title) {
      return res.status(400).json({ error: 'Arquivo e título são obrigatórios.' });
    }

    // Arquivo vem como base64
    const buffer = Buffer.from(file, 'base64');

    // Gerar nome único para o arquivo
    const fileName = `${Date.now()}_${title.replace(/\s+/g, '_').substring(0, 20)}`;
    const filePath = path.join(UPLOADS_DIR, fileName);

    // Salvar arquivo
    fs.writeFileSync(filePath, buffer);

    // Retornar URL relativa
    const fileUrl = `/uploads/${fileName}`;
    res.json({ url: fileUrl });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao fazer upload do arquivo.' });
  }
});

app.post('/api/materials', (req: Request, res: Response) => {
  const { title, description, type, url } = req.body;
  console.log('[POST /api/materials] recebido:', { title, type, url });

  if (!title || !url || !type) {
    console.log('[POST /api/materials] campos faltando:', { title, url, type });
    return res.status(400).json({ error: 'Título, tipo e URL são obrigatórios.' });
  }

  const material: Material = {
    id: `${Date.now()}`,
    title,
    description: description || '',
    type,
    url,
    uploadDate: new Date().toISOString(),
  };

  materials.unshift(material);
  console.log('[POST /api/materials] salvo. Total:', materials.length);

  res.status(201).json(material);
});

app.delete('/api/materials/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const index = materials.findIndex(material => material.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Material não encontrado.' });
  }

  materials.splice(index, 1);
  res.sendStatus(204);
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('[ERRO INESPERADO]', err.message, err.stack);
  res.status(500).json({ error: err.message });
});

app.use((req: Request, res: Response) => {
  console.log('[404] rota não encontrada:', req.method, req.path);
  res.status(404).json({ error: 'Rota não encontrada.' });
});

app.listen(PORT, () => {
  console.log(`[SERVIDOR] rodando na porta ${PORT}`);
  console.log(`[UPLOADS] diretório: ${UPLOADS_DIR}`);
});
