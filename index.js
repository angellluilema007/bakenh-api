const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el middleware CORS
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Configura CORS para permitir todas las solicitudes
app.use(cors());

app.post('/guardar_datos', (req, res) => {
  const datos = req.body;
  console.log(datos);
  res.json({ mensaje: 'Datos recibidos con éxito' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
