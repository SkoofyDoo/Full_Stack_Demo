
import  request  from "supertest";
import {createApp} from '../app/createApp'

// RateLimit Test
describe('Rate-Limit', () => {
    it('Muss 429 zurückegeben nach dem Erreichen des Limits', async() => {
        const app = createApp({
            env: 'test',
            clientUrl: 'http://localhost:5173',
            rateLimit: {max: 3, windowMs: 60_000}
        })
 
        await request(app).get('/api/v1/ping');
        await request(app).get('/api/v1/ping');
        await request(app).get('/api/v1/ping');
        
        const response = await request(app).get('/api/v1/ping')
        expect(response.statusCode).toBe(429);
        
        
    })
})
