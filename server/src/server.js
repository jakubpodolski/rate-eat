const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const app = express();
const port = process.env.PORT || 8080;
const isDev = true;

const signup = require('./routes/signup');
const singin = require('./routes/signin');
const verify = require('./routes/verify');
const logout = require('./routes/logout');

const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200,
    credentials: true,
}


mongoose.connect(isDev ? config.db_dev : config.db, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
});

mongoose.Promise = global.Promise;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// TO BE REMOVED
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

signup(app)
singin(app)
verify(app)
logout(app)


app.get('/', (req, res) => console.log("Hello"));

app.listen(port, () => console.log(`Listening on ${port}`));