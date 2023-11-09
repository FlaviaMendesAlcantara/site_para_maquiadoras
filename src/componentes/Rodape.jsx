import React from 'react';
import { Container } from 'react-bootstrap';

const footerStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    boxShadow: "0px -5px 10px rgba(0, 0, 0, 0.20)" 
};

function Footer() {
    const anoAtual = new Date().getFullYear();

    return (
        <footer style={footerStyle} className="py-3 bg-light">
        <Container>
            <div className="text-muted text-center">
            ©{anoAtual} Flávia Alcântara. Todos os direitos reservados.
            </div>
        </Container>
        </footer>
    );
}

export default Footer;
