// import express
// npm install express --save
const express = require("express");
const path = require('path');
const fs = require('fs');
const util = require('util');

// handling asynchronous processes
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// ask the app to listen on port 3000
// this begins setting up the server
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static middleware
app.use(express.static("./public"));


// API route | "GET" request
app.get('/api/notes', (req, res) => {
  readFileAsync("./db/db.json", "utf8").then(function(data) {
    notes = [].concat(JSON.parse(data))
    res.json(notes);
  })
});

// API Route | "POST" request
app.post("/api/notes", function(req, res) {
  const note = req.body;
  readFileAsync("./db/db.json", "utf8").then(function(data) {
    const notes = [].concat(JSON.parse(data));
    note.id = notes.length + 1
    notes.push(note);
    return notes
  }).then(function(notes) {
    writeFileAsync("./db/db.json", JSON.stringify(notes))
    res.json(note);
  })
});

// API Route | "DELETE" request
app.delete("/api/notes/:id", function(req, res) {
  const idToDelete = parseInt(req.params.id);
  readFileAsync("./db/db.json", "utf8").then(function(data) {
    const notes = [].concat(JSON.parse(data));
    const newNotesData = []
    for (let i = 0; i<notes.length; i++) {
      if(idToDelete !== notes[i].id) {
        newNotesData.push(notes[i])
      }
    }
    return newNotesData
  }).then(function(notes) {
    writeFileAsync("./db/db.json", JSON.stringify(notes))
    res.send('saved success!!!');
  })
})

// HTML Routes
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("/", function(req, res) {
     res.sendFile(path.join(__dirname, "./public/index.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
 });



// we asked the app to listen on port at the beginning of the file,
// now we write the function to call it
// app.listen() is used to bind and listen to the connections on the specified host and port
app.listen(PORT, () => {
  // for debugging
  console.log(`Server listening on port ${PORT}! 🚀`);
});

// on the command line, type node server.js

// alternatively, type npm start,
// then in your browser, type localhost:3000
