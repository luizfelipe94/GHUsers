const Pasta = require('../models/PastaModel');

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
    Pasta.findById(_id)
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

}

controller.delete = (req, res) => {

}