import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import './notes.css'

const AddingNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { user } = useUser();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newNote = {
      userId: user?.id ?? "",
      date: new Date(),
      title: title,
      content: content,
    };

    // the adding logic
    setTitle("");
    setContent("");
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Title:</label>
          <input
            type="text"
            required
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-field">
          <label>Content:</label>
          <textarea
            required
            className="input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" className="button">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddingNote;