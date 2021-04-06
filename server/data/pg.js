const {Pool} = require('pg');

const pool = new Pool({
    user: 'username',
    host: 'localhost',
    database: 'quizz',
    password: 'password',
    port: 5432
});

pool.on('connect', client => {
    client.query('set search_path to quizz')
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
    }
};
