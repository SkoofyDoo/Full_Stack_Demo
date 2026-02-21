import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'

import { healthRoutes } from './routes/health.routes';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import { loadConfig } from "../config/config";

const config = loadConfig();

export function createApp(config){
    // Express inititalisieren
    const app = express();
    
    // Helmet(HTTP Security Headers) als Middleware für mehr Sicherheit gegen XSS, Sane Headers, Clickjacking
    app.use(helmet())

    // CORS-Konfiguration: erlaubt requests vom Frontend
    app.use(cors({ 
    origin: config.clientURL, 
    methods: ['GET','POST','PUT','DELETE',]
    }));
    // Für JSON-Parsing
    app.use(express.json());

    // Logging 
    app.use(morgan(config.env === 'production' ? 'combined' : 'dev'))

    // HealthCheck
    app.use(healthRoutes())
    
    // RateLimiter
    app.use(rateLimit({
        windowMs: config.rateLimit.windowMs,
        max: config.rateLimit.max,
        standardHeaders: 'draft-8',
        legacyHeaders: false,

    }))

    // ============
    // ErrorHandler
    // ============
    app.use(notFound)
    app.use(errorHandler)

    return app


}











