const { Router }  = require ('express');
const { check } = require ('express-validator');
const Role = require('../models/roles');
const { esRoleValido, 
        EmailExiste, 
        NombreExiste, IdExiste} = require('../helpers/db-validators');

const { usuariosGet, 
  usuariosPost, 
  usuariosPut, 
  usuariosDelete, 
  usuariosPatch } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/valida-campos');


const router = Router();

router.get('/', usuariosGet );

router.post('/', [
  check ('nombre','El nombre es necesario!').custom(NombreExiste).not().isEmpty(),
  check ('email','Correo Inválido!').isEmail(),
  check ('email').custom(EmailExiste),
  check ('password','El passwor debe ser mínimo 6 caracteres!').isLength({min:6}),
  //check ('rol','No es un rol válido!').isIn(['ADMIN','USER']),
  //se actualiza para que el rol sea checado directo de la BD
  check ('rol').custom( esRoleValido ),
  validarCampos  
],usuariosPost);

router.put('/:id',[ 
  check ('id','No es un ID válido!').isMongoId(),
  check ('id').custom(IdExiste),
  check ('rol').custom( esRoleValido ),
  validarCampos
],usuariosPut);


router.delete('/:id',[
  check ('id','No es un ID válido!').isMongoId(),
  check ('id').custom(IdExiste),
  validarCampos
],usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;