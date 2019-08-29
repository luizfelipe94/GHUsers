const LoginController = require('../controllers/LoginController');

module.exports = app => {
    app.route('/login')
        .post(LoginController.login);
}