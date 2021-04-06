const {Pool} = require('pg');

const pool = new Pool({
    user: 'nicolashln',
    host: 'localhost',
    database: 'quizz',
    password: null,
    port: 5432
});

pool.on('connect', client => {
    client.query('set search_path to quizz')
});

module.exports = pool;
