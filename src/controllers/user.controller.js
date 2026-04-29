const User = require('../models/User.model');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find({ activo: true }).select('-password');
    res.json({ total: usuarios.length, usuarios });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios.', error: error.message });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id).select('-password');
    if (!usuario || !usuario.activo) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.json({ usuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario.', error: error.message });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const datosActualizar = { nombre, email };
    if (req.usuario.rol === 'administrador' && req.body.rol) datosActualizar.rol = req.body.rol;
    const usuario = await User.findByIdAndUpdate(req.params.id, datosActualizar, { new: true, runValidators: true }).select('-password');
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.json({ message: 'Usuario actualizado.', usuario });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario.', error: error.message });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await User.findByIdAndUpdate(req.params.id, { activo: false }, { new: true });
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.json({ message: 'Usuario eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario.', error: error.message });
  }
};

module.exports = { obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario };