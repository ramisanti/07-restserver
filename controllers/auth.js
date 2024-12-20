
const { response , request } = require ('express');

const bcryptjs = require ('bcryptjs');

const { generarJWT } = require('../helpers/generarJWT');

const Usuario = require('../models/usuario');

const login = async (req , res = response) => {

    const {email,password} = req.body;

    try {

        //verificar si el email está en BD
        const usuario = await Usuario.findOne({email})
        if (!usuario){
            return res.status(400).json({
                msg:'usuario/password no son correctos - correo'
            });
        }

        //verificar el usuario está activo
        if (!usuario.estado){
            return res.status(400).json({
                msg:'usuario/password no son correctos - estado'
            });
        }

        //verificar la contraseña correcta
        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if (!validPassword){
            return res.status(400).json({
                msg:'usuario/password no son correctos - password'
            });
        }

        //generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario, 
            token
        });
        
    } catch (error) {
        console.log (error);
        res.status(500).json({
            msg: 'Conectae al administrador'
        });
    }
}

module.exports = {login}
