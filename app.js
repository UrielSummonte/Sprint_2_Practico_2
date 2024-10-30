const mongoose = require("mongoose");
require("dotenv").config();

// Obtener la cadena de conexión desde el archivo .env
const uri = process.env.MONGODB_URI;

// Función para conectar a la base de datos
async function connectToDB() {
  try {
    await mongoose.connect(uri);
    console.log("Conexión exitosa a MongoDB");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
  }
}

// Crear esquema y modelo de Superhéroes
const superheroSchema = new mongoose.Schema({
  nombreSuperHeroe: { type: String, required: true },
  nombreReal: { type: String, required: true },
  nombreSociedad: { type: String, default: "Desconocido" },
  edad: { type: Number, min: 0 },
  planetaOrigen: { type: String, default: "Desconocido" },
  debilidad: { type: String },
  poderes: { type: [String], default: [] },
  habilidadEspecial: { type: String },
  aliados: { type: [String], default: [] },
  enemigos: { type: [String], default: [] },
  creador: { type: String },
});

const SuperHero = mongoose.model("Superhero", superheroSchema, "Grupo-15");

//CRUD

// Función para insertar un nuevo superhéroe
async function insertSuperHero() {
  try {
    const hero = new SuperHero({
      nombreSuperHeroe: "Black Panther",
      nombreReal: "T'Challa",
      nombreSociedad: "Avengers",
      edad: 39,
      planetaOrigen: "Tierra (Wakanda)",
      debilidad: "Aislamiento de Vibranium",
      poderes: ["Fuerza", "agilidad mejoradas"],
      habilidadEspecial: "Traje de Vibranium",
      aliados: ["Shuri"],
      enemigo: ["Killmonger"],
      creador: "Uriel Sebastián Summonte",
    });
    await hero.save();
    console.log("Superhéroe insertado", hero);
  } catch (error) {
    console.error("Error al insertar superhéroe:", error);
  }
}

// Función para actualizar un superhéroe existente
async function updateSuperHero(nombreSuperHeroe) {
  try {
    const result = await SuperHero.updateOne(
      { nombreSuperHeroe: nombreSuperHeroe },
      { $set: { edad: 35 } }
    );
    console.log("Resultado de la actualización:", result);
  } catch (error) {
    console.error("Error al actualizar el superhéroe:", error);
  }
}

// Función para eliminar un superhéroe de la colección
async function deleteSuperHero(nombreSuperHeroe) {
  try {
    const result = await SuperHero.deleteOne({
      nombreSuperHeroe: nombreSuperHeroe,
    });
    console.log("Superhéroe eliminado:", result);
  } catch (error) {
    console.error("Error al eliminar el superhéroe:", error);
  }
}

// Función para buscar los superhéroes del planeta tierra
async function findSuperHeroes() {
  try {
    const heroes = await SuperHero.find({ planetaOrigen: "Tierra" });
    console.log("Superhéroes encontrados:", heroes);
  } catch (error) {
    console.error("Error al buscar los superhéroes:", error);
  }
}

// Función para traer todos los superhéroes de la colección
async function getAllSuperHeroes() {
  try {
    const heroes = await SuperHero.find();
    console.log("Lista de todos los superhéroes:", heroes);
  } catch (error) {
    console.error("Error al tratar de buscar todos los superhéroes:", error);
  }
}

// Funcion para ejecutar el CRUD
async function runApp() {
  await connectToDB();
  await insertSuperHero();
  await updateSuperHero("Black Panther");
  await deleteSuperHero("Black Panther");
  await findSuperHeroes();
  await getAllSuperHeroes();

  // Cerrar la conexión a la BD
  mongoose.connection.close();
}

runApp();
