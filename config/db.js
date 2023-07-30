require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = ()=>{

    mongoose.connect(process.env.DATABASE_URI,{useNewUrlParser: true});

    const db = mongoose.connection;
    db.on('error', error=>console.error(error));
    db.once('open',()=>console.log('Connected to database..'));
}

module.exports = connectDB;

