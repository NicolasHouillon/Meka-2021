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
    .get('/questions/:id',
        async (req, res) => {
            const result = await db.query('select * from question where id=$1', [req.params.id]);
            res.json(result.rows);
        })
    .get('/quizz/questions/:id',
        async (req, res) => {
            const result = await db.query('select * from question where quizz_id=$1', [req.params.id]);
            res.json(result.rows);
        })

    .get('/anwser/:id',
        async (req, res) => {
            const result = await db.query('select * from anwser where que_id=$1', [req.params.id]);
            res.json(result.rows);
        })
    .get("/keyword",
        async (req, res) => {
            const result = await db.query('select * from keyword');
            res.json(result.rows);
        })
    .get('/searchByKeyword',
        async (req, res) => {
            const result = await db.query('select * from quizz left join keyword on quizz.id = keyword.quizz_id');
            res.json(result.rows);
        })
    .get('/quizz/newQuestions/:id',
        async (req, res) => {
            const result = await db.query('select * from quizz where id = $1',
                [req.params.id]);
            res.json(result.rows);
        })
    .get('/getQuestion/:id',
        async (req, res) => {
            const result = await db.query('select id from question where quizz_id = $1 order by id desc limit 1',
                [req.params.id]);
            res.json(result.rows);
    })

    .get('/quizz/addAnswer/:id',
        async (req, res) => {
            const result = await db.query('select * from question where id = $1',
                [req.params.id]);
            res.json(result.rows);
        })
    .get('/searchUser/:username',
        async (req, res) => {
            const result = await db.query('select id, per_password from person where per_username=$1',
                [req.params.username]
            );
            res.json(result.rows);
        })
    .get('/score/:id',
        async (req, res) => {
            const result = await db.query('select per_score from person where id=$1', [req.params.id]);
            res.json(result.rows);
        })
    .post('/edit/score/:id',
        async (req, res) => {
            console.log(req);
            await db.query('update person set per_score=$1 where id=$2',
                [req.body.score, req.params.id]
            );
            res.status(201).end()
        })
    .post("/signup", async (req, res) => {
        try {
            bcrypt.hash(req.body.per_password, saltRounds, async (err
                , hash) => {
                const result = await db.query('insert into person (per_username, per_password) values ($1,$2)returning id',
                    [req.body.per_username, hash]
                );
                return res.sendStatus(201);
            });
        } catch (err) {
            console.error("ERROR SIGNUP:", err);
            res.sendStatus(401);
        }
    })

    .post("/token",
        async (req, res) => {
        try {
            const result = await db.query('select id, per_password from person where per_username=$1',
                [req.body.per_username]
            );
            const match = await bcrypt.compare(req.body.per_password,
                result.rows[0].per_password);
            if (match) {
                const token = jwt.sign({id: result.rows[0].id
                    ,}, cfg.jwtSecret, {expiresIn: '1h'});
                return res.json({token: token});
            }
            res.sendStatus(200);
        } catch (err) {
            console.error("ERROR TOKEN:", err); res.sendStatus(401);
        } })

    .post('/quizz/new',
        async (req, res) => {
            try {
                await db.query('insert into quizz(qui_name,qui_image,person_id) values($1,$2,$3)',
                    [req.body.qui_name,req.files.qui_image.name,req.body.person_id]
                );
                const response = await db.query('select id from quizz where qui_name = $1', [req.body.qui_name]);
                await db.query('insert into keyword(key_value, quizz_id) values($1,$2)',
                    [req.body.key_value, response.rows[0].id])
                await req.files.qui_image.mv(__dirname + '/img/' + req.files.qui_image.name);
                res.sendStatus(201);
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        })

    .post('/quizz/newQuestion',
        async (req, res) => {
            try {
                await db.query('insert into question(que_state, que_points, que_is_image, quizz_id) values($1,$2,$3,$4)',
                    [req.body.que_state,req.body.que_points,req.body.que_is_image, req.body.quizz_id]
                );
                res.sendStatus(201);
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        })

    .post('/quizz/newAnswer',
        async (req, res) => {
            try {
                await db.query('insert into anwser(anw_is_true, anw_state, que_id) values($1,$2,$3)',
                    [req.body.anw_is_true,req.body.anw_state,req.body.que_id]
                );
                res.sendStatus(201);
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        })
    .delete('/deleteQuizz/:id',
        async (req, res) => {
            try {
                await db.query('delete from quizz where id=$1',
                    [req.params.id]);
                res.sendStatus(201);
            } catch (err) {
                console.error(err);
                res.sendStatus(500);
            }
        }
    )
    .use((req, res) => {
        res.status(404);
        res.json({
            error: "Page not found"
        });
    });

