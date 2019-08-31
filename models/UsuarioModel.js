const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
    email:  { 
        type: String, 
        required:   [true, 'Necessário informar o email.'], 
        match:      [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email inválido'] ,
        unique:     true, 
    },
    cpf:    { type: Number, required: true, min: [11, 'Cpf inválido'], unique: true },
    senha:  { type: String, required: true, minlength: [6, 'Mínimo 6 digitos para a senha.'] },
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