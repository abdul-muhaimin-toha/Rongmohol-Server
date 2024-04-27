require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.5chsr9x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get('/', (req, res) => {
  res.send('Rongmohol server is running!');
});

async function run() {
  try {
    const database = client.db('artDB');
    const artcollection = database.collection('artCollection');
    const categoryCollection = database.collection('categoryCollection');

    app.get('/arts-all', async (req, res) => {
      const cursor = artcollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/arts-first-six', async (req, res) => {
      const cursor = artcollection.find();
      const result = (await cursor.toArray()).slice(0, 6);
      res.send(result);
    });

    app.get('/my-arts:email', async (req, res) => {
      const email = req.params.email;
      const query = { posted_by_email: email };
      const cursor = artcollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get('/art-categories', async (req, res) => {
      const cursor = categoryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post('/arts', async (req, res) => {
      const doc = req.body;
      const result = await artcollection.insertOne(doc);
      res.send(result);
    });

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Rongmohol server is listening on port ${port}`);
});
