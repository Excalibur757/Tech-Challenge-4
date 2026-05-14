const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../database/usuarios.json');

async function getUsuarios() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        const inicial = { usuarios: [] };
        await saveUsuarios(inicial);
        return inicial;
    }
}

async function saveUsuarios(data) {
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

async function findUserByEmail(email) {
    const db = await getUsuarios();
    return db.usuarios.find(u => u.email === email);
}

async function findUserById(id) {
    const db = await getUsuarios();
    return db.usuarios.find(u => u.id === id);
}

async function createUser(userData) {
    const db = await getUsuarios();

    db.usuarios.push(userData);

    await saveUsuarios(db);

    return userData;
}

async function updateUser(updatedUser) {
    const db = await getUsuarios();

    db.usuarios = db.usuarios.map(user =>
        user.id === updatedUser.id ? updatedUser : user
    );

    await saveUsuarios(db);

    return updatedUser;
}

module.exports = {
    getUsuarios,
    saveUsuarios,
    findUserByEmail,
    findUserById,
    createUser,
    updateUser
};