
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());


//aponfirebase
//wDfxKHhGep9tNFgz


app.get('/', (req, res) => {
  res.send('Node-Crud-Mongo')
})

//mongoDB---dataBase
// -----------------------


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aponfirebase:wDfxKHhGep9tNFgz@cluster0.hoonm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try { 
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    
    //CRUD


    const database = client.db("userstDB");
    const userCollection = database.collection("users");

    app.post('/users', async(req, res) => {
          
      const users = req.body
      console.log(users)
      const result = await userCollection.insertOne(users);
      res.send(result)
  

    })
    


    //CRUD




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);




//mongoDB---dataBase
// -----------------------





app.listen(port, () => {
  console.log(` BackEnd with database ${port}`)
})


