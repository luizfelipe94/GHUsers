const mongoose = require('mongoose');

function connect() {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)

    return mongoose.connect(`mongodb://admin:abc123@ds335957.mlab.com:35957/heroku_1sh8s53r`, 
        { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
}

module.exports = connect;