const express = require('express');

const {
    graphqlHTTP
} = require('express-graphql');

const cookieParser =
    require('cookie-parser');

const cors =
    require('cors');

const schema =
    require('./graphql/schema');

const root =
    require('./graphql/resolvers');

const {
    getUsuarios
} = require('./repositories/user.repository');

const app = express();

const setupMiddlewares =
    require('./middlewares/index.js');

const routes =
    require('./routes/index.js');

// Middlewares
setupMiddlewares(app);

// Routes
app.use(routes);

module.exports = app;