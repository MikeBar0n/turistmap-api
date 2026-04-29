const User = require('../models/User.model');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({ activo: true }).select('-password');
    res.json({ total: usuarios.length, usuarios });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios.', error: error.message });
  }
};

module.exports = { obtenerUsuarios };