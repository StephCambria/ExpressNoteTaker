// === ROUTE PARAMETERS === //
// express.js
// express.Router()
const express = require('express');
// express.Router() is used to create a new router object
const router = express.Router();

const {createNewNote, updateDb} = require('../../lib/notes');
// npm i uuidv4
const { v4: uuidv4 } = require('uuid');
const {notes} = require('../../db/db.json');


// shows all notes in json data
router.get("/notes", (req, res) => {
    let results = notes;
    res.json(results);
});

// router.post
router.post("/notes", (req, res) => {
    req.body.id = uuidv4();
    const newNote = createNewNote(req.body, notes);
    res.json(newNote);
});

// router.delete
// for deleting functionality
router.delete('/notes/:id', (req, res) => {
    const params = req.params.id
    updateDb(params, notes);
    res.redirect('');
});


// export this file
// module.exports = router maps a router and all of the logic required to map
module.exports = router;
