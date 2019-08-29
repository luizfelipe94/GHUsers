const UsuarioController = require('../controllers/UsuarioController');

module.exports = app => {
    app.route('/usuarios')
        .get(UsuarioController.list)
        .post(UsuarioController.insert);
    
    app.route('/usuarios/:id')
        .get(UsuarioController.findById);
}