const GithubUserController = require('../controllers/GithubUserController');
const permissoes = require('../middlewares/permissoes');

module.exports = app => {
    app.route('/github')
        .get(permissoes('ADMIN', 'COMUM'), GithubUserController.list);

    app.route('/github/:usuario')
        .get(permissoes('ADMIN'), GithubUserController.findUser);
}