const mongoose = require('mongoose');

const destinoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del destino es obligatorio'],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
    },
    ubicacion: {
      ciudad: { type: String, required: true },
      departamento: { type: String, required: true },
      pais: { type: String, default: 'Colombia' },
      coordenadas: {
        latitud: { type: Number },
        longitud: { type: Number },
      },
    },
    categoria: {
      type: String,
      enum: ['playa', 'montaña', 'ciudad', 'ecoturismo', 'cultural', 'aventura', 'otro'],
      required: [true, 'La categoría es obligatoria'],
    },
    calificacion: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
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

module.exports = mongoose.model('Destino', destinoSchema);