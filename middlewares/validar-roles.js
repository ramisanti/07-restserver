const { response, request } = require("express")


const validaAdminRol = ( req = request, res = response, next ) => {

    const { rol } = req.usuarioauth;

    if (rol!=='ADMIN'){
        return res.status(401).json({
            msg: 'Error en el nivel de permiso del usuario - no rol ADMIN'
        });
    }

    next ();

}

const tieneRol = (...roles) =>{
    return (req , res = response, next) => {
        if (!req.usuarioauth){
            return res.status(500).json({
                msg: 'Se requiere verificar el rol sin validar token primero'
            });
        }

        if (!roles.includes(req.usuarioauth.rol)){
            return res.status(401).json({
                msg:  `El servicio requiere uno de estos roles ${roles}`
            });
        }
        next();
    }
}

module.exports = {validaAdminRol, tieneRol}