import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pool } from './pool.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.join(__dirname, 'migrations');


// Neue Migration durchführen
async function migrate(){
    await pool.query(`CREATE TABLE IF NOT EXISTS migrations(
        filename TEXT PRIMARY KEY,
        applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );`
    )


    const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort()
    
    for(const filename of files) {
        const applied = await pool.query(`SELECT 1 FROM migrations WHERE filename = $1`, [filename])
        if(applied.rowCount > 0) continue

        const sql = fs.readFileSync(path.join(migrationsDir, filename), 'utf8')
        
        await pool.query('BEGIN')
        try {
            await pool.query(sql)
            await pool.query('INSERT INTO migrations(filename) VALUES ($1)', [filename])
            await pool.query('COMMIT')
            console.log(`Akzeptiert: ${filename}`)
        } catch (e) {
            await pool.query('ROLLBACK')
            throw e
        }
    }
    await pool.end()
}


migrate().catch(e => {
    console.error(e)
    process.exit(1)
})