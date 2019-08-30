const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
    email:  { type: String, required: true, min: 10, unique: true, lowercase: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
    cpf:    { type: String, required: true, min: 9, unique: true },
    senha:  { type: String, required: true, min: 6 },
    perfil: { type: String, required: true, enum: ['ADMIN', 'COMUM'], default: 'COMUM' }
});

UsuarioSchema.pre('save', function(next){
    if(this.senha){
        const salt = bcrypt.genSaltSync(10);
        this.senha = bcrypt.hashSync(this.senha, salt);
    }
    next();
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

module.exports = Usuario;