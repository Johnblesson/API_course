const express = require('express');
const app = express();
const mongoose = require('mongoose')
// const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const PORT = 3000;

// //Middleware
// app.use('/posts', () => {
//     console.log('This is the middleware')
// })

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Import Routes
const router = require('./routes/post');

app.use('/posts', router);

// ROUTES
app.get('/', (req, res) => {
    res.send('We are on home');
});

//Connect to DB
mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true }
);

const db = mongoose.connection;
db.on('error', (error) => console.log('Something went wrong while connecting to Mongodb'))
db.once('open', () => console.log('Connected to MongoDB'))

// Listen to Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})