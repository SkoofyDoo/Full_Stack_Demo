import request from 'supertest';
import {createApp} from '../app/createApp'

describe('Users API v1', () => {
    const app = createApp({env: 'test'});
    // Create User 201
    it('POST /api/v1/users muss 201 zurückgeben', async () => {
        const res = await request(app)
        .post('/api/v1/users')
        .send({name: 'Max Mustermann', email: 'max@example.com'})

        expect(res.statusCode).toBe(201);
        expect(res.body.id).toBeTruthy()
        expect(res.body.email).toBe('max@example.com')

    });
    // Keine E-Mail 400
    it('POST /api/v1/users muss 400 zurückgeben (Keine E-Mail)', async () => {
        const res = await request(app)
        .post('/api/v1/users')
        .send({name: 'Max', email: 'Keine_E-Mail'});

        expect(res.statusCode).toBe(400);
    });
    // Keine zusätzlichen Felder dürfen rein 
    it('POST /api/v1/users muss 400 zurückgeben (zusätzliche Felder blokiert)', async () =>{
        const res = await request(app)
        .post('/api/v1/users')
        .send({name: 'Max Mustermann', email: 'max@example.com', role: 'Admin'})

        expect(res.statusCode).toBe(400)
    });
})