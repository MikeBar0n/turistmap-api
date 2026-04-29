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

const obtenerItinerarioPorId = async (req, res) => {
  try {
    const itinerario = await Itinerario.findById(req.params.id)
      .populate('usuario', 'nombre email')
      .populate({ path: 'actividades.actividad', select: 'nombre tipo precio destino' });
    if (!itinerario || !itinerario.activo) {
      return res.status(404).json({ message: 'Itinerario no encontrado.' });
    }
    if (req.usuario.rol !== 'administrador' && itinerario.usuario._id.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({ message: 'No tienes permiso para ver este itinerario.' });
    }
    res.json({ itinerario });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener itinerario.', error: error.message });
  }
};

const crearItinerario = async (req, res) => {
  try {
    const itinerario = await Itinerario.create({
      ...req.body,
      usuario: req.usuario._id,
    });
    res.status(201).json({ message: 'Itinerario creado exitosamente.', itinerario });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear itinerario.', error: error.message });
  }
};

const actualizarItinerario = async (req, res) => {
  try {
    const itinerario = await Itinerario.findById(req.params.id);
    if (!itinerario || !itinerario.activo) {
      return res.status(404).json({ message: 'Itinerario no encontrado.' });
    }
    if (req.usuario.rol !== 'administrador' && itinerario.usuario.toString() !== req.usuario._id.toString()) {
      return res.status(403).json({ message: 'No tienes permiso para editar este itinerario.' });
    }
    const actualizado = await Itinerario.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ message: 'Itinerario actualizado.', itinerario: actualizado });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar itinerario.', error: error.message });
  }
};

module.exports = { obtenerItinerarios, obtenerItinerarioPorId, crearItinerario, actualizarItinerario };