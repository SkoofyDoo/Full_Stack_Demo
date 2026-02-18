import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Konfiguration von .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS Regeln
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

// Für JSON-Parsing
app.use(express.json());

// Health-Check
app.get('/health', (req, res) => {
    res.json({ ok: true, service: 'backend', time: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`Backend läuft auf dem Port: ${PORT}`));
