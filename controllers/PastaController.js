const Pasta = require('../models/PastaModel');
const GHModel = require('../models/GithubUserModel').GithubUser;
const Tag = require('../models/GithubUserModel').Tag;
const mongoose = require('mongoose');

const controller = {};
module.exports = controller;

controller.list = (req, res) => {
    Pasta.find()
    .then(resp => {
        return res.status(200)
        .json(resp);
    })
    .catch(err => {
        console.error(err);
        return res.status(500)
        .json('erro ao buscar pastas no banco de dados.');
    });
}

controller.insert = (req, res) => {
    const pastaData = new Pasta({
        nome: req.body.nome
    });
    pastaData.save(err => {
        if(err) return res.status(400).json('Não foi possível salvar esta pasta.');
    });
    return res.status(201).json(pastaData);
}

controller.findById = (req, res) => {
    const _id = req.params.id;
    return Pasta.findById(_id)
    .then(pasta => {
        const result = pasta || {};
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
    const _id = req.params.id;
    const pastaData = req.body;
    return Pasta.findByIdAndUpdate(_id, pastaData)
    .then(pasta => res.json(pasta))
    .catch(err => {
        console.error(err);
        return res.status(500)
        .json({
            sucesso: false,
            msg: 'Não foi possível atualizar a pasta.'
        });
    });
}

controller.delete = (req, res) => {
    const _id = req.params.id;
    return Pasta.deleteOne({ _id })
    .then(excluida => res.json('Pasta excluida com sucesso.'))
    .catch(err => {
        console.error(err);
        return res.status(500)
        .json({
            sucesso: false,
            msg: 'Não foi possível excluir a pasta.'
        });
    });
}

controller.insertGHnaPasta = async (req, res) => {
    const _idPasta = req.params.pasta;
    const _idGh = req.params.ghuser
    if(!_idPasta || !_idGh) return res.status(400).json('Id da pasta e do usuario do github são necessários.');
    try{

        const ghuser = await GHModel.findById(_idGh);

        if(!ghuser) return res.status(400).json('Não existe este usuário.');

        const pasta = await Pasta.findByIdAndUpdate(_idPasta, { '$addToSet': { 'GHs': ghuser } }, { 'new': true });

        if(!pasta) return res.status(400).json('Não existe esta pasta.');

        return res.status(200).json(pasta);
    }
    catch(e)
    {
        console.error(e);
        return res.status(500)
        .json('Erro na consulta.');
    }
}

controller.insertTagGHPasta = async (req, res) => {

    const _idPasta  = req.params.pasta;
    const _idGh     = req.params.ghuser
    const tag       = req.body.tag;

    if(!_idPasta || !_idGh || !tag) return res.status(400).json('Id da pasta, do usuario do github e a tag são necessários.');

    try{
        const ghuser = await GHModel.findById(_idGh);
        if(!ghuser) return res.status(400).json('Não existe este usuário.');

        // todas as patas que este usuario estiver.
        // const pastas = await Pasta.find()
        // .elemMatch('GHs', { '_id': mongoose.Types.ObjectId(_idGh) });

        const tagData = new Tag({ nome: tag });
        tagData.save(err => {
            if(err) return res.status(500).json('erro ao salvar a tag.');
        });

        if(tagData){
            await GHModel.findByIdAndUpdate(_idGh, { '$push': { 'tags': tagData._id } }, { 'new': true } );
            GHModel.find()
            .populate('tags')
            .exec((err, gh) => {
                return err ? res.json(err) : res.json(gh);
            });
        }
    }
    catch(e){
        console.error(e);
        return res.status(500)
        .json('Erro na consulta.');
    }
}