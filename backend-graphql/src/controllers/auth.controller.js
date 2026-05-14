const authService =
    require('../services/auth.service');

async function verificarToken(args, context) {

    const token =
        context.req.cookies?.token;

    return await authService.verificarToken(
        token
    );
}

async function meuPerfil(args, context) {

    const token =
        context.req.cookies?.token;

    return await authService.meuPerfil(
        token
    );
}

async function emailExiste({ email }) {

    return await authService.emailExiste(
        email
    );
}

async function getLoginStatus({ email }) {

    return await authService.getLoginStatus(
        email
    );
}

async function cadastro(
    { email, senha, nome },
    context
) {

    const result =
        await authService.cadastro(
            email,
            senha,
            nome
        );

    context.res.cookie(
        'token',
        result.token,
        {
            httpOnly: true,

            secure: false,

            sameSite: 'lax',

            maxAge:
                7 * 24 * 60 * 60 * 1000
        }
    );

    return result;
}

async function login(
    { email, senha },
    context
) {

    const result =
        await authService.login(
            email,
            senha
        );

    context.res.cookie(
        'token',
        result.token,
        {
            httpOnly: true,

            secure: false,

            sameSite: 'lax',

            maxAge:
                7 * 24 * 60 * 60 * 1000
        }
    );

    return result;
}

async function logout(args, context) {

    context.res.clearCookie('token');

    return await authService.logout();
}

module.exports = {
    verificarToken,
    meuPerfil,
    emailExiste,
    getLoginStatus,
    cadastro,
    login,
    logout
};