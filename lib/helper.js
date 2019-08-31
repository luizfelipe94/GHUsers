exports.validarEmail = email => {
    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'gm');
    return regex.exec(email);
}

exports.validarCPF = cpf => {
    const regex = new RegExp(/^[0-9]*/);
    return regex.exec(cpf) && cpf.length === 11;
}

exports.validarSenha = senha => {
    return senha.length >= 6;
}