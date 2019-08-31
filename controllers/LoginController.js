const Usuario    = require('../models/UsuarioModel');
const jwt        = require('jsonwebtoken');
const bcrypt     = require('bcrypt');
const { secret } = require('../config/dev').jwt;

const controller = {};
module.exports = controller;

controller.login = async (req, res) => {
    const { email, senha } = req.body;
    if(!email || !senha) return res.status(400).json({msg: "É necessário passar o email e senha."});
    const usuarioData = await Usuario.find({ email });
    const usuario = usuarioData[0];
    
    if(usuario){
        if(bcrypt.compareSync(senha, usuario.senha)){
            usuario.senha = undefined;
            const payload = { usuario };
            const token = jwt.sign(payload, secret, { expiresIn: '2h' });
            return res.status(200).json({ user: usuario,  token });
        }else{
            return res.status(401)
            .json({
                msg: "Email ou senha inválidos."
            });
        }
    }

    return res.status(401)
    .json({
        msg: "Email ou senha inválidos."
    });
}