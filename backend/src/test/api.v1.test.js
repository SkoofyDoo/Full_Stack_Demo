import  request  from "supertest";
import { createApp } from "../app/createApp";

// API v1 Test
describe('API v1 Test', () => {
    it('GET /api/v1/ping soll OK zurückgeben', async () => {
        const app = createApp({env: 'test'});
        const res = await request(app).get('/api/v1/ping');
        
        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(res.body.v).toBe(1);

    })
})