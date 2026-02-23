import {Router} from 'express'
import {usersRoutes} from './users.routes'

export function apiV1Routes(){
    const router = Router();

    router.get('/ping', (req, res) => res.json({ok: true, v: 1}));

    router.use('/users', usersRoutes())
    

    return router;

}