import {Router} from 'express'

export function healthRoutes(){
    const router = Router()

    // Health-Check    
    router.get('/health', (req, res) => {
        res.json({ ok: true, service: 'backend', time: new Date().toISOString() });
    });
    return router;
}


