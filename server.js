//Import all required resources
const express = require('express');
const path = require('path');
const api = require('./routes/notes.js');

//Assign port for Heroku server & local Node server 
const PORT = process.env.PORT || 3001;

//Initiate Middleware
const app = express();

//Using Middelware for parsing JSON Data, Define Static & to urlencode form Data.
app.use(express.json());//Parsing JSON
app.use(express.urlencoded({ extended: true }));// URL Encoding
app.use(express.static('public'))

//Route Handler - API
app.use('/api', api);

//Handler - HTML
//Notes Page
app.get('/notes', (requestobj, responseobj) =>
responseobj.sendFile(path.join(__dirname, '/public/notes.html'))
);

//All other pages
app.get('*', (requestobj, responseobj)=>
    responseobj.sendFile(path.join(__dirname,'/public/index.html'))
);


//Assigns Port Listener
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)//Msg
);