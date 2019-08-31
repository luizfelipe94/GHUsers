const Usuario = require('../models/UsuarioModel');
const Helper = require('../lib/helper');

const controller = {};
module.exports = controller;

controller.insert = (req, res) => {

    let { email, cpf, senha, perfil } = req.body;
    
    if(!cpf || !senha || !perfil) return res.status(400).json({msg: "Todos os dados são obrigatórios!"});

    if(!Helper.validarEmail(email)) return res.status(400).json({msg: "Email inválido."});
    if(!Helper.validarCPF(cpf)) return res.status(400).json({msg: "CPF inválido."});
    if(!Helper.validarSenha(senha)) return res.status(400).json({msg: "A senha deve ter no mínimo 6 digitos."});

    perfil = perfil.toUpperCase();

    const userData = new Usuario({ email, cpf, senha, perfil });

    // aqui tbm valida os campos no mongoose validator.
    userData.save()
    .then(usuario => {
        return res.status(201)
        .json({
            sucesso: true,
            msg: 'Usuário cadastrado com sucesso.',
            usuario
        })
    })
    .catch(err => {
        console.error(err);
        return res.status(500)
        .json({
            sucesso: false,
            msg: 'Erro ao salvar o usuário.'
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

