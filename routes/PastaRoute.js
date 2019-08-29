const PastaController = require('../controllers/PastaController');

module.exports = app => {
    app.route('/pastas')
        .get(PastaController.list)
        .post(PastaController.insert);

    app.route('/pastas/:id')
        .get(PastaController.findById);
}