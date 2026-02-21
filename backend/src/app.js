import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'


// Lade Variablen aus der .env-Datei in process.env
dotenv.config();

// Express inititalisieren
const app = express();

const CLIENT_URL = process.env.CLIENT_URL || 'localhost:5173'

// =====================
//      MIDDLEWARE
// =====================

// Helmet(HTTP Security Headers) als Middleware für mehr Sicherheit gegen XSS, Sane Headers, Clickjacking
app.use(helmet())

// CORS-Konfiguration: erlaubt requests vom Frontend
app.use(cors({ 
    origin: CLIENT_URL, 
    methods: ['GET','POST','PUT','DELETE',]
}));

// Für JSON-Parsing
app.use(express.json());
// Logging 
app.use(morgan('dev'))

// Schutz gegen Brute-Force
const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
})





// Health-Check
app.get('/health', (req, res) => {
    res.json({ ok: true, service: 'backend', time: new Date().toISOString() });
});
app.use(limiter)

// =====================
//     ERROR-HANDLING
// =====================

// 404 Keine ROUTE
app.use((req, res) =>{
    res.status(404).json({message: 'Route nicht gefunden'})
})



// Global Error Handler
app.use((error, req, res, next) => {
    console.error(error);
    res.status(error.status || 500).json({message: error.message || 'Server Fehler'})
})




export default app;
