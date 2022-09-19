const express = require("express");
// setting up the router
const path = require("path");
// express.Router() is used to create a new router object
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../..public/index.html"));
});

// joining the router to notes.html
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/notes.html"));
});

// joining the router to index.html
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

// exporting
module.exports = router;
