const { response , request } = require ('express');
const Usuario = require ('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {
    //const {q, nombre="", apikey, page=1, limit} = req.query;
    const qry = {estado:true};
    const {limite = 5, desde=0} = req.query;
    
    // const usuarios = await Usuario.find(qry)
    // .skip(Number(desde))
    // .limit(Number(limite));

    // const totalUsuarios = await Usuario.countDocuments(qry);
    
    //se mejora los 2 await con una promesa
    const [total, usuarios] = await Promise.all ([
        Usuario.countDocuments(qry),
        Usuario.find(qry)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
         total,
         usuarios
    });
}

const usuariosPost = async (req , res = response) => {
    const { nombre, email, password, rol} = req.body;
    const usuario = new Usuario({ nombre, email, password, rol});
    
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    //guardar informacion
    try {
        await usuario.save();
        console.log("Registro grabado!!",usuario._id);

    } catch (error) {
        console.log("Error en la actualizacion!!");
    }

    res.json(usuario);

}

const usuariosPut = async (req, res = response) => {
    
    const { id } = req.params;

    const {_id, password, google, email,...resto} = req.body;
    
    //TODO validar todo con BD
    if (password){
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: `api PUT - Id de Usuario: ${id}`,
        resto
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;
    
    //se borra físicamente
    //const usuario = await Usuario.findByIdAndDelete(id);

    //solo se cambia su estado a false
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json( usuario );
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