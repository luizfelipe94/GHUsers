const mongoose = require('mongoose');

function connect(url) {
    mongoose.connection
        .on('error', (err) => {
            console.log('Erro ao conectar no banco de dados.');
            process.exit(1);
        })
        .on('disconnected', connect);

    return mongoose.connect(url, 
        { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
}

module.exports = connect;