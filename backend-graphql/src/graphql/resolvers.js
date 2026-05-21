const authController =
    require('../controllers/auth.controller');

module.exports = {

    verificarToken:
        authController.verificarToken,

    meuPerfil:
        authController.meuPerfil,

    emailExiste:
        authController.emailExiste,

    getLoginStatus:
        authController.getLoginStatus,

    cadastro:
        authController.cadastro,

    login:
        authController.login,

    logout:
        authController.logout
};