const { response , request } = require ('express');
const Usuario = require ('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    const {qry="", nombre="", apikey=""} = req.query;

    res.json({
        msg: 'api GET - cotrolador',
        QRY: qry,
        NOMBRE: nombre,
        APIKEY: apikey
    });
}
const usuariosPost = async (req , res = response) => {
    const body = req.body;
    const usuario = new Usuario(body);

    res.json({
        msg: 'api POST - cotrolador',
        usuario
    });

    try {
        await usuario.save();
        console.log("Registro grabado!!");

    } catch (error) {
        console.log("Error en la actualizacion!!");
    }
}
const usuariosPut = (req, res = response) => {
    const { idUser } = req.params;
   
        res.json({
            msg: 'api PUT - Id de Usuario:' + idUser
        });
    
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'api DELETE - cotrolador'
    });
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'api PATCH - cotrolador'
    });
}

module.exports = {
    usuariosGet, 
    usuariosDelete,
    usuariosPost,
    usuariosPut,
    usuariosPatch
}