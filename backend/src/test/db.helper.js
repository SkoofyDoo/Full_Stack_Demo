import {pool} from '../db/pool.js'

// Lösche die Tabellen (Für die Tests)
export async function resetDB() {
    await pool.query('TRUNCATE TABLE users CASCADE;')
}

export async function closeDB(){
    await pool.end()
}
