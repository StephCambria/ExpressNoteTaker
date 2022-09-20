const fs = require('fs');
const path = require('path');

module.exports = app => {
    // set up notes variable
    fs.readFile("db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);

        // API ROUTES
        // ========================================

        // set up the /api/notes get route
        app.get("/api/notes", (req, res) => {
            // read the db.json file and return all saved notes as JSON
            res.json(notes);
        });

        // set up the /api/notes post route
        app.post("/api/notes", (req, res) => {
            // receives a new note, adds it to db.json, then returns the new note
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added a new note: " + newNote.title);
        });

        // retrieves a note with a specific id
        app.get("/api/notes/:id", (req, res) => {
            // display JSON for the notes array indices of the provided id
            res.json(notes[req.params.id]);
        });

        // deleted a note with a specific id
        app.delete("/api/notes/:id", (req, res) => {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id " + req.params.id);
        });

        // VIEW ROUTES
        // ========================================

        // display notes.html when /notes is accessed
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"));
        });

        // display index.html when all other routes are accessed
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        });

        // updates the JSON file whenever a note is added or deleted
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}
