const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg'); // Importa el módulo pg
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

app.post('/guardar_datos', (req, res) => {
  const datos = req.body;
  
  // Conecta a la base de datos PostgreSQL
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      res.status(500).json({ error: 'Error al conectar a la base de datos' });
      return;
    }
    
    // Realiza la inserción de datos en la base de datos
    client.query('INSERT INTO ubicaciones (latitud, longitud) VALUES ($1, $2)', [datos.latitud, datos.longitud], (err, result) => {
      done(); // Libera el cliente de la piscina de conexiones
      console.log(datos.latitud +"-------"+ datos.longitud)
      if (err) {
        console.error('Error al ejecutar la consulta:', err);
        res.status(500).json({ error: 'Error al ejecutar la consulta en la base de datos' });
      } else {
        res.json({ mensaje: 'Datos recibidos y guardados con éxito' });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
