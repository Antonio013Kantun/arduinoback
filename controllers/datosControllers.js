const connection = require("../database");

const obtenerDatos = (req, res) => {
  connection.query("SELECT * FROM practica1", (error, results) => {
    if (error) {
      console.error("Error al obtener datos", error);
      res.status(500).json({
        error: "Error al obtener datos",
      });
    } else {
      res.json(results);
    }
  });
};

const obtenerDatoPorId = (req, res) => {
  const id = req.params.id_practica1;
  connection.query("SELECT * FROM practica1 WHERE id_practica1 =?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrió un error al obtener el dato"});
    } else if(results.length === 0){
      res.status(404).json({error:"El dato no fue encontrada"});
    } else {
      res.json(results[0]);
    }
  });
};

const crearDato = (req, res) => {
  const { mensaje, distancia } = req.body;

  // Verificar que se proporcionen mensaje y distancia
  if (!mensaje || !distancia) {
    return res.status(400).json({ error: 'Mensaje o distancia faltante' });
  }

  // Almacenar el mensaje y distancia en la base de datos
  const query = "INSERT INTO practica1 (mensaje, distancia) VALUES (?, ?)";
  connection.query(query, [mensaje, distancia], (error, results) => {
    if (error) {
      console.error('Error al agregar práctica', error);
      return res.status(500).json({ error: 'Error al agregar dato' });
    }

    res.json({ message: 'Dato creado correctamente' });
  });
};

const actualizarDatoPorId = (req, res) => {
  const id = req.params.id_practica1;
  const { mensaje, distancia } = req.body;
  connection.query(
    "UPDATE practica1 SET mensaje=?, distancia=?, fecha=NOW() WHERE id_practica1=?",
    [mensaje, distancia, id],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar práctica", error);
        res.status(500).json({error: "Error al actualizar el dato"});
      } else {
        res.json({message: "Dato actualizado correctamente"});
      }
    }
  );
};

const eliminarDatoPorId = (req, res) => {
  const id = req.params.id_practica1;
  connection.query("DELETE FROM practica1 WHERE id_practica1=?", [id], (error, results) => {
    if (error) {
      res.status(500).json({error: "Ocurrió un error al eliminar el dato"});
    } else {
      res.json({message: "Dato eliminado correctamente"});
    }
  });
};

const obtenerDatosEnRango = (req, res) => {
  const { distanciaInicio, distanciaFin } = req.params;

  const query = "SELECT * FROM practica1 WHERE distancia BETWEEN ? AND ?";
  connection.query(query, [distanciaInicio, distanciaFin], (error, results) => {
    if (error) {
      console.error("Error al obtener datos en el rango de distancia", error);
      res.status(500).json({ error: "Error al obtener datos en el rango de distancia" });
    } else {
      res.json(results);
    }
  });
};


module.exports = {
  obtenerDatos,
  obtenerDatoPorId,
  crearDato,
  actualizarDatoPorId,
  eliminarDatoPorId,
  obtenerDatosEnRango,
};
