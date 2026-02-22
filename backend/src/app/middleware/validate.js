import {ZodError} from 'zod'

/**
 * Validiert Request-Daten (body/params/query) anhand von Zod-Schemas.
 * Bei Erfolg: Geparste Ergebnisse werden zurück an req.* geschrieben.
 * Bei Feheler: 400 Bad Request mit Issue Details
 */

export function validate({body, params, query}){
    return (req, res, next) => {
        try {
            if(body) req.body = body.parse(req.body)
            if(params) req.params = params.parse(req.params)
            if(query) req.query = query.parse(req.query)
            return next();

        } catch(error){
            if(error instanceof ZodError){
                return res.status(400).json({
                    message: 'Validierung fehlgeschlagen',
                    issues: error.issues.map(i => ({
                        path: i.path.join('.'),
                        message: i.message,
                    })),
                });
            }
            return next(error)
        }
    }
}