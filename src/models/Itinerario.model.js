const mongoose = require('mongoose');

const itinerarioSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El título es obligatorio'],
      trim: true,
    },
    descripcion: {
      type: String,
      default: '',
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    actividades: [
      {
        actividad: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Actividad',
        },
        fechaAgendada: { type: Date },
        notas: { type: String, default: '' },
      },
    ],
    fechaInicio: {
      type: Date,
      required: [true, 'La fecha de inicio es obligatoria'],
    },
    fechaFin: {
      type: Date,
      required: [true, 'La fecha de fin es obligatoria'],
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Itinerario', itinerarioSchema);