
const { request , response } = require ('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request , res = response, next ) => {

    const token = req.header('xtoken');

    if (!token){
        return res.status(401).json({
            msg: 'Error en la petición - token'
        });
    }

    try {
        
        const { uid } = jwt.verify (token , process.env.PRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario){
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe en BD'
            });
        }

        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - usuario en estado false'
            });
        }

        req.usuarioauth = usuario;
        next ();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: ' Token no válido '
        });
    }
    
}

module.exports = { validarJWT }