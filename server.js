// import express
// npm install express --save
const express = require("express");
const app = express();

// ask the app to listen on port 3000
const PORT = process.env.PORT || 3000;

const fs = require('fs');
const path = require('path');

// we've required express ^^^
// now we can create a new instance of Router on it.
// we're holding it in a variable called routes.
// next we create a route at the root path of this router that will send back a simple message
// then, we can export the router.
require('./routes/apiRoutes/index')(app);

// using static files
// used to specify the root directory from which to serve static assets
// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// =================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));

});

app.post("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
    if (error) {
      return console.log(error)
    }
    notes = JSON.parse(notes)

    var id = notes[notes.length - 1].id + 1
    var newNote = { title: req.body.title, text: req.body.text, id: id }
    var activeNote = notes.concat(newNote)

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(activeNote), function (error, data) {
      if (error) {
        return error
      }
      console.log(activeNote)
      res.json(activeNote);
    })
  })
})

// Pull from db.json
app.get("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, data) {
    if (error) {
      return console.log(error)
    }
    console.log("This is Notes", data)
    res.json(JSON.parse(data))
  })
});

app.delete("/api/notes/:id", function (req, res) {
  const noteId = JSON.parse(req.params.id)
  console.log(noteId)
  fs.readFile(__dirname + "/db/db.json", 'utf8', function (error, notes) {
    if (error) {
      return console.log(error)
    }
    notes = JSON.parse(notes)

    notes = notes.filter(val => val.id !== noteId)

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (error, data) {
      if (error) {
        return error
      }
      res.json(notes)
    })
  })
})

app.put("/api/notes/:id", function(req, res) {
  const noteId = JSON.parse(req.params.id)
  console.log(noteId)
  fs.readFile(__dirname + "db/db.json", "utf8", function(error, notes) {
    if (error ){
      return console.log(error)
    }
    notes.JSONparse(notes)

    notes = notes.filter(val => val.id !== noteId)

    fs.writeFile(__dirname +"db/db.json", JSON.stringify(notes), function (error, data) {
      if (error) {
        return error
      }
      res.json(notes)
    })
  })
})

// ======================================


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
