import dotenv from 'dotenv'

dotenv.config()

/**
 * Hilfsfunktion zur Konvertierung von String zu Number
 * @param {string} value - Der zu prüfende Wert aus process.env
 * @param {number} fallback - Standardwert falls Konvertierung fehlschlägt
 * 
 * @returns {number}
 * 
 */

function toNumber(value, fallback) {
    const n = Number(value)
    // Prüft, ob der Wert eine endliche Zahl ist (Ausschluß von NaN und Infinity)
    return Number.isFinite(n) ? n : fallback
}
/**
 * Validierungsfunktion für erforderliche Umgebungsvariablen.
 * @param {string} key - Der Name der ENV Variable 
 * @throws {Error} Falls die Variable nicht definiert ist
 */
function required(key) {
    const value = (process.env[key]).trim();
    if (!value) {
        throw new Error(`Konfiguration Fehler: ENV Variable "${key}" fehlt`)
    }
    return value;
}

const env = (process.env.NODE_ENV || 'development').trim()
const isTest = env === 'test'
const isProd = env === 'production'

// Single Source of Truth (Zentraler Verwalter)
export const config = Object.freeze({
    // Aktuelle Laufzeitumgebung
    env: process.env.NODE_ENV || "development",

    // Port
    port: toNumber(process.env.PORT, 5000),

    // CORS - Einstallung
    clientUrl: process.env.NODE_ENV === 'production'
        ? required('CLIENT_URL')
        : (process.env.CLIENT_URL || 'http://localhost:5173'),
    
    // Konfiguration für RateLimiting
    rateLimit: {
        max: toNumber(process.env.RATE_LIMIT_MAX, 100),
        windowMs: toNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000)
    },
    
    // Konfiguration für DB PostgreSQL
    db: {
        host: isTest ? required('TEST_DB_HOST') : required('DB_HOST'),
        port: isTest ? required('TEST_DB_PORT') : required('DB_PORT'),
        user: isTest ? required('TEST_DB_USER') : required('DB_USER'),
        password: isTest ? required('TEST_DB_PASSWORD') : required('DB_PASSWORD'),
        name: isTest ? required('TEST_DB_NAME') : required('DB_NAME'),
    }
});