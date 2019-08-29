const mongoose = require('mongoose');

function connect() {
    mongoose.connection
        .on('error', console.log)
        .on('disconnected', connect)

    return mongoose.connect(`mongodb://localhost:27017/github-users`, 
        { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
}

module.exports = connect;