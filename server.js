// importing the paths, fs, and express
const express = require("express");
const path = require("path");
const fs = require("fs");
const {
  readFromFile,
  readAndAppend,
  deleteFromFile,
} = require("./helpers/fsUtils");
// making express a varible
const app = express();
// defines which port to use either with heroku or local
const PORT = process.env.PORT || 3001;
const arrayNote = [];
// generate unique number for notes

const uuid = require("./helpers/uuid");
// middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// static path for index
app.use(express.static("public"));

// displays index
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
// displays notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);
app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
  readFromFile("./db/db.json").then((data) => res.json(json.parse(data)));
);

// catch all that will take us back to homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
