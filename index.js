// npm i express cors mongodb dotenv 
// add .gitignore

const express = require("express");
const cors = require("cors");
require('dotenv').config()
// console.log(process.env) // remove this after you've confirmed it is working
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// handle Requests
let userArray = [];
const handleRequests = (user) => {
    // userArray.push(user);
}

// const uri = "mongodb+srv://<username>:<password>@cluster0.hlezmce.mongodb.net/?retryWrites=true&w=majority";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hlezmce.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hlezmce.mongodb.net/?retryWrites=true&w=majority`;

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
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Create Custome APIs To Req & Res

        // POST: CREATE
        // app.post('/')
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Server is Running. Update: Start, env, user, pass,");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});