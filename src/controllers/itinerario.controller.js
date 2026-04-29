const Itinerario = require('../models/Itinerario.model');

const obtenerItinerarios = async (req, res) => {
  try {
    const filtro = { activo: true };
    if (req.usuario.rol !== 'administrador') {
      filtro.usuario = req.usuario._id;
    }

    const itinerarios = await Itinerario.find(filtro)
      .populate('usuario', 'nombre email')
      .populate({ path: 'actividades.actividad', select: 'nombre tipo precio' });

    res.json({ total: itinerarios.length, itinerarios });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener itinerarios.', error: error.message });
  }
};

module.exports = { obtenerItinerarios };