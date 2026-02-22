import {Router} from 'express'

export function apiV1Rotes(){
    const router = Router();



    router.get('/ping', (req, res) => res.json({ok: true, v: 1}));

    return router;

}