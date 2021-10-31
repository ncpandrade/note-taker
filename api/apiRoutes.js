const express = require('express');
const fs = require('fs');
const path = require('path');
//import uuid npm package to create unique id's for notes
const {v4: uuidv4} = require ('uuid');

const router = express.Router();

//get notes
router.get('/', (req, res) => {
    //fs.readFileSync b/c no callback function required
    //Sync is blocking -> it blocks the following functions frim running until fs.readFileSync is done!
    console.log(__dirname)
    const notes = fs.readFileSync(path.join(__dirname, "../db/db.json"));
    const parsed = JSON.parse(notes);
    //JSON.parse = turn bytes into JSON
    res.json(parsed);
})

//write notes
router.post('/', (req, res) => {
    //read file..
    const notes = fs.readFileSync(path.join(__dirname, "../db/db.json"));
    //..then convert to js array
    const parsed = JSON.parse(notes);
    //push new note (req.body) to the array
    const newNote = req.body;
    newNote.id = uuidv4();
    parsed.push(newNote);
    //write new array 'parsed' to the file db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(parsed));
    res.send('File saved');
})

//delete notes
router.delete('/:id', (req, res) => {
    const notes = fs.readFileSync(path.join(__dirname, "../db/db.json"));
    //..then convert to js array
    const parsed = JSON.parse(notes);
    //req.params.id is the id of the element that we want to delete/ req.params is the object
    const toDelete = req.params.id;
    //filter through array and all elements that do not have the matching id are added to new array, thus deleting the note with matching id
    const newNotes = parsed.filter(el => el.id !== toDelete);
    //write new array 'parsed' to the file db.json
    fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
    
    res.send('yay');
})

module.exports = router