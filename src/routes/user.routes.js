const express = require('express');
const router = express.Router();
const {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} = require('../controllers/user.controller');
const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

router.use(verificarToken);

router.get('/', soloAdmin, obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.put('/:id', actualizarUsuario);
router.delete('/:id', soloAdmin, eliminarUsuario);

module.exports = router;