//Import all required resources
const notes = require('express').Router();//Router
const { v4: uuidv4 } = require('uuid');// Generates Unique Id Lib
const path = require('path'); //Path
const fileSystemObj = require('fs');// File System Lib

//Handler for Get - called from FrontEnd to display all Notes to User.
//Get - 'api/notes' will return the db.json file as jason.
notes.get('/notes', (reqObj, resObj) => {    
    resObj.sendFile(path.join(__dirname, '../db/db.json'));
});

//Handler for POST - called from FrontEnd when User wants to add a new Note.
//POST - 'api/notes'receives Title & Body of the New Note
//Rest End funtion adds the new Note to the DB.Json file
//And sends back the Updated DB.Json file as response.
notes.post('/notes',  (reqObj, resObj) => {    
    // Destructuring assignment for the items in req.body
  const { title, text } = reqObj.body;   
    //Create New Note Object
    let userCreatedNote = {
        title,
        text,
        id: uuidv4(),//Creates Unique Id for the New Note
    };
    let currDB = fileSystemObj.readFileSync('db/db.json');//reads the data from existing file
    currDB = JSON.parse(currDB);//Parse data    
    currDB.push(userCreatedNote);//Adds the new Note to the Current DB data object
    fileSystemObj.writeFileSync('db/db.json',JSON.stringify(currDB));//Writes the updated data     
    resObj.json(currDB);
});

//Handler for DELETE - called from FrontEnd when User wants to delete a Note.
//POST - 'api/notes'receives ID of the Note to be deleted
//Rest End funtion removes the Note relevant to the received Note ID from the DB.Json file
//And sends back the Updated DB.Json file as response.
notes.delete('/notes/:id', (reqObj, resObj)=>{
    let currDB = fileSystemObj.readFileSync('db/db.json');//reads the data from existing file
    currDB = JSON.parse(currDB);//Parse data
    //removes the Note relevant to the received Note ID from the read data
    let removedData = currDB.filter(item => item.id != reqObj.params.id);
    fileSystemObj.writeFileSync('db/db.json',JSON.stringify(removedData));//Writes the updated data 
    resObj.json(removedData);//Sends back the New Updated DBy
});

module.exports = notes;//exports the Handler