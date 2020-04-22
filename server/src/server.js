const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const app = express();
const port = process.env.PORT || 8080;
const isDev = false;

const signup = require('./routes/account/signup');
const singin = require('./routes/account/signin');
const verify = require('./routes/account/verify');
const logout = require('./routes/account/logout');

const findLocation = require('./routes/map/findLocation');
const saveLocation = require('./routes/map/saveLocation');
const getAllLocations = require('./routes/map/getAllLocations');
const removeLocation = require('./routes/map/removeLocation');

const corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200,
    credentials: true,
}


mongoose.connect(isDev ? config.db_dev : config.db, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  }).then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));;

mongoose.Promise = global.Promise;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());


signup(app)
singin(app)
verify(app)
logout(app)

findLocation(app)
saveLocation(app)
getAllLocations(app)
removeLocation(app)

app.use(express.static(path.join(__dirname, 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build'))
})

app.listen(port, () => console.log(`Listening on ${port}`));