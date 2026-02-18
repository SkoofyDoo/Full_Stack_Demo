import request from 'supertest';
import app from '../app';

describe('GET /health', () => {
    it('Muss 200 zurückgeben', async () => {
        const res = await request(app).get('/health');
        expect(res.statusCode).toBe(200);
    });
});
