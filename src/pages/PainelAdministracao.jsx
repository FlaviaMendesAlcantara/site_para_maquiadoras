import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import "../PainelAdministracao.css";
import NovoCursoFormulario from './NovoCursoFormulario.jsx';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { format } from 'date-fns';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-data-table-component/styles.css';
import 'react-data-table-component/dist/DataTable.css';
import 'react-data-table-component/dist/react-data-table.css';



/**
 * Componente funcional que representa a página de cursos.
 * @return {JSX.Element} O componente JSX da página de cursos.
 */
function PainelAdminstracao() {

  const [isAdmin, setIsAdmin] = useState(true);  
  const [modalAberto, setModalAberto] = useState(false);
  const [mostrarTabela, setMostrarTabela] = useState(false);
  const [inscricoes, setInscricoes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [cursoSelecionado, setCursoSelecionado] = useState('');

  useEffect(() => {
    async function fetchInscricoes() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/inscricoes/');
        setInscricoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar inscrições:', error);
      }
    }

    if (mostrarTabela) {
      fetchInscricoes();
    }
  }, [mostrarTabela]);

  useEffect(() => {
    async function fetchCursos() {
      try {
        const cursoPromises = inscricoes.map(async inscricao => {
          const response = await axios.get(`http://127.0.0.1:8000/cursos/${inscricao.ins_codigo_curso}/`);
          return response.data;
        });
        const cursosData = await Promise.all(cursoPromises);
        setCursos(cursosData);
      } catch (error) {
        console.error('Erro ao buscar cursos:', error);
      }
    }

    if (mostrarTabela) {
      fetchCursos();
    }
  }, [inscricoes, mostrarTabela]);

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
      {mostrarTabela && (
        <select value={cursoSelecionado} onChange={(e) => setCursoSelecionado(e.target.value)}>
          <option value="">Todos os Cursos</option>
          {cursos.map((curso) => (
            <option key={curso.cur_id} value={curso.cur_id}>{curso.cur_titulo}</option>
          ))}
        </select>
      )}

      {mostrarTabela && (
        <DataTable
          columns={[
            { name: 'Curso inscrito', selector: 'cursoTitulo' },
            { name: 'Nome Completo', selector: 'ins_nome_completo' },
            { name: 'Data de Nascimento', selector: 'ins_data_nascimento' },
            { name: 'Número de Telefone', selector: 'ins_numero_telefone' },
            { name: 'Tipo de Pagamento', selector: 'ins_tipo_pagamento' },
            { name: 'Modalidade do Curso', selector: 'ins_modalidade_curso' },
            { name: 'Tipo de Pele', selector: 'ins_tipo_pele' },
            { name: 'Tem Alergia?', selector: 'ins_alergia' },
            { name: 'Quais Alergias?', selector: 'ins_tipo_alergia' },
            { name: 'Data da inscrição', selector: 'ins_data_inscricao' },
          ]}
          data={inscricoes.map((inscricao, index) => ({
            ...inscricao,
            cursoTitulo: cursos[index]?.cur_titulo || '',
            ins_data_nascimento: format(new Date(inscricao.ins_data_nascimento), 'dd/MM/yyyy'),
            ins_data_inscricao: format(new Date(inscricao.ins_data_inscricao), 'dd/MM/yyyy'),
            ins_alergia: inscricao.ins_alergia ? 'Sim' : 'Não',
          }))}
          pagination
        />
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