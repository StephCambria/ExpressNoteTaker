// requiring fs here for useful functionality,
// especially since we will be utilizing it to access and interact with the file system
const fs = require('fs');

// requiring path so we can utilize it at the end of each function
const path = require('path');

// functions for the front end
function noteCreateNewNote(body, noteTakerArray) {
    const note = body;
    noteTakerArray.push(note);
    fs.writeFileSync(
        // path.join links the function to the specified directory
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: noteTakerArray
        }, null, 2)
    )
    return note;
}

// for deleting items
function noteDeleteNote(noteTakerArray, id) {
    let deleteID = parseInt(id);
    noteTakerArray.splice(deleteID, 1);

    // this loop re-writes the indexes for the remaining notes
    for (let i = deleteID; i < noteTakerArray.length; i++) {
        noteTakerArray[i].id = i.toString();
    }

    fs.writeFileSync(
        // path.join links the function to the specified directory
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({
            notes: noteTakerArray
        }, null, 2)
    )
}

// exporting this file
module.exports = {
    noteCreateNewNote,
    noteDeleteNote
};