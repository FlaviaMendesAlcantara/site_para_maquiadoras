import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function HomePage() {
    return (
    <Navbar bg="light" expand="lg">
        <Container>
        <Navbar.Brand href="#home">Meu Site</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="#home">Página Inicial</Nav.Link>
            <Nav.Link href="#about">Sobre</Nav.Link>
            {/* Adicione links para as outras páginas */}
            </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default HomePage;
