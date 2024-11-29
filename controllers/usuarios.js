const { response , request } = require ('express');

const usuariosGet = (req = request, res = response) => {
    const {qry="", nombre="", apikey=""} = req.query;

    res.json({
        msg: 'api GET - cotrolador',
        QRY: qry,
        NOMBRE: nombre,
        APIKEY: apikey
    });
}
const usuariosPost = (req = request, res = response) => {
    const {nombre="",edad=""} = req.body;

    res.json({
        msg: 'api POST - cotrolador',
        nombre, edad
    });
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