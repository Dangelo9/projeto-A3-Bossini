const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',       // Ex: localhost
  port: 5432,       // Ex: 5432 (padrão)
  database: 'postgres',
  user: 'postgres',
  password: 'root',
});

module.exports = pool;