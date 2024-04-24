import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import "../PainelAdministracao.css";
import NovoCursoFormulario from './NovoCursoFormulario.jsx';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

/**
 * Componente funcional que representa a página de cursos.
 * @return {JSX.Element} O componente JSX da página de cursos.
 */
function PainelAdminstracao() {

  const [isAdmin, setIsAdmin] = useState(true);  
  const [modalAberto, setModalAberto] = useState(false);
  const [mostrarTabela, setMostrarTabela] = useState(false);
  const [inscricoes, setInscricoes] = useState([]);

  useEffect(() => {
    async function fetchInscricoes() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/inscricoes');
        setInscricoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar inscrições:', error);
      }
    }

    if (mostrarTabela) {
      fetchInscricoes();
    }
  }, [mostrarTabela]);

  const handleNovoCurso = () => {
    setModalAberto(true);
  };

  const handleFecharModal = () => {
    setModalAberto(false); // Fecha o modal
  };

  const handleMostrarTabela = () => {
    setMostrarTabela(true);
  };

  return (
    <div className="painel-container">
      <h1>Painel de Administração</h1>
      <div className="button-container">
        {isAdmin && (
          <div>
            <Button onClick={handleNovoCurso} variant="contained" color="primary">
              Criar Novo Curso
            </Button>
            <Button onClick={handleMostrarTabela} variant="contained" color="primary">
              Lista de Inscrições
            </Button>
          </div>
        )}
      </div>

      {/* Tabela de Inscrições */}
      {mostrarTabela && (
        <table>
          <thead>
            <tr>
              <th>Nome Completo</th>
              <th>Data de Nascimento</th>
              <th>Número de Telefone</th>
              <th>Tipo de Pagamento</th>
              <th>Modalidade do Curso</th>
              <th>Tipo de Pele</th>
              <th>Tem Alergia?</th>
              <th>Quais Alergias?</th>
            </tr>
          </thead>
          <tbody>
            {inscricoes.map((inscricao, index) => (
              <tr key={index}>
                <td>{inscricao.nomeCompleto}</td>
                <td>{inscricao.dataNascimento}</td>
                <td>{inscricao.telefone}</td>
                <td>{inscricao.tipoPagamento}</td>
                <td>{inscricao.modalidadeCurso}</td>
                <td>{inscricao.tipoPele}</td>
                <td>{inscricao.temAlergia ? 'Sim' : 'Não'}</td>
                <td>{inscricao.quaisAlergias}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal para criar novo curso */}
      <Modal show={modalAberto} onHide={handleFecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Criar Novo Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NovoCursoFormulario handleClose={handleFecharModal} />
        </Modal.Body>
      </Modal>

    </div>
  );
}

export default PainelAdminstracao;