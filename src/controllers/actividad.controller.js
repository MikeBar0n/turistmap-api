const Actividad = require('../models/Actividad.model');

const obtenerActividades = async (req, res) => {
  try {
    const { tipo, destino } = req.query;
    const filtro = { activo: true };
    if (tipo) filtro.tipo = tipo;
    if (destino) filtro.destino = destino;

    const actividades = await Actividad.find(filtro)
      .populate('destino', 'nombre ubicacion')
      .populate('creadoPor', 'nombre email');

    res.json({ total: actividades.length, actividades });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener actividades.', error: error.message });
  }
};

module.exports = { obtenerActividades };