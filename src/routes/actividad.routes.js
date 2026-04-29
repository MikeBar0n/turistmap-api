const express = require('express');
const router = express.Router();
const {
  obtenerActividades,
  obtenerActividadPorId,
  crearActividad,
  actualizarActividad,
  eliminarActividad,
} = require('../controllers/actividad.controller');
const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

router.get('/', obtenerActividades);
router.get('/:id', obtenerActividadPorId);
router.post('/', verificarToken, soloAdmin, crearActividad);
router.put('/:id', verificarToken, soloAdmin, actualizarActividad);
router.delete('/:id', verificarToken, soloAdmin, eliminarActividad);

module.exports = router;