const express = require('express');
// setting up the router
const router = express.Router();

// before we start listening for http connections,
// we initialize the database by calling initDb
// so that we can get an instance of our connected database by calling getDb.database

// db.json contains the current notes and the note history
const { notes } = require("../../db/db");

// import create / delete note functions we've written
const {
  noteCreateNewNote,
  noteDeleteNote,
} = require("../../lib/noteFunctions");

// save note history to json db
// req object represents the HTTP request, and has properties for the request query string, params, etc
// res object represents the HTTP response that an express app sends when it receives an HTTP request
router.get("/notes", (req, res) => {
  let saved = notes;
  res.json(saved);
});

router.post("/notes", (req, res) => {
  // req.body holds params that are sent from the client as part of a POST request
  req.body.id = notes.length.toString();
  let note = noteCreateNewNote(req.body, notes);
  res.json(note);
});

router.delete("/notes/:id", (req, res) => {
  noteDeleteNote(notes, req.params.id);
  res.json(notes);
});

// export the router
// the module.exports = router is mapping both the router and the logic required to map file,
// as well as the right callbacks, etc
module.exports = router;
