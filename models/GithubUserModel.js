const mongoose = require('mongoose');

const GithubUserSchema = new mongoose.Schema({
    login:       { type: String, unique: true },
    nome:        { type: String },
    bio:         { type: String },
    localidade:  { type: String },
    html_url:    { type: String },
    tags:        { type: Array }
});

const GithubUser = mongoose.model('GithubUser', GithubUserSchema);

module.exports = GithubUser;