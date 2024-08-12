import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useNotes } from '../../context/Notes-contexts';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import './notes.css';

const AddingNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();
  const { addNote } = useNotes();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const newNote = {
      userId: user?.id ?? "",
      title: title,
      content: content,
    };
  
    try {
      await addNote(newNote);
      setTitle("");
      setContent("");
      setShowModal(true);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleClose = () => setShowModal(false);
  
  return (
    <Container className="form-container">
      <Form onSubmit={handleSubmit} className="note-form">
        <Form.Group className="form-field" controlId="noteTitle">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            required
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 60))}
            maxLength={60}
          />
        </Form.Group>
        <Form.Group className="form-field" controlId="noteContent">
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            required
            className="input"
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, 500))}
            maxLength={400}
            rows={4}
          />
        </Form.Group>
        <Button type="submit" className="button">
          Add Note
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>You added a note successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddingNote;