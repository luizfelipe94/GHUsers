const Usuario = require('../models/UsuarioModel');

const controller = {};
module.exports = controller;

controller.insert = (req, res) => {
    let { email, cpf, senha, perfil } = req.body;
    if(!email || !cpf || !senha || !perfil) return res.status(400).json({msg: "Todos os dados são obrigatórios!"});
    perfil = perfil.toUpperCase();
    const userData = new Usuario({ email, cpf, senha, perfil });
    userData.save(err => {
        if(err) return res.status(500).json({ sucesso: false, msg: 'Não foi possível cadastrar o usuário no banco de dados.' });;
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

}

controller.delete = (req, res) => {

}

