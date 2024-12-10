const Role = require ('../models/roles');
const Usuario = require ('../models/usuario');

const esRoleValido = async (rol = '' ) => {
    const existeRol = await Role.findOne({rol});
    if (!existeRol){
      throw new Error (`El rol ${rol} no es válido!`);
    }
}

//verificar si el correo existe en la mongodb
const EmailExiste = async (email ='') => {
  const existeEmail = await Usuario.findOne({email});
    if (existeEmail){
      throw new Error (`El email ${email} ya existe!`);
    }
}

const NombreExiste = async (nombre = '') => {
  const existeNombre = await Usuario.findOne({nombre});
  if (existeNombre){
    throw new Error (`El nombre ${nombre} ya existe!`);
  }
}

const IdExiste = async (id = '') => {
  const existeId = await Usuario.findById(id);
  if (!existeId){
    throw new Error (`El ID ${id} no es válido!`);
  }
}

module.exports = {
    esRoleValido,
    EmailExiste,
    NombreExiste,
    IdExiste
}