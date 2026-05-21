require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,

    JWT_SECRET:
        process.env.JWT_SECRET,

    MAX_LOGIN_ATTEMPTS:
        Number(process.env.MAX_LOGIN_ATTEMPTS) || 5,

    LOCKOUT_TIME:
        Number(process.env.LOCKOUT_TIME) || 60000
};