const express = require('express');
const router = express.Router();
const {
  obtenerDestinos,
  obtenerDestinoPorId,
  crearDestino,
  actualizarDestino,
  eliminarDestino,
} = require('../controllers/destino.controller');
const { verificarToken, soloAdmin } = require('../middlewares/auth.middleware');

router.get('/', obtenerDestinos);
router.get('/:id', obtenerDestinoPorId);
router.post('/', verificarToken, soloAdmin, crearDestino);
router.put('/:id', verificarToken, soloAdmin, actualizarDestino);
router.delete('/:id', verificarToken, soloAdmin, eliminarDestino);

module.exports = router;