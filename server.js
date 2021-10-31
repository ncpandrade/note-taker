//add path to the routes


const express = require('express');
const fs = require('fs');
//import uuid npm package to create unique id's for notes
const {v4: uuidv4} = require ('uuid');
//for working with file and directory paths
const path = require('path');
const router = require('./api/apiRoutes');
//create port
const PORT = process.env.PORT || 3001;

//instantiate server
const app = express();

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static('public'));

//get route to note page
app.get('/notes',(req, res) => {
    res.sendFile(path.join(__dirname, "public",'notes.html'));
})

app.use("/api/notes", router)

//RUN
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});