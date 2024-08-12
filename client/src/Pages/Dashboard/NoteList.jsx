import React, { useEffect, useState } from 'react';
import { useNotes } from '../../context/Notes-contexts';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPencilAlt, FaStar } from 'react-icons/fa';

const NoteList = () => {
  const { notes, fetchNotes, deleteNote } = useNotes();
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    const colorList = [
      '#ffd166', '#f4a261', '#e9c46a', '#b5838d', '#90be6d', '#48cae4',
      '#ffafcc', '#a2d2ff', '#cdb4db', '#bde0fe', '#d8f3dc', '#ffc6ff'
    ];
    const shuffled = [...colorList].sort(() => 0.5 - Math.random());
    setColors(shuffled.slice(0, notes.length));
  }, [notes]);

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="text-center mb-4">Notes</h2>
      <Row>
        {notes.length === 0 ? (
          <Col>
            <p className="text-center">You don't have any notes yet.</p>
          </Col>
        ) : (
          notes.map((note, index) => (
            <Col key={note._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card 
                style={{ 
                  backgroundColor: colors[index], 
                  border: 'none', 
                  borderRadius: '10px',
                  height: '200px',
                  overflow: 'hidden'
                }}
              >
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{truncateText(note.title, 60)}</Card.Title>
                  <Card.Text className="flex-grow-1" style={{ overflowY: 'auto' }}>
                    {truncateText(note.content, 250)}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <small>{new Date(note.date).toLocaleDateString()}</small>
                    <div>
                      {note.isImportant && <FaStar className="me-2" />}
                      <Button variant="link" className="p-0 me-2">
                        <FaPencilAlt />
                      </Button>
                      <Button variant="link" className="p-0" onClick={() => handleDelete(note._id)}>
                        &#x2715;
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default NoteList;