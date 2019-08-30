const PastaController = require('../controllers/PastaController');
const permissoes = require('../middlewares/permissoes');

module.exports = app => {
    app.route('/pastas')
        .get(permissoes('COMUM'), PastaController.list)
        .post(permissoes('COMUM'), PastaController.insert);

    app.route('/pastas/:id')
        .get(permissoes('COMUM'), PastaController.findById)
        .put(permissoes('COMUM'), PastaController.update)
        .delete(permissoes('COMUM'), PastaController.delete);

    app.route('/pastas/:pasta/gh/:ghuser')
        .get(permissoes('COMUM'), PastaController.insertGHnaPasta) // inserir usuario github na pasta
        .post(permissoes('COMUM'), PastaController.insertTagGHPasta); // inserir tag
}