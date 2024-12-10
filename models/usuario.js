
const { Schema , model, } = require ('mongoose');

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
    email:{
        type: String
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required:true,
        //enum: ['ADMIN','USER']
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

UsuarioSchema.methods.toJSON = function () {
    const {__v, password, ...usuario } = this.toObject ();
    return usuario;
}

module.exports = model('Usuario',UsuarioSchema);