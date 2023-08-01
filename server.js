// importing the paths, fs, and express
const express = require("express");
const path = require("path");
const fs = require("fs");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./helpers/fsUtils");
// making express a varible
const app = express();

// defines which port to use either with heroku or local
const PORT = process.env.PORT || 3001;

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
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// posts in/saves notes to json
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;

  if (req.body) {
    const noteObj = {
      title,
      text,
      id: uuid(),
    };

    readAndAppend(noteObj, "./db/db.json");
    res.json(`Note Saved Properly`);
  } else {
    res.error("Note Did Not Save");
  }
});

// delete previously saved notes
app.delete('/api/notes/:id', (req, res) => {
  readFromFile('./db/db.json').then((data) => {
    const ogData = JSON.parse(data);
    const newData = ogData.filter(note => note.id !== req.params.id);
    writeToFile('./db/db.json', newData);
  })
});

// catch all that will take us back to homepage
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
