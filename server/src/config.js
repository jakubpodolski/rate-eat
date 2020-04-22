require('dotenv').config();

module.exports = {
    db: `mongodb+srv://admin:${process.env.DB_PASS}@cluster0-hrnbj.mongodb.net/test?retryWrites=true&w=majority`,
    db_dev: 'mongodb://localhost:27017/rate_eat'
}