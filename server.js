// importing the paths, fs, and express
const express = require("express");
const path = require("path");
const fs = require("fs");
// making express a varible
const app = express();
// defines which port to use either with heroku or local
const PORT = process.env.PORT || 3001;
// generate unique number for notes
const uuid = require('./helpers/uuid')
// middlewear
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// static path for index
app.use(express.static('public'))

// gets info from index and notes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
app.get("/notes", (req, res) =>
  res.sendFile(path.join(_dirname, "/public/notes.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);