
// import React from 'react';
// import {Navbar, Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Menu.css'; // Importe o arquivo CSS para aplicar os estilos
/**
 * Componente funcional que representa a página de Menu.
 * @return {JSX.Element} O componente JSX da página de Menu.
 */
function Menu() {
  return (
    <Navbar expand="lg" bg="light" className="custom-navbar">
      <Navbar.Brand href="#">Gabi Makeup</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"
          <Nav.Link as={Link} to="/home" className="menu-link">Início</Nav.Link>
          <Nav.Link as={Link} to="/sobre" className="menu-link">Sobre Mim</Nav.Link>
          <Nav.Link as={Link} to="/galeria" className="menu-link">Galeria</Nav.Link>
          <Nav.Link as={Link} to="/cursos" className="menu-link">Cursos</Nav.Link>
          <Nav.Link as={Link} to="/tutoriais" className="menu-link">Tutoriais</Nav.Link>
        </Nav>
        <Link to="/login" style={{marginLeft: 'auto'}}>
          <Button variant='light' className="botao-entrar">Entrar</Button>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
