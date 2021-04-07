const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('combined'))
    .use('/img', express.static('img'))
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({extended: true}))
    .use(router)
    .listen(port, () => {
        console.log("listening on port", port);
    });
