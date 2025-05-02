const mongoose = require('mongoose')

const express = require('express');

const app = express();

const cors = require('cors')
const option = {
    origin: 'http://localhost:5174/',
    methods: 'GET,POST',
    allowedHeaders: ['Content-Type', 'Authorization']

}
app.use(cors(option))

mongoose.connect('mongodb+srv://nikk7672:6B8FzrfExLDwIST0@cluster0.6fegitt.mongodb.net/')
    .then(() => {
        console.log('Mongoose connected');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const PORT=process.env.PORT||5000

app.listen(PORT, () => {
    console.log('Server is running');
});