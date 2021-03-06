const mongoose = require('mongoose');
const { username, password, host, port, database } = require('../configs').mongo;


module.exports = () => {
    let options = {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        poolSize: 10,
        keepAlive: 1,
        connectTimeoutMS: 30000,
        useUnifiedTopology: true
    };

    const db = mongoose.connection;
    db.on('connecting', () => {
        console.log('connecting... to mongodb');
    });

    db.on('connected', () => {
        console.log('We are connected to mongodb');
    });
    db.on('error', (err) => {
        console.log('Error connecting to mongodb ');
        mongoose.disconnect()
    });

    db.on('disconnected', () => {
        console.log('Oops we are disconnected from mongodb');
        mongoose.connect(mongoDbUri, options)
    });

    const mongoDbUri = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin`;
    mongoose.connect(mongoDbUri, options);
}