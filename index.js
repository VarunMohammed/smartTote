const express = require('express');
const dotenv = require('dotenv');

const mongoose = require('mongoose')
dotenv.config({path: "./.env"});
const app = express()
const port = 1337

mongoose.connect('mongodb+srv://smartToteServer:smartTote@smarttote.qypu7p2.mongodb.net/')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once('open', () => {
    console.log('Connected to MongoDB');
})

app.use(express.json);
app.use(express.urlencoded({extended: true}));

const userDetailsSchema = new mongoose.Schema({
    Name: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true}
})
const User = mongoose.model('User', userDetailsSchema);

app.post('/register', async (req,res) => {
    const userData = req.body
    const user = new User(userData)
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})