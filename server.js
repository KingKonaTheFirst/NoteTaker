// importing the paths, fs, and express
const express = require(express);
const path = require('path');
const fs = require('fs');
// making express a varible
const app = express();
// defines which port to use either with heroku or local
const PORT = process.env || 3001;
// middlewear
app.use(express.static('public'));