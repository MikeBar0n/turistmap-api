const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la actividad es obligatorio'],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
    },
    destino: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Destino',
      required: [true, 'El destino es obligatorio'],
    },
    tipo: {
      type: String,
      enum: ['deportiva', 'cultural', 'gastronomica', 'recreativa', 'educativa', 'otro'],
      required: [true, 'El tipo es obligatorio'],
    },
    duracion: {
      horas: { type: Number, default: 1 },
    },
    precio: {
      type: Number,
      default: 0,
      min: 0,
    },
    cupoMaximo: {
      type: Number,
      default: 20,
    },
    fecha: {
      type: Date,
    },
    activo: {
      type: Boolean,
      default: true,
    },
    creadoPor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Actividad', actividadSchema);