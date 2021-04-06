const express = require('express');
const router = require('./router');

const app = express();
const port = process.env.PORT || 8000;

app.use(router); // Requests processing will be defined in the file router
app.listen(port, () => console.log('Server app listening on port ' + port));
