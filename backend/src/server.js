import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Lade Variablen aus der .env-Datei in process.env
dotenv.config();

// Express inititalisieren
const app = express();

// PORT fürs Server lauschen
const PORT = process.env.PORT || 5000;

// CORS-Konfiguration: erlaubt requests vom Frontend
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

// Für JSON-Parsing
app.use(express.json());

// Health-Check
app.get('/health', (req, res) => {
    res.json({ ok: true, service: 'backend', time: new Date().toISOString() });
});

app.listen(PORT, () => console.log(`Backend läuft auf dem Port: ${PORT}`));
