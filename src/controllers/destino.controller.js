const Destino = require('../models/Destino.model');

const obtenerDestinos = async (req, res) => {
  try {
    const { categoria, ciudad } = req.query;
    const filtro = { activo: true };
    if (categoria) filtro.categoria = categoria;
    if (ciudad) filtro['ubicacion.ciudad'] = new RegExp(ciudad, 'i');

    const destinos = await Destino.find(filtro).populate('creadoPor', 'nombre email');
    res.json({ total: destinos.length, destinos });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener destinos.', error: error.message });
  }
};

module.exports = { obtenerDestinos };