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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await User.findOne({ email }).select('+password');
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const passwordValida = await usuario.compararPassword(password);
    if (!passwordValida) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    const token = generarToken(usuario._id);

    res.json({
      message: 'Inicio de sesión exitoso.',
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
  }
};

const perfil = async (req, res) => {
  try {
    res.json({
      usuario: {
        id: req.usuario._id,
        nombre: req.usuario.nombre,
        email: req.usuario.email,
        rol: req.usuario.rol,
        creadoEn: req.usuario.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener perfil.', error: error.message });
  }
};

module.exports = { registro, login, perfil };