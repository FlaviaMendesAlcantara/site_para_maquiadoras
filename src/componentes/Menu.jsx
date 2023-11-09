import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css'; // Importe o arquivo CSS para aplicar os estilos

function Menu() {
  return (
    <Navbar expand="lg" bg="light" className="custom-navbar">
      <Navbar.Brand href="#">Gabi Makeup</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/" className="menu-link">Início</Nav.Link>
          <Nav.Link href="/about" className="menu-link">Sobre Mim</Nav.Link>
          <Nav.Link href="/portfolio" className="menu-link">Galeria</Nav.Link>
          <Nav.Link href="/courses" className="menu-link">Cursos</Nav.Link>
          <Nav.Link href="/tutorials" className="menu-link">Tutoriais</Nav.Link>
        </Nav>
        <Link to="/login"  style={{marginLeft: 'auto'}}>
          <Button variant='light' className="botao-entrar">Entrar</Button>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
