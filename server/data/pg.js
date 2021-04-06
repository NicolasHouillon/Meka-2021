const {Pool} = require('pg');
const pool = new Pool({
    user: '<votre nom de login sur postgresql>',
    host: 'localhost',
    database: '<le nom de votre db>',
    password: '<le mot de passe associé>',
    port: 5432
});

pool.on('connect', client => {
    client.query('set search_path to quizz')
});
