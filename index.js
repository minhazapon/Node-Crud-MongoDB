
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


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
   
    //create//
    app.post('/users', async(req, res) => {
      const users = req.body
      console.log(users)
      const result = await userCollection.insertOne(users);
      res.send(result)
    })
    //create//


    //read//


    app.get('/users',  async(req, res) => {
         
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result)

    })
     

    //read//


    //Delete//


    app.delete('/users/:id',  async(req, res) => {
          
       const id = req.params.id
       console.log('deleted data >>>>>', id)
       const query = { _id: new ObjectId(id) }
       const result = await userCollection.deleteOne(query)
       res.send(result)

    })
    
    //Delete//
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





// // Import necessary modules
// const express = require('express');
// const cors = require('cors');
// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config(); // Add this line to load environment variables

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection URI (moved to environment variables for security)
// const uri = process.env.MONGO_URI || "mongodb+srv://aponfirebase:wDfxKHhGep9tNFgz@cluster0.hoonm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect to MongoDB server
//     await client.connect();
//     console.log("Connected to MongoDB!");

//     // Define the database and collection
//     const database = client.db("userstDB");
//     const userCollection = database.collection("users");

//     // Create a user - POST route
//     app.post('/users', async (req, res) => {
//       try {
//         const users = req.body;
//         console.log("User data received:", users);

//         // Insert the user data into MongoDB
//         const result = await userCollection.insertOne(users);

//         // Send back the inserted result
//         res.status(201).send(result);
//       } catch (error) {
//         console.error("Error inserting user:", error);
//         res.status(500).send({ message: 'Failed to insert user' });
//       }
//     });

//     // Ping the MongoDB server to verify connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. MongoDB connection is live!");

//   } catch (error) {
//     // Handle connection errors
//     console.error("MongoDB connection error:", error);
//   }
// }

// // Run the MongoDB connection function
// run().catch(console.error);

// // Basic root endpoint
// app.get('/', (req, res) => {
//   res.send('Node-Crud-Mongo API is running!');
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
