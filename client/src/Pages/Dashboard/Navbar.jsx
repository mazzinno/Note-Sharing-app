import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/clerk-react";

function CustomNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Notrey</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/add">Add</Nav.Link>
            <Nav.Link as={Link} to="/notes">Notes</Nav.Link>
            <Nav.Link as={Link} to="/shared">Shared with Me</Nav.Link>
          </Nav>
          <Nav>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="btn btn-outline-light me-2">Sign In</button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="btn btn-primary">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;