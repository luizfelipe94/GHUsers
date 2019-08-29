const GithubUserController = require('../controllers/GithubUserController');

module.exports = app => {
    app.route('/github')
        .get(GithubUserController.list);

    app.route('/github/:usuario')
        .get(GithubUserController.findUser);
}