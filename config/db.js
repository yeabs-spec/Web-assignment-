const { Pool } = require('pg');
require('dotenv').config({ override: true });

const pool = new Pool({
    user: process.env.DB_USER || process.env.user,
    host: process.env.DB_HOST || process.env.host,
    port: Number(process.env.DB_PORT || process.env.port || 5432),
    database: process.env.DB_NAME || process.env.database,
    password: process.env.DB_PASSWORD || process.env.password
});

module.exports = pool;
