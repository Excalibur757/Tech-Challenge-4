const jwt = require('jsonwebtoken');

const {
    JWT_SECRET
} = require('../config/env');

const {
    getUsuarios
} = require('../repositories/user.repository');

function generateToken(user) {

    return jwt.sign(
        {
            userId: user.id,
            email: user.email
        },

        JWT_SECRET,

        {
            expiresIn: '7d'
        }
    );
}

async function getUserFromToken(token) {

    if (!token) {
        return null;
    }

    try {

        const decoded =
            jwt.verify(
                token,
                JWT_SECRET
            );

        const db =
            await getUsuarios();

        return db.usuarios.find(
            user =>
                user.id === decoded.userId
        ) || null;

    } catch (error) {

        console.error(
            '[TOKEN ERROR]',
            error.message
        );

        return null;
    }
}

module.exports = {
    generateToken,
    getUserFromToken
};