const Usuario = require('../models/UsuarioModel');

const controller = {};
module.exports = controller;

controller.insert = (req, res) => {
    let { email, cpf, senha, perfil } = req.body;
    if(!email || !cpf || !senha || !perfil) return res.status(400).json({msg: "Todos os dados são obrigatórios!"});
    perfil = perfil.toUpperCase();
    const userData = new Usuario({ email, cpf, senha, perfil });
    userData.save(err => {
        if(err){
            if(err.name === 'MongoError' && err.code === 11000) return res.status(500).json('O email precisa ser único.');
            if(err.name = 'ValidationError') return res.status(500).json(err.message);
            return res.status(500).json(err);
        }
        return res.status(201)
        .json({ 
            sucesso: true,
            msg: 'Usuário cadastrado com sucesso!',
        });
    });
}

controller.list = (req, res) => {
    try{
        Usuario.find()
        .then(resp => {
            return res.status(200)
            .json({
                total: resp.length,
                usuarios: resp
            });
        });
    }catch(e){
        return res.status(500)
        .json({
            msg: "Algum erro ocorreu ao pesquisar os usuários."
        });
    }
}

controller.findById = (req, res) => {
    const _id = req.params.id;
    Usuario.findById(_id)
    .then(usuario => {
        const result = usuario || {};
        return res.status(200)
        .json(result);
    })
    .catch(err => {
        console.error(err);
        return res.status(500)
        .json({msg: "Id inválido!"});
    });
}

controller.update = (req, res) => {
    return res.status(501).json('Método ainda não implementado.');
}

controller.delete = (req, res) => {
    return res.status(501).json('Método ainda não implementado.');
}

