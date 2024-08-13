// NoteContext.js
import { useUser } from "@clerk/clerk-react";
import { createContext, useContext, useEffect, useState } from "react";

// Note structure
const Note = {
  _id: String,
  userId: String,
  date: Date,
  title: String,
  content: String
};

const NoteContext = createContext(undefined);

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const { isLoaded, isSignedIn, user } = useUser();

  const fetchNotes = async () => {
    if (!isLoaded || !isSignedIn) return;
    try {
      const response = await fetch(`http://localhost:5000/api/note/${user.id}`);
      if (response.ok) {
        const fetchedNotes = await response.json();
        setNotes(fetchedNotes);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [isSignedIn]);

  const addNote = async (note) => {
    if (!isLoaded || !isSignedIn) return;
    try {
      const response = await fetch("http://localhost:5000/api/note/addnote", {
        method: "POST",
        body: JSON.stringify(note),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const newNote = await response.json();
        setNotes((prev) => [...prev, newNote]);
      }
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  const updateNote = async (id, newNote) => {
    if (!isLoaded || !isSignedIn) return;
    try {
      const response = await fetch(`http://localhost:5000/api/note/${id}`, {
        method: "PATCH",
        body: JSON.stringify(newNote),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const updatedNote = await response.json();
        setNotes((prev) =>
          prev.map((note) => (note._id === id ? updatedNote : note))
        );
      }
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  const deleteNote = async (id) => {
    if (!isLoaded || !isSignedIn) return;
    try {
      const response = await fetch(`http://localhost:5000/api/note/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setNotes((prev) => prev.filter((note) => note._id !== id));
      }
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const shareNote = async (noteId, email) => {
  try {
    const response = await fetch(`http://localhost:5000/api/note/${noteId}/share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error('Failed to share note');
    }
    const data = await response.json();
    // Update the notes state if necessary
    setNotes(notes.map(note => 
      note._id === noteId ? { ...note, sharedWith: [...note.sharedWith, email] } : note
    ));
    return data;
  } catch (error) {
    console.error('Error sharing note:', error);
    throw error;
  }
};

  return (
    <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote, fetchNotes, shareNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }
  return context;
};