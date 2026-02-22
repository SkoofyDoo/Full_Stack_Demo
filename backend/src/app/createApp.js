import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'

import { healthRoutes } from './routes/health.routes';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';

import { apiV1Rotes } from './routes/api.v1.routes';


export function createApp(config){
    // Express inititalisieren
    const app = express();
    const rateLimitCfg = config.rateLimit ?? { max: 100, windowMs: 15 * 60 * 1000 };
    // Helmet(HTTP Security Headers) als Middleware für mehr Sicherheit gegen XSS, Sane Headers, Clickjacking
    app.use(helmet())

    // CORS-Konfiguration: erlaubt requests vom Frontend
    app.use(cors({ 
    origin: config.clientUrl, 
    methods: ['GET','POST','PUT','DELETE',]
    }));
    // Für JSON-Parsing
    app.use(express.json());

    // Logging 
    app.use(morgan(config.env === 'production' ? 'combined' : 'dev'))

    // HealthCheck
    app.use(healthRoutes())

    // API VERSION 1
    app.use('/api/v1', apiV1Rotes(), rateLimit)
    
    // RateLimiter
    app.use(rateLimit({
        windowMs: rateLimitCfg.windowMs,
        max: rateLimitCfg.max,
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











