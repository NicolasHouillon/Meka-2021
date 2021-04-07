require('dotenv').config();
const {Pool} = require('pg');

const pool = new Pool({
    user: process.env.APP_USER,
    host: process.env.APP_HOST,
    database: process.env.APP_DB,
    password: process.env.APP_PASSWORD,
    port: process.env.APP_PORT
});

pool.on('connect', client => {
    client.query('set search_path to quizz')
});

module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
    }
};
