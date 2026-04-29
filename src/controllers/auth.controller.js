const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const registro = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ message: 'El email ya está registrado.' });
    }

    const usuario = await User.create({ nombre, email, password, rol });
    const token = generarToken(usuario._id);

    res.status(201).json({
      message: 'Usuario registrado exitosamente.',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario.', error: error.message });
  }
};

module.exports = { registro };