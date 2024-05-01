import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import '../InscricaoForm.css';
import { schemaCadastroUsuario } from './InscricaoFormSchema';

const useModalCadastrese = () => {

    const { handleSubmit, register, setValue, formState: { errors }, reset } = useForm({
        resolver: zodResolver(schemaCadastroUsuario),
        shouldFocusError: false,
    });

    const [openAlert, setOpenAlert] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    
    const onSubmit = async (data) => {
        console.log('Dados do formulário:', data);
        const validationResult = schemaCadastroUsuario.safeParse(data);
        if (validationResult.success) {

            // Dados válidos, prosseguir com o envio
            console.log('Dados do formulário:', data);
            try {
                const response = await axios.post('http://127.0.0.1:8000/usuarios/', 
              //  console.log(
                {
                    usu_usuario: data.usuario,
                    usu_nome_completo: data.nomeCompleto,
                    password : data.senha,
                    // usu_perfil: 1,  
                    usu_ativo: true,
                    usu_data_criacao: new Date().toISOString(),
                    usu_data_alteracao: new Date().toISOString(),
                    usu_data_exclusao: new Date().toISOString(),
                });

               // console.log('Resposta da API:', response.data);
                setOpenAlert(true); 
                setShowSuccessMessage(true);
                setTimeout(() => {
                    setShowSuccessMessage(false);
                    setErrorMessage(null);
                  // handleClose();
                    reset();
                }, 2000);

            } catch (error) {
                console.error('Erro ao criar usuário:', error);
                setErrorMessage(`Erro ao criar usuario. Por favor, tente novamente.<br /><br />Detalhes do erro:<br />${error.message}`);
            }
        } else {
            // Dados inválidos, exibir erros
            console.error('Erro de validação:', validationResult.error.errors);
        }
    };

    // Retorna um objeto com todos os valores que você deseja exportar
    return {
        handleSubmit,
        register,
        setValue,
        errors,
        onSubmit,
        openAlert,
        showSuccessMessage,
        setShowSuccessMessage,
        setErrorMessage ,
        errorMessage,
    };
};

export default useModalCadastrese; 