const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el middleware CORS

const app = express();
const port = 5000;

app.use(bodyParser.json());

// Configura CORS para permitir todas las solicitudes
app.use(cors());

app.post('/guardar_datos', (req, res) => {
  const datos = req.body;
  console.log(req.body);
  res.json({ mensaje: 'Datos recibidos con éxito' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
