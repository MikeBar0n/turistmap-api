const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const destinoRoutes = require('./routes/destino.routes');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/destinos', destinoRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de TuristMap 🗺️',
    version: '1.0.0',
    equipo: 'TricodeV2M',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      destinos: '/api/destinos',
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor TuristMap corriendo en el puerto ${PORT}`);
});

module.exports = app;