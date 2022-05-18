const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config()
const port = process.env.PORT || 5000;

//to-do
//JLQA8S4HibwczHaR
//middleware 
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.m0zh9.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const tasksCollection = client.db("toDoList").collection("tasks");
        console.log('db is connected');

        //api for upload data
        app.post('/tasks', async (req, res) => {
            const newTask = req.body;
            const result = await tasksCollection.insertOne(newTask);
            res.send({ success: 'Upload successfully' })
        });

        //get all data from database...
        app.get('/tasks', async (req, res) => {
            const allTasks = await tasksCollection.find({}).toArray();
            res.send(allTasks);
        });

        //Delete items by id api 
        app.delete('/task/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            result = await tasksCollection.deleteOne(query);
            res.send({ success: 'Deleted successfully' })
        });




    }
    finally {

    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('to do app  Server is running')
});

app.listen(port, () => {
    console.log(`Port is:  ${port}`)
});
