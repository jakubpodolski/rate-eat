const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => console.log("Hello"));

app.listen(port, () => console.log(`Listening on ${port}`));

