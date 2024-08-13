import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNotes } from '../../context/Notes-contexts';

const SharedWithMe = () => {
  const { user } = useUser();
  const [sharedNotes, setSharedNotes] = useState([]);
  const { fetchNotes } = useNotes();

  useEffect(() => {
    console.log('Current User Email:', user.emailAddress);
    const fetchSharedNotes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/note/shared/${user.emailAddress}`);
        console.log('Fetch response:', response);
        if (response.ok) {
          const notes = await response.json();
          console.log('Shared Notes:', notes);
          setSharedNotes(notes);
        }
      } catch (err) {
        console.error('Error fetching shared notes:', err);
      }
    };
    fetchSharedNotes();
    }, [user]);

  return (
    <Container fluid className="mt-4">
      <h2 className="text-center mb-4">Shared with Me</h2>
      <Row>
        {sharedNotes.length === 0 ? (
          <Col>
            <p className="text-center">No notes have been shared with you.</p>
          </Col>
        ) : (
          sharedNotes.map((note) => (
            <Col key={note._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{note.title}</Card.Title>
                  <Card.Text>{note.content}</Card.Text>
                  <small>{new Date(note.date).toLocaleDateString()}</small>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default SharedWithMe;
