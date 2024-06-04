const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    const database = client.db();  // 'blocris' está especificado en la URI
    const collection = database.collection('posts');

    // Lista de posts a insertar
    const posts = [
      {
        title: "Blog Explained in Instagram Photos",
        description: "But because those who do not know how to pursue pleasure rationally encounter.",
        author: "John Doe",
        date: new Date("2022-12-05T00:00:00Z"),
        category: "Business",
        content: "<h5>Up-coming business bloggers, you need to watch</h5><p>The printing and typesetting industry...</p>",
        image: "https://assets-global.website-files.com/638994e3ac476c94ba486f9c/638998000e53efbaefe87dd2_blog-01.jpg",
        tags: ["business", "blogging", "tips"]
      },
      // Agregar más objetos de post aquí...
    ];

    // Insertar cada post como un documento independiente
    const result = await collection.insertMany(posts);
    console.log(`${result.insertedCount} documents were inserted`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
