import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent,  TextField, Select, MenuItem, Button,} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const InscricaoForm = ({ open, handleClose, cursoNome }) => {
    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        // Lógica para enviar os dados do formulário
        console.log('Dados do formulário:', data);
        handleClose(); // Fechar o modal após enviar
    };

    return (
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Inscrição para {cursoNome}</DialogTitle>
        <DialogContent>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="nome"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                    <TextField label="Nome" {...field} fullWidth />
                    )}
                />
                {/* Adicione outros campos conforme necessário */}
                <Button
                    type="submit"
                    variant="contained"
                    color="palette success dark"  // Você pode trocar isso por "primary", "secondary", "default", etc.
                    endIcon={<SaveIcon />}
                >
                    Salvar
                </Button>

                {/* Botão com estilo outlined (contorno) e cor vermelha */}
                <Button
                    type="submit"
                    variant="outlined"
                    color="error"  // Cor vermelha para indicar erro
                    endIcon={<CancelIcon />}
                >
                    Cancelar
                </Button>
            </form>
        </DialogContent>
        </Dialog>
    );
};

export default InscricaoForm;