import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import "../Cursos.css";
import maquiagemIcon from "../img/autoMaquiagem.jpg"; 
import InscricaoForm from "./InscricaoForm.jsx";
import NovoCursoFormulario from './NovoCursoFormulario.jsx';
import { Modal } from 'react-bootstrap';

/**
 * Componente funcional que representa a página de cursos.
 * @return {JSX.Element} O componente JSX da página de cursos.
 */

const cursosData = [
  {
    id: 1,
    nome: "Curso de Automaquiagem Básica",
    descricao: "Aprenda técnicas básicas de automaquiagem.",
    inicioInscricoes: "01/02/2024",   
    terminoInscricoes: "15/02/2024",
    cargaHoraria: "10 horas",
    valor: "R$ 50,00",
    inicioCurso: "01/03/2023",
    terminoCurso: "10/03/2023",
  },
  // Adicione mais cursos conforme necessário
];

function Cursos() {

  const [inscricaoOpen, setInscricaoOpen] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);  
  const [modalAberto, setModalAberto] = useState(false);

  //setIsAdmin(true);

  const handleInscricaoOpen = (curso) => {
    setCursoSelecionado(curso.nome);
    setInscricaoOpen(true);
  };

  const handleInscricaoClose = () => {
    setInscricaoOpen(false);
  };

  const handleNovoCurso = () => {
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false); // Fecha o modal
  };

  return (
    <div className="cursos-container">      

      <div className="button-container">
        {isAdmin && (
          <Button onClick={handleNovoCurso} variant="contained" color="primary">
            Criar Novo Curso
          </Button>          
        )}        
      </div>

      {/* // No componente Cursos.jsx */}
    <Modal show={modalAberto} onHide={handleFecharModal}>
      <Modal.Header closeButton>
        <Modal.Title>Criar Novo Curso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <NovoCursoFormulario handleClose={handleFecharModal} />
      </Modal.Body>
    </Modal>

      
      <h1>Cursos Disponíveis</h1>
      <ul className="cursos-list">
        {cursosData.map((curso) => (
          <li key={curso.id} className="curso-item">
            <div className="curso-header">             
              <img
                src={maquiagemIcon}
                alt="Ícone de Maquiagem"
                className="maquiagem-icon"
              />             
            </div>
            <div className="curso-content">
              <h3>{curso.nome}</h3>
              <p>{curso.descricao}</p>               
              <p>
                <strong>Data de Inscrição:</strong> {curso.inicioInscricoes} até{" "}
                {curso.terminoInscricoes}
              </p>
              <p>
                <strong>Carga Horária:</strong> {curso.cargaHoraria}
              </p>
              <p>
                <strong>Valor:</strong> {curso.valor}
              </p>
              <p>
                <strong>Data do Curso:</strong> {curso.inicioCurso} até{" "}
                {curso.terminoCurso}
              </p>
            </div>
            
            <Button
              onClick={() => handleInscricaoOpen(curso)}
              variant="contained"
              color="secondary"
              endIcon={<ArrowForwardIcon />}
            >
              Inscreva-se agora
            </Button>

          </li>
        ))}
        
        {/* Modal de inscrição */}
        <InscricaoForm
          open={inscricaoOpen}
          handleClose={handleInscricaoClose}
          cursoNome={cursoSelecionado}
        />
      </ul>
    </div>
  );
}

export default Cursos;