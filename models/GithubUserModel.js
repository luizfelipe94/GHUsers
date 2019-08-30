const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    nome: String
});

const GithubUserSchema = new mongoose.Schema({
    login:       { type: String, unique: true },
    nome:        { type: String },
    bio:         { type: String },
    localidade:  { type: String },
    html_url:    { type: String },
    tags:        [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
});

GithubUserSchema.pre('find', function(){
    this.populate('tags');
});

const GithubUser = mongoose.model('GithubUser', GithubUserSchema);
const Tag = mongoose.model('Tag', TagSchema);

module.exports = { GithubUser, Tag };