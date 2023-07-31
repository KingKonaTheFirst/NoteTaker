// importing the paths, fs, and express
const express = require('express');
const path = require('path');
const fs = require('fs');
// making express a varible
const app = express();
// defines which port to use either with heroku or local
const PORT = process.env.PORT || 3001;
// middlewear
app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.get('/notes', (req, res) => 
    res.sendFile(path.join(_dirname, '/public/notes.html'))
)