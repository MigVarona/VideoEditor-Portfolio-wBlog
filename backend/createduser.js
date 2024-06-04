const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db();  // El nombre de la base de datos debe especificarse en la URI
    const collection = database.collection('users');

    // Definir el usuario y la contraseña
    const username = 'Cris';
    const password = '123456';

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Objeto que representa al usuario con el nombre de usuario y la contraseña hasheada
    const user = {
      username: username,
      password: hashedPassword
    };

    // Insertar el usuario en la colección de usuarios
    const result = await collection.insertOne(user);
    console.log(`Usuario insertado con éxito: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
