const GithubUserModel   = require('../models/GithubUserModel').GithubUser;
const Pasta             = require('../models/PastaModel');
const Github            = require('../lib/github');

const gh = new Github();

const controller = {};
module.exports = controller;

controller.findUser = async (req, res) => {
    const usuario = req.params.usuario;
    const githubData = await gh.pesquisarUsuario(usuario).catch(err => res.status(200).json('Usuário não encontrado.'));

    const persistir = req.query.salvar || false;

    if(!persistir){
        return res.status(200).json(githubData);
    }else{
        const { login, name, bio, location, html_url } = githubData;

        const GHUserData = new GithubUserModel({
            login: login,
            nome: name,
            bio: bio,
            localidade: location,
            html_url
        });
    
        GHUserData.save(err => {
            if(err) return res.status(500).json('Não foi possível salvar o úsuario no banco de dados.');
            return res.status(201).json(GHUserData);
        });
    }
}

controller.list = (req, res) => {
    try{
        GithubUserModel.find()
        .populate('tags')
        .exec((err, results) => {
            return res.status(200)
                .json({
                    total: results.length,
                    usuarios: results
                });
        });
        // .then(resp => {
        //     return res.status(200)
        //     .json({
        //         total: resp.length,
        //         usuarios: resp
        //     });
        // });
    }catch(e){
        console.error(e);
        return res.status(500)
        .json({
            msg: "Algum erro ocorreu ao pesquisar os usuários do github."
        });
    }
}