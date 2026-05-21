const logger = require('../utils/logger');

const {
    MAX_LOGIN_ATTEMPTS,
    LOCKOUT_TIME
} = require('../config/env');

const loginAttempts = new Map();

function getLoginAttemptInfo(email) {
    const normalizedEmail = email.toLowerCase();

    const info = loginAttempts.get(normalizedEmail);

    if (!info) {
        return {
            attempts: 0,
            lockoutUntil: null,
            remainingAttempts: MAX_LOGIN_ATTEMPTS
        };
    }

    if (info.lockoutUntil && Date.now() > info.lockoutUntil) {
        loginAttempts.delete(normalizedEmail);

        return {
            attempts: 0,
            lockoutUntil: null,
            remainingAttempts: MAX_LOGIN_ATTEMPTS
        };
    }

    return {
        attempts: info.attempts,
        lockoutUntil: info.lockoutUntil,
        remainingAttempts: Math.max(
            0,
            MAX_LOGIN_ATTEMPTS - info.attempts
        )
    };
}

function recordFailedAttempt(email) {
    const normalizedEmail = email.toLowerCase();

    const existing =
        loginAttempts.get(normalizedEmail) || {
            attempts: 0,
            lockoutUntil: null
        };

    existing.attempts++;
    existing.lastAttempt = Date.now();

    if (
        existing.attempts >= MAX_LOGIN_ATTEMPTS &&
        !existing.lockoutUntil
    ) {
        existing.lockoutUntil =
            Date.now() + LOCKOUT_TIME;

        logger.security(
            'Conta bloqueada por excesso de tentativas',
            {
                email: normalizedEmail
            }
        );
    }

    loginAttempts.set(normalizedEmail, existing);

    return {
        attempts: existing.attempts,
        remainingAttempts: Math.max(
            0,
            MAX_LOGIN_ATTEMPTS - existing.attempts
        ),
        isLocked:
            existing.lockoutUntil &&
            existing.lockoutUntil > Date.now(),
        lockoutUntil: existing.lockoutUntil
    };
}

function resetLoginAttempts(email) {
    loginAttempts.delete(email.toLowerCase());
}

function getRemainingLockoutTime(email) {
    const info =
        loginAttempts.get(email.toLowerCase());

    if (
        info &&
        info.lockoutUntil &&
        Date.now() < info.lockoutUntil
    ) {
        return Math.ceil(
            (info.lockoutUntil - Date.now()) / 1000
        );
    }

    return 0;
}

module.exports = {
    loginAttempts,
    getLoginAttemptInfo,
    recordFailedAttempt,
    resetLoginAttempts,
    getRemainingLockoutTime
};