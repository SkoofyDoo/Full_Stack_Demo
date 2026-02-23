
import { createApp } from "./app/createApp.js";
import { config } from "./config/config.js";





console.log('DB Conntected')


const app = createApp(config);


// Server-Start
const server = app.listen(config.port, () => console.log(`Backend läuft auf dem Port: ${config.port}`));



// Fehlerbehandlung beim Server-Start
server.on('error', (error) => {
    console.error('Server Start-Fehler:', error)
    process.exit(1);
})

// Gracefull Shutdown: Dient dem sauberen Abschluß aller Serverdienste
const shutdown = (signal) => {
    console.log(`${signal} empfangen. Fahre herunter`)
    
    // Stoppt neue eingehende Verbindungen
    server.close(()=> {
        console.log('HTTP Server ist geschlossen.')
        process.exit(0);
    });

    // Sicherheits-Timeout: Falls offene Verbindungen hängen bleiben,
    // wird der Prozess nach 10 Sek beendet.
    setTimeout(() => {
        console.error('Erzwungener Schutdown nach Timeout');
        process.exit(1)

    }, 10_000).unref();
} 

// SIGTERM - Standard-Signal bei Container Shutdown
process.on('SIGTERM', () => shutdown('SIGTERM'));

// SIGINT - Standard-Signal Ctrl + C im Terminal
process.on('SIGINT', () => shutdown('SIGINT'));