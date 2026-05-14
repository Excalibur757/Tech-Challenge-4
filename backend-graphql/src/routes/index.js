const express = require('express');

const { graphqlHTTP } = require('express-graphql');

const schema =
    require('../graphql/schema');

const root =
    require('../graphql/resolvers');

const {
    getUsuarios
} = require('../repositories/user.repository');

const router = express.Router();

// GraphQL
router.use(
    '/graphql',

    graphqlHTTP((req, res) => ({
        schema,

        rootValue: root,

        graphiql: true,

        context: { req, res }
    }))
);

// Health check
router.get('/health', async (req, res) => {

    await getUsuarios();

    res.json({
        status: 'ok',
        timestamp:
            new Date().toISOString()
    });
});

// Home route
router.get('/', (req, res) => {

    res.json({
        message:
            'Backend GraphQL rodando! Acesse /graphql'
    });
});

module.exports = router;