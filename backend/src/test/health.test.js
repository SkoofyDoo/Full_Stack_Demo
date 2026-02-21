import request from 'supertest';
import { createApp } from '../app/createApp';


const config = {
    env: 'test',
    clientUrl: 'http://localhost:5173',
}


// HealthCheck-Test
describe('GET /health', () => {
    it('Muss 200 zurückgeben', async () => {
        const app = createApp(config)
        const res = await request(app).get('/health');
        
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(res.body.service).toBe('backend')
    });
});

// 404-Test
describe('404 Handler', () => {
    it('Muss Status:404 zurückgeben', async () => {
        const res = await request(app).get('/unknown');

        expect(res.statusCode).toBe(404)
    })
})