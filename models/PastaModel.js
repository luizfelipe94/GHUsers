const mongoose = require('mongoose');

const PastaSchema = new mongoose.Schema({
    nome:   { type: String, required: true },
    GHs:    { type: Array },
    tags:   { type: Array }
});

const Pasta = mongoose.model('Pasta', PastaSchema);

module.exports = Pasta;