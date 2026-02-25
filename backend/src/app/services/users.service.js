import {pool} from '../../db/pool'

export const usersService = {

    // Benutzer Erstellen
    async createUser({name, email}){
        const normalizedEmail = email.trim().toLowerCase()
        try {
            const {rows} = await pool.query(
                `INSERT INTO users (name, email)
                VALUES ($1, $2)
                RETURNING id, name, email, role, created_at`,
                [name.trim(), normalizedEmail] 
            )
            const user = rows[0]
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.created_at,
            }
        } catch(e) {
            if(e?.code === '23505') {
                console.log(e.code)
                const error = new Error('E-Mail existiert bereits')
                error.statusCode = 409
                throw error
            }
            throw e
        }
       
    },

    // Einzelne Benutzer abfragen
    async getUserById(id){
        const { rows } = await pool.query(
            `SELECT id, name, email, role, created_at
             FROM users
             WHERE id = $1`,
             [id]
        )
        return rows[0] ? {
            id: rows[0].id,
            name: rows[0].name,
            email: rows[0].email,
            role: rows[0].role,
            createdAt: rows[0].created_at,

        } : null
    },

    // Benutzerdaten ändern
    async updateUser(id, {name, email, role}){
        try { 
            const {rows} = await pool.query (
                `UPDATE users
                 SET name = $1,
                     email = $2,
                     role = $3
                 WHERE id = $4
                 RETURNING id, name, email, role, created_at`,
                 [name.trim(), email.trim().toLowerCase(), role, id]
            )
            return rows[0] ?? null
        } catch (e) {
            if(e?.code === '23505') {
                const error = new Error('E-Mail existiert bereits')
                error.statusCode = 409
                throw error
            }
            throw e
        }

    },

    // User löschen
    async deleteUser(id){
        const {rows} = await pool.query(
            `DELETE FROM users
             WHERE id = $1
             RETURNING id`,
             [id]
        )
        return rows[0] ?? null
    },
    
    // Alle Benutzer anzeigen
    async listUsers(){
        const {rows} = await pool.query(
            `SELECT id, name, email, role, created_at
             FROM users
             ORDER BY created_at DESC`
        )
        return rows.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.created_at,
        }))

    },
}



