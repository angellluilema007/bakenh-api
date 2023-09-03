const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

const pool = new Pool(dbConfig);

app.use(bodyParser.json());
app.use(cors());

// POST para guardar datos (tu ruta actual)
app.post('/guardar_datos', (req, res) => {
  const datos = req.body;
  const latitud = parseFloat(datos.latitud);
  const longitud = parseFloat(datos.longitud);

  pool.connect((err, client, done) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
      return;
    }

    client.query('INSERT INTO ubicaciones2 (latitud, longitud) VALUES ($1, $2)', [latitud, longitud], (err, result) => {
      done();
      console.log(latitud + "-------" + longitud)
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al ejecutar la consulta en la base de datos' });
      } else {
        res.json({ mensaje: 'Datos recibidos y guardados con éxito' });
      }
    });
  });
});

// GET para obtener todos los datos
app.get('/obtener_datos', (req, res) => {
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
      return;
    }

    client.query('SELECT * FROM ubicaciones2', (err, result) => {
      done();
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al ejecutar la consulta en la base de datos' });
      } else {
        res.json(result.rows); // Envía todos los datos como respuesta JSON
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
