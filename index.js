const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // Puedes cambiar el puerto si lo deseas

app.use(bodyParser.json());

// Ruta para recibir los datos desde la aplicación Flutter
app.post('/guardar_datos', (req, res) => {
  const datos = req.body; // Los datos enviados desde Flutter estarán en req.body
  
  // Aquí puedes realizar acciones con los datos, como guardarlos en una base de datos
  console.log(req.body);
  // Envía una respuesta de confirmación
  res.json({ mensaje: 'Datos recibidos con éxito' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
