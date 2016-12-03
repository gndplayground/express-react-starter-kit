import mongoose from 'mongoose';

import ENV from './config';

mongoose.Promise = require('bluebird');

const connection = mongoose.connect(ENV.DB_CONNECTION);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Can not connect to mongodb server. Please check the settings'));

db.once('open', function () {
    console.log('Connected to db')
});

export {connection}