// !dependencias
const express = require("express");
const cors = require("cors");
const datosRouter = require("./router/datosRouter");  // Asegúrate de tener el router de prácticas adecuado

/* app va a tener todos los atributos y metodos de 
express */

const app = express();

app.use(cors());

app.use(express.json());

app.use("/datos", datosRouter);

app.get("/", (req, res) => {
  res.send(`<h1>Hola mundo</h1>`);
});

app.listen(3001, () => {
  console.log("API escuchando por el puerto 3001");
});
