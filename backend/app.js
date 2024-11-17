'use strict';

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config()

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});



const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})