// Require dependencies
const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const notes = require('../db/db.json');
const uuid = require('../helpers/uuid');

// GET Route for retrieving all the notes
router.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for notes`);
    res.json(notes);
});

// POST Route for a new note
router.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        res.json(newNote);

        notes.push(newNote);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes, null, 2), (err) =>
            err ? console.error(err) : console.info(`Data written to db.json`));
    }
});

// Delete Notes
router.delete('/api/notes/:id', (req, res) => {
    const deletedNote = req.params.id;

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == deletedNote) {
            notes.splice(i, 1);
            console.info(`Deleted note ${deletedNote}!`);
        }
    }

    fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notes, null, 2), (err) =>
        err ? console.error(err) : console.info(`Data written to db.json`));

    res.json(notes);
});

module.exports = router;