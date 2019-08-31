module.exports = (...perfis) => {
    return (req, res, next) => {
        const perfilUsuario = req.user.usuario.perfil;
        // admin tem acesso a tudo.
        let autorizado = perfis.some(perfil => perfil === perfilUsuario); 
        if(autorizado){
            next();
        }else{
            return res.status(401)
            .json({
                sucesso: false,
                menssagem: 'Você não tem permissão para acessar este recurso.'
            });
        }
        // next();
    }
}