import React from 'react';
import {  useForm } from 'react-hook-form';
import { schemaNovoCurso } from './InscricaoFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import '../InscricaoForm.css';

const useNovoCursoFormulario = (handleClose) => {
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm({
        resolver: zodResolver(schemaNovoCurso), // Use o resolver Zod para validação
    });

    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);

    const onSubmit = async (data) => {
        const validationResult = schemaNovoCurso.safeParse(data);
        if (validationResult.success) {
            // Dados válidos, prosseguir com o envio
            console.log('Dados do formulário:', data);
            setShowSuccessMessage(true); // Exibe o alerta de sucesso
            setTimeout(() => {
                setShowSuccessMessage(false); // Fecha o alerta após um atraso
                handleClose(); // Fecha o modal após um atraso
                reset(); // Limpa o formulário após um atraso
            }, 2000); // Atraso de 2 segundos
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
    }
};

export default useNovoCursoFormulario;
