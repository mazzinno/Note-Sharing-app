const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { clerkClient } = require('@clerk/clerk-sdk-node');



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


router.post('/:id/share', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    // Find the note
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if the user exists in Clerk
    const users = await clerkClient.users.getUserList({ emailAddress: email });
    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userToShare = users[0];

    // Add the user's email to the sharedWith array if not already present
    if (!note.sharedWith.includes(email)) {
      note.sharedWith.push(email);
      await note.save();
    }

    res.status(200).json({ message: 'Note shared successfully' });
  } catch (error) {
    console.error('Error sharing note:', error);
    res.status(500).json({ message: 'Error sharing note' });
  }
});

module.exports = router;