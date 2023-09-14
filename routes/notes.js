//Import all required resources
const notes = require('express').Router();//Router
const { v4: uuidv4 } = require('uuid');// Generates Unique Id Lib
const path = require('path'); //Path
const fileSystem = require('fs');// File System Lib
const { response } = require('express');

//Handler for Get - called from FrontEnd to display all Notes to User.
//Get - 'api/notes' will return the db.json file as jason.
notes.get('/notes', (request, response) => {
    response.send(path.join(__dirname, '../db/db.json'))
});

//Handler for POST - called from FrontEnd when User wants to add a new Note.
//POST - 'api/notes'receives Title & Body of the New Note
//Rest End funtion adds the new Note to the DB.Json file
//And sends back the Updated DB.Json file as response.
notes.post('/notes', (request, response) => {
    let currDB = fileSystem.readFileSync('db/db.json');//reads the data from existing file
    currDB = JSON.parse(currDB);//Parse data
    //Create New Note Object
    let userCreatedNote = {
        title: request.body.title,
        text: request.body.text,
        id: uuidv4(),//Creates Unique Id for the New Note
    };
    currDB.push(userCreatedNote);//Adds the new Note to the Current DB data object
    fileSystem.writeFileSync('db/db.json',JSON.stringify(currDB));//Writes the updated data 
    response.json(currDB);//Sends back the New Updated DB
});

//Handler for DELETE - called from FrontEnd when User wants to delete a Note.
//POST - 'api/notes'receives ID of the Note to be deleted
//Rest End funtion removes the Note relevant to the received Note ID from the DB.Json file
//And sends back the Updated DB.Json file as response.
notes.delete('/notes:id',(request,response)=>{
    let currDB = fileSystem.readFileSync('db/db.json');//reads the data from existing file
    currDB = JSON.parse(currDB);//Parse data
    //removes the Note relevant to the received Note ID from the read data
    let removedData = currDB.filter(item => item.id != request.params.id);
    fileSystem.writeFileSync('db/db.json',JSON.stringify(removedData));//Writes the updated data 
    response.json(removedData);//Sends back the New Updated DBy
});

module.exports = notes;//exports the Handler