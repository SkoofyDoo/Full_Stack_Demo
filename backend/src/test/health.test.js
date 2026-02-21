import request from 'supertest';
import app from '../app';


// HealthCheck-Test
describe('GET /health', () => {
    it('Muss 200 zurückgeben', async () => {
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