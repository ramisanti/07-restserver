
const { Schema , model } = require ('mongoose');

const UsuarioSchema = Schema ({
    nombre:{
        type: String,
        required:[true,'El nombre es obligatorio'],
        unique: true

    },
    password:{
        type: String,
        required:[true,'El contraseña es obligatorio']
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required:true,
        enum: ['ADMIN','USER']

    },
    estado:{
        type: Boolean,
        default:true
    },
    google:{
        type: Boolean,
        default:false
    }
});

module.exports = model('Usuario',UsuarioSchema);