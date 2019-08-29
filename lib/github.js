const axios = require('axios').default;

class Github {
    constructor(){
        this._axios = axios.create({
            baseURL: 'https://api.github.com/users/'
        });
    }

    pesquisarUsuario(usuario){
        if(!usuario) throw new Error("Necessário passar o usuário.");
        return new Promise((resolve, reject) => {
            this._axios.get(usuario)
            .then(resp => resp.data)
            .then(resolve)
            .catch(reject);
        })
    }
}

module.exports = Github;