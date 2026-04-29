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

const obtenerDestinoPorId = async (req, res) => {
  try {
    const destino = await Destino.findById(req.params.id).populate('creadoPor', 'nombre email');
    if (!destino || !destino.activo) {
      return res.status(404).json({ message: 'Destino no encontrado.' });
    }
    res.json({ destino });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener destino.', error: error.message });
  }
};

module.exports = { obtenerDestinos, obtenerDestinoPorId };
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

const obtenerDestinoPorId = async (req, res) => {
  try {
    const destino = await Destino.findById(req.params.id).populate('creadoPor', 'nombre email');
    if (!destino || !destino.activo) {
      return res.status(404).json({ message: 'Destino no encontrado.' });
    }
    res.json({ destino });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener destino.', error: error.message });
  }
};

const crearDestino = async (req, res) => {
  try {
    const destino = await Destino.create({
      ...req.body,
      creadoPor: req.usuario._id,
    });
    res.status(201).json({ message: 'Destino creado exitosamente.', destino });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear destino.', error: error.message });
  }
};

module.exports = { obtenerDestinos, obtenerDestinoPorId, crearDestino };
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

const obtenerDestinoPorId = async (req, res) => {
  try {
    const destino = await Destino.findById(req.params.id).populate('creadoPor', 'nombre email');
    if (!destino || !destino.activo) {
      return res.status(404).json({ message: 'Destino no encontrado.' });
    }
    res.json({ destino });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener destino.', error: error.message });
  }
};

const crearDestino = async (req, res) => {
  try {
    const destino = await Destino.create({
      ...req.body,
      creadoPor: req.usuario._id,
    });
    res.status(201).json({ message: 'Destino creado exitosamente.', destino });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear destino.', error: error.message });
  }
};

const actualizarDestino = async (req, res) => {
  try {
    const destino = await Destino.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!destino) {
      return res.status(404).json({ message: 'Destino no encontrado.' });
    }
    res.json({ message: 'Destino actualizado.', destino });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar destino.', error: error.message });
  }
};

const eliminarDestino = async (req, res) => {
  try {
    const destino = await Destino.findByIdAndUpdate(
      req.params.id,
      { activo: false },
      { new: true }
    );
    if (!destino) {
      return res.status(404).json({ message: 'Destino no encontrado.' });
    }
    res.json({ message: 'Destino eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar destino.', error: error.message });
  }
};

module.exports = { obtenerDestinos, obtenerDestinoPorId, crearDestino, actualizarDestino, eliminarDestino };