import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Menu() {
  return (
    <Navbar expand="lg" bg="light" >
      <Navbar.Brand href="#">Gabi Makeup</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Início</Nav.Link>
          <Nav.Link href="/about">Sobre Mim</Nav.Link>
          <Nav.Link href="/portfolio">Galeria</Nav.Link>
          <Nav.Link href="/courses">Cursos</Nav.Link>
          <Nav.Link href="/tutorials">Tutoriais</Nav.Link>
          {/* <Nav.Link href="/questions">Dúvidas</Nav.Link> */}
          {/* <Nav.Link href="/comments">Comentários</Nav.Link> */}
          {/* <Nav.Link href="/commentApproval">Aprovação de Comentários</Nav.Link> */}
        </Nav>
      </Navbar.Collapse> 
    </Navbar>
  );
}

export default Menu;
