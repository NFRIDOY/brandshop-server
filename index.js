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
        // await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const database = client.db("brandDB");
        const BrandNamesCollection = database.collection("brandNames");

        // Create Custome APIs To Req & Res
        // BrandNames Input
        // const brandNames = [
        //     { brandId: 1, brandName: "Apple", brandImage: "https://images.unsplash.com/photo-1621768216002-5ac171876625?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2074" },
        //     { brandId: 2, brandName: "Google", brandImage: "https://images.unsplash.com/photo-1529612700005-e35377bf1415?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070" },
        //     { brandId: 3, brandName: "Microsoft", brandImage: "https://images.unsplash.com/photo-1662947036644-ecfde1221ac7?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1856" },
        //     { brandId: 4, brandName: "Huawei", brandImage: "https://images.unsplash.com/photo-1681928411570-09b1bab3a6ac?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2060" },
        //     { brandId: 5, brandName: "Xiaomi", brandImage: "https://images.unsplash.com/photo-1662948100180-7bc43f6fcab3?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=1856" },
        //     { brandId: 6, brandName: "Samsung", brandImage: "https://images.unsplash.com/photo-1661347998423-b15d37d6f61e?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=2070" }
        // ];
        // // Prevent additional documents from being inserted if one fails
        // const options = { ordered: true };
        // const result = await BrandNamesCollection.insertMany(brandNames, options);
        // console.log(`${result.insertedCount} documents were inserted`);

        // Read BrandNames
        app.get('/brandNames', async (req, res) => {
            // const cursor = userCollection.find(query, options);
            const cursor = BrandNamesCollection.find();
            const results = await cursor.toArray()
            res.send(results);
        })

        // POST: CREATE
        // app.post('/')
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Server is Running. Update: Start, env, user, pass, brandNames");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});