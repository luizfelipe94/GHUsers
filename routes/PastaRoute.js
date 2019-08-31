const PastaController = require('../controllers/PastaController');
const permissoes = require('../middlewares/permissoes');

module.exports = app => {
    app.route('/pastas')
        .get(permissoes('COMUM', 'ADMIN'), PastaController.list)
        .post(permissoes('COMUM', 'ADMIN'), PastaController.insert);

    app.route('/pastas/:id')
        .get(permissoes('COMUM', 'ADMIN'), PastaController.findById)
        .put(permissoes('COMUM', 'ADMIN'), PastaController.update)
        .delete(permissoes('COMUM', 'ADMIN'), PastaController.delete);

    app.route('/pastas/:id/tag')
        .post(permissoes('COMUM', 'ADMIN'), PastaController.insertTag);

    app.route('/pastas/:pasta/gh/:ghuser')
        .get(permissoes('COMUM', 'ADMIN'), PastaController.insertGHnaPasta) // inserir usuario github na pasta
        // .post(permissoes('COMUM', 'ADMIN'), PastaController.insertTagGHPasta); // inserir tag
}