import React from 'react';
import {  useForm } from 'react-hook-form';
import { schemaNovoCurso } from './InscricaoFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import '../InscricaoForm.css';
import  axios from 'axios';

const useNovoCursoFormulario = (handleClose) => {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        resolver: zodResolver(schemaNovoCurso), // Use o resolver Zod para validação
    });

    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState(null);

    const onSubmitForm = async (data) => {
        try { 
        // Ajuste os dados para corresponder ao formato esperado pela API
        const adjustedData = {
            cur_ativo: data.ativo, // Supondo que 'ativo' corresponde a 'cur_ativo'
            cur_titulo: data.titulo,
            cur_descricao: data.descricao,
            cur_carga_horaria: parseInt(data.cargaHoraria), // Converta para um número
            cur_valor: data.valor,
            cur_data_inicio: data.dtInicialCurso,
            cur_data_fim: data.dtFinalCurso,
            cur_data_exclusao: null // Se necessário, ajuste o valor para 'cur_data_exclusao'
        };
            //fazer a requisição post 
            await axios.post('http://127.0.0.1:8000/cursos/', adjustedData);

            // Defina a mensagem de sucesso
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                setErrorMessage(null);
                handleClose();
                reset();
            }, 2000);

        } catch (error) {
            console.log(error);
            console.log(errorMessage);
            // Em caso de erro, exiba a mensagem de erro
            setErrorMessage(`Erro ao criar o curso. Por favor, tente novamente.<br /><br />Detalhes do erro:<br />${error.message}`);
        } 
    }

    const onSubmit = async (data) => {
        const validationResult = schemaNovoCurso.safeParse(data);
        if (validationResult.success) {
            onSubmitForm(data);
        } else {
            // Dados inválidos, exibir erros
            console.error('Erro de validação:', validationResult.error.errors);
        }
    };

    return{
        register
        , handleSubmit
        , errors 
        , control
        , reset     
        , showSuccessMessage
        , setShowSuccessMessage
        , onSubmit
        , setErrorMessage 
        , errorMessage
    }
};

export default useNovoCursoFormulario;
