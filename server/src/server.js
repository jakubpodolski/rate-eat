const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const app = express();
const port = process.env.PORT || 8080;
const isDev = true;

const signup = require('./routes/signup')


mongoose.connect(isDev ? config.db_dev : config.db, { 
    useUnifiedTopology: true,
    useNewUrlParser: true 
});

mongoose.Promise = global.Promise;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

signup(app)


app.get('/', (req, res) => console.log("Hello"));

app.listen(port, () => console.log(`Listening on ${port}`));