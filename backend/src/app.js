const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const participantRoutes = require('./routes/participantRoutes');
const activityRoutes = require('./routes/activityRoutes');
const visitorRoutes = require('./routes/visitorRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/participants', participantRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/visitors', visitorRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));