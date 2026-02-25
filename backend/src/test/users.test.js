import request from 'supertest';
import {createApp} from '../app/createApp.js'
import { resetDB, closeDB } from './db.helper.js';




describe('Users API v1', () => {
    const app = createApp({env: 'test'});
   

    beforeEach(async () => {
        await resetDB()
    });

    afterAll(async () => {
        await closeDB()
    });

    //=============================================================== 
    // CREATE USER
    //===============================================================

    // Create User 201
    it('POST /api/v1/users muss 201 zurückgeben', async () => {
        const res = await request(app)
        .post('/api/v1/users')
        .send({name: 'Max', email: 'max@example.com'})

        expect(res.statusCode).toBe(201);
        expect(res.body.id).toBeTruthy()
        expect(res.body.email).toBe('max@example.com')
        expect(res.body.name).toBe('Max')
        expect(res.body.role).toBeTruthy()
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
        .send({name: 'Max', email: 'max@example.com', role: 'Admin'})

        const res2 = await request(app)
        .post('/api/v1/users')
        .send({name: 'Max Wax', email: 'max@example.com', role: 'Admin'})

        expect(res.statusCode).toBe(400)
        expect(res2.statusCode).toBe(400)
    });

    //=============================================================== 
    // GET USER BY ID
    //===============================================================

    // Benutzer finden mit seiner ID
    it('GET /api/v1/users/:id muss 200 zurückgeben', async () =>  {
        const created = await request(app)
        .post('/api/v1/users')
        .send({name: 'Max', email: 'max@example.com'})
        const id = created.body.id;

        const res = await request(app)
        .get(`/api/v1/users/${id}`)

        expect(res.statusCode).toBe(200)
        expect(res.body.id).toBe(id)
        expect(res.body.email).toBe('max@example.com')
        expect(res.body.name).toBe('Max')

    
    });

    // Benutzer nicht gefunden
    it('GET /api/v1/:id muss 400 zurückgeben', async () => {
        const res = await request(app)
        .get('/api/v1/users/UUID')
        expect(res.statusCode).toBe(400)
    
    });

    // Benutzer existiert nicht
    it('GET /api/v1/:id muss 404 zurückgeben', async () => {
        const res = await request(app)
        .get('/api/v1/users/00000000-0000-0000-0000-000000000000')

        expect(res.statusCode).toBe(404)
    
    });

    //=============================================================== 
    // UPDATE USER
    //===============================================================

    // Benutzerdaten aktualisieren
    it('PUT /api/v1/users/:id muss 200 zurückgeben ', async () => {
        const created = await request(app)
        .post('/api/v1/users')
        .send({name: 'Max', email: 'max@example.com'})

        const id = created.body.id;

        const res = await request(app)
        .put(`/api/v1/users/${id}`)
        .send({name: 'UPDATED', email: 'updated@example.com', role: 'ADMIN'})

        expect([200,204]).toContain(res.statusCode)

        if(res.statusCode === 200){
            expect(res.body.name).toBe('UPDATED')
            expect(res.body.email).toBe('updated@example.com')
            expect(res.body.role).toBe('ADMIN')
            
        }

        const getRes = await request(app)
        .get(`/api/v1/users/${id}`)

        expect(getRes.statusCode).toBe(200)
        expect(getRes.body.email).toBe('updated@example.com')

    })

    // Falsche Benutzer Rolle
    it('PUT /api/v1/users/:id muss 400 zurückgeben', async () => {
        const created = await request(app)
        .post('/api/v1/users')
        .send({name: 'Max', email: 'max@example.com'})

        const id = created.body.id;

        const res = await request(app)
        .put(`/api/v1/users/${id}`)
        .send({name: 'Max', email: 'updated@example.com', role: 'SUPERADMIN'})

        expect(res.statusCode).toBe(400)
    
    });


    // E-Mail existiert bereits
    it('PUT /api/v1/users/:id muss 409 zurückgeben', async () => {
        
        const u1 = await request(app)
        .post('/api/v1/users')
        .send({name: 'User1', email: 'u1@example.com'})

        const id = u1.body.id;

        const u2 =  await request(app)
        .post('/api/v1/users/')
        .send({name: 'User2', email: 'u2@example.com'})

        const res = await request(app)
        .put(`/api/v1/users/${u2.body.id}`)
        .send({name: 'User2', email: 'u1@example.com', role: 'USER'})
        
        expect(res.statusCode).toBe(409)
        
    });

    //=============================================================== 
    // DELETE USER
    //===============================================================
    
    // Benutzer Löschen
    it('DELETE /api/v1/users/:id muss 204 zurückgeben', async () => {
        const created = await request(app)
        .post('/api/v1/users')
        .send({name: 'Max', email: 'max@example.com'})

        const id = created.body.id;

        const res = await request(app)
        .delete(`/api/v1/users/${id}`)

        expect(res.statusCode).toBe(204)

        const res2 = await request(app)
        .get(`/api/v1/users/${id}`)
        expect(res2.statusCode).toBe(404)
    });

    // Benutzer kann nicht gelöscht werden weil er nicht existiert
    it('DELETE /api/v1/users/:id muss 404 zurückgeben', async () => {
        const res = await request(app)
        .delete('/api/v1/users/00000000-0000-0000-0000-000000000000')
        
        expect(res.statusCode).toBe(404)
    
    })

    //=============================================================== 
    // LIST USER
    //===============================================================

    it('GET /api/v1/users muss 200 zurückgeben', async () => {
        await request(app)
        .post('/api/v1/users')
        .send({name: 'AAA', email: 'a@ex.com'})

        await request(app)
        .post('/api/v1/users')
        .send({name: 'BBB', email: 'b@ex.com'})

        const res = await request(app)
        .get('/api/v1/users')

        expect(res.statusCode).toBe(200)
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length).toBe(2)
        

    })

})