const express = require("express");
const datosControllers = require("../controllers/datosControllers");  // Asegúrate de tener el controlador de prácticas adecuado
const cors = require("cors");

const router = express.Router();

router.use(cors());
router.use(express.json());

// Obtener todas las prácticas
router.get("/", datosControllers.obtenerDatos);

// Obtener una práctica por ID
router.get("/:id_practica1", datosControllers.obtenerDatoPorId);

// Crear una nueva práctica
router.post("/", datosControllers.crearDato);

// Actualizar una práctica por ID
router.put("/:id_practica1", datosControllers.actualizarDatoPorId);

// Eliminar una práctica por ID
router.delete("/:id_practica1", datosControllers.eliminarDatoPorId);

router.get("/rango/min=:distanciaInicio&max=:distanciaFin", datosControllers.obtenerDatosEnRango);

// Puedes agregar otras rutas o acciones según tus necesidades

module.exports = router;
