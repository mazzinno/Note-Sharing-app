const express = require('express');
const router = express.Router();
const Note = require('../models/Note');


// Get all notes for a user
router.get('/:userId', async (req, res) => {
    try {
      const notes = await Note.find({ userId: req.params.userId });
      res.json(notes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


// Create a new note
router.post('/addnote', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a note
router.patch('/:id', async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;