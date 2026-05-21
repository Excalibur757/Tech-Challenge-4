const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

function setupMiddlewares(app) {

    app.use(express.json());

    app.use(cookieParser());

    app.use(cors({
        origin: [
            'http://localhost:3001',
            'http://localhost:3002',
            'http://localhost:3003'
        ],

        credentials: true,

        methods: [
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'OPTIONS'
        ],

        allowedHeaders: [
            'Content-Type',
            'Authorization'
        ]
    }));
}

module.exports = setupMiddlewares;