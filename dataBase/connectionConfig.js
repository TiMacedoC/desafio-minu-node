const { Client } = require('pg');

const dbConnection = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'clientes_ecommerce',
    password: 'dbpass',
    port: 5432,
});

module.exports = dbConnection;
