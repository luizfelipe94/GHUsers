process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const chai = require('chai');
const should = chai.should();

// models
const GHU = require('../models/GithubUserModel').GithubUser;
const Pasta = require('../models/PastaModel');
const Usuario = require('../models/UsuarioModel');

const server = require('../index');
const request = require('supertest')(server);

const auth = {};

function logar(auth) {
    return function(done) {
        request
        .post('/login')
        .send({
            "email": "admin@teste.com",
            "senha": "123456"
        })
        .expect(200)
        .end(onResponse);

        function onResponse(err, res) {
            if (err) return done(err);
            auth.token = res.body.token;
            return done();
        }
    };
}

// testar permissoes
// ......

describe('Github Users', () => {

    it('Deve retornar status 401. Não é passado o token.', done => {
        request
        .get('/github')
        .expect(401)
        .end((err, res) => {
            if (err) return done(err);
            done();
        });
    });

    beforeEach(logar(auth));

    it('Retorna status 200 se conseguir logar.', done => {
        request
        .get('/github')
        .set('Authorization', auth.token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            if (err) return done(err);
            res.body.usuarios.should.be.instanceof(Array);
            done();
        });
    });

    it('Pesquisa um usuário na api do github', done => {
        request
        .get('/github/luizfelipe94')
        .set('Authorization', auth.token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            if (err) return done(err);
            chai.assert.hasAnyKeys(res.body, ['login', 'nome', 'bio', 'localidade', 'html_url']);
            done();
        });
    });

    it('Salva um usuário do github no banco.', done => {
        GHU.deleteMany({})
        .then(() => {
            request
            .get('/github/luizfelipe94?salvar=true')
            .set('Authorization', auth.token)
            .expect(201)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                chai.assert.hasAllKeys(res.body, ['_id', 'login', 'nome', 'bio', 'localidade', 'html_url', '__v']);
                done();
            });
        });        
    });

    it('Tenta salvar um usuário já cadastrado.', done => {
        request
        .get('/github/luizfelipe94?salvar=true')
        .set('Authorization', auth.token)
        .expect(409)
        .expect('Content-Type', /json/)
        .end((err, res) => {
            if (err) return done(err);
            chai.assert.isFalse(res.body.sucesso, 'Não é pra salvar mesmo.');
            done();
        });
    });
});