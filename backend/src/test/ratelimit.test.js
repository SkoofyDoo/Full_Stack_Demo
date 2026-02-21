
import  request  from "supertest";
import {createApp} from '../app/createApp'


const config = {
    env: 'test',
    clientUrl: 'http://localhost:5173',
}



describe('Rate-Limit', () => {
    it('Muss 429 zurückegeben nach dem Erreichen des Limits', async() => {
        const app = createApp({
            env: 'test',
            clientUrl: 'http://localhost:5173',
            rateLimit: {max: 3, windowMs: 60_000}
        })
 
        await request(app).get('/unknown1');
        await request(app).get('/inknown2');
        await request(app).get('/unknown3');
        
        const response = await request(app).get('/unknown4')
        expect(response.statusCode).toBe(429);
        
        
    })
})
