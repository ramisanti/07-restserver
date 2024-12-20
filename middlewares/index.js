const  validaJWT  = require('../middlewares/valida-jwt');
const  validaCampos = require('../middlewares/valida-campos');
const  validaRoles  = require('../middlewares/validar-roles');


module.exports = {
    ...validaJWT,
    ...validaCampos,
    ...validaRoles
}