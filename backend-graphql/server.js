const app = require('./src/app');

const {
    PORT
} = require('./src/config/env');

async function start() {

    app.listen(PORT, () => {

        console.log(`
╔════════════════════════════════════════════════════════════════╗
║   🚀 Backend GraphQL rodando!                                  ║
╠════════════════════════════════════════════════════════════════╣
║   📡 Porta: ${PORT}                                            ║
║   ✅ Health: http://localhost:${PORT}/health                   ║
╚════════════════════════════════════════════════════════════════╝
        `);
    });
}

start();