const express = require("express");
const router = express.Router();
const db = require('./data/pg');

module.exports = router;

router
    .get("/", (req, res) => {
        res.json("Hello world!!");
    })
    .get("/quizz",
        async (req, res) => {
            const result = await db.query('select * from quizz');
            res.json(result.rows);
        })
    .get('/quizz/:id',
        async (req, res) => {
            const result = await db.query('select * from quizz where id =$1', [req.params.id]);
            res.json(result.rows);
        })
    .get('/questions',
        async (req, res) => {
            const result = await db.query('select * from question');
            res.json(result.rows);
        })
;

