
const { Router }  = require ('express');
const { login } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/valida-campos');

const loginrouter = Router();

loginrouter.post('/login',[
        check('email','El correo es obligatorio!').isEmail(),
        check('password','La contraseña es obligatoria!').not().isEmpty(),
        validarCampos
    ],
    login);

module.exports = loginrouter;