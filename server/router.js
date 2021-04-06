const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./data/pg');

const auth = require("./auth.js")();
const cfg = require("./config.js");
const pool = require('./data/pg');

const saltRounds = 10;

const router = express.Router(); module.exports = router;
module.exports = router;

router
    .use(auth.initialize())
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

    .post("/signup", async (req, res) => {
        try {
            bcrypt.hash(req.body.password, saltRounds, async (err
                , hash) => {
                const result = await db.query('insert into person (username, password) values ($1,$2)returning id',
                    [req.body.username, hash]
                );
                return res.sendStatus(201);
            });
        } catch (err) {
            console.error("ERROR SIGNUP:", err);
            res.sendStatus(401);
        }
    })

    .post("/token", async (req, res) => {
        try {
            const result = await db.query('select id, password from person where username=$1',
                [req.body.username]
            );
            const match = await bcrypt.compare(req.body.password,
                result.rows[0].password);
            if (match) {
                const token = jwt.sign({id: result.rows[0].id
                    ,}, cfg.jwtSecret, {expiresIn: '1h'});
                return res.json({token: token});
            }
            res.sendStatus(200);
        } catch (err) {
            console.error("ERROR TOKEN:", err); res.sendStatus(401);
        } })

    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        });
    });

