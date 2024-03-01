import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import '../InscricaoForm.css';
import { schema } from './InscricaoFormSchema';

const useInscricaoForm = (handleClose) => { // Adicionei handleClose como parâmetro

    const { handleSubmit, register, setValue, control, formState: { errors }, watch, reset } = useForm({
        resolver: zodResolver(schema),
        shouldFocusError: false,
    });
    const [openAlert, setOpenAlert] = useState(false);
    
    const watchTemAlergia = watch("temAlergia");

    const onSubmit = async (data) => {
        const watchTemAlergia = watch("temAlergia");
        const validationResult = schema.safeParse(data);
        if (validationResult.success) {
            // Validar se tem alergia apenas se a opção "sim" foi selecionada
            if (watchTemAlergia === "sim" && !data.alergia) {
                console.error('Erro de validação: Informe quais tipos de alergia você tem.');
                return;
            }

            // Dados válidos, prosseguir com o envio
            console.log('Dados do formulário:', data);
            setOpenAlert(true); // Abre o alerta
            setTimeout(() => {
                setOpenAlert(false); // Fecha o alerta após um atraso
                handleClose(); // Fecha o modal após um atraso
                reset(); // Fecha o modal após um atraso
            }, 2000);
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
        control,
        errors,
        onSubmit,
        watchTemAlergia,
        openAlert
    };
};

export default useInscricaoForm;
