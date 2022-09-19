// setting up the router
const path = require('path');
// express.Router() is used to create a new router object
const router = require('express').Router();

// joining the router to notes.html
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../..public/notes.html'));
});

// joining the router to index.html
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// exporting
module.exports = router;