import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Dialog, DialogTitle, DialogContent, TextField, Select, MenuItem, Button, Grid, InputLabel, Snackbar, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Alert from '@material-ui/lab/Alert';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import InputMask from 'react-input-mask';
import { zodResolver } from '@hookform/resolvers/zod';

import { z } from 'zod';

const schema = z.object({
    nome: z.string().min(1,"O nome é obrigatório.").max(255,"O nome excedeu o tamanho máximo."),
    // telefone: z.string().min(14,"Digite um número de telefone válido.").max(14),
    dataNascimento: z.coerce.date().refine((value) => {
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 10);
        
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 100);

        const selectedDate = new Date(value);

        return selectedDate >= minDate && selectedDate <= maxDate;
    }, {
        message: 'A data de nascimento deve estar entre 10 e 100 anos atrás'
    }),
    // tipoPele: z.enum(['seca', 'mista', 'oleosa', 'outro']),
    // temAlergia: z.enum(['sim', 'nao']),
    // alergia: z.string().optional(),
    // tipoPagamento: z.enum(['pix', 'dinheiro', 'debito', 'credito']),
    // modalidadeCurso: z.enum(['presencial', 'online']),
});

const InscricaoForm = ({ open, handleClose, cursoNome }) => {
    const { handleSubmit, control, watch, formState: { errors }, reset} = useForm({
        resolver: zodResolver(schema),
    });
    const [openAlert, setOpenAlert] = useState(false);

    const onSubmit = async (data) => {
        const validationResult = schema.safeParse(data);
        if (validationResult.success) {
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
    
 

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Inscrição para {cursoNome}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="nome"
                                control={control}
                                defaultValue=""
                                rules={{ required: "O nome é obrigatório." }}
                                render={({ field }) => (
                                    <TextField
                                        label="Nome"
                                        {...field}
                                        fullWidth
                                        size="large"
                                        error={!!errors.nome}
                                        helperText={errors.nome && errors.nome.message}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="dataNascimento"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <>
                                        <TextField
                                            label="Data de Nascimento"
                                            type="date"
                                            {...field}
                                            fullWidth
                                            size="large"
                                            error={!!errors.dataNascimento}
                                            helperText={errors.dataNascimento && errors.dataNascimento.message}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        {errors.dataNascimento && <Typography variant="body2" color="error">{errors.dataNascimento.message}</Typography>}
                                    </>
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="telefone"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <InputMask
                                        mask="(99) 99999-9999"
                                        value={field.value}
                                        onChange={field.onChange}
                                    >
                                        {(inputProps) => 
                                            <TextField 
                                                {...inputProps}     
                                                label="Telefone" 
                                                fullWidth 
                                                size="large"
                                            />
                                        }
                                    </InputMask>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="tipo-pele">Tipo de Pele</InputLabel>
                            <Controller
                                name="tipoPele"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        fullWidth
                                        size="large"
                                        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                                        displayEmpty
                                        renderValue={(value) => (value === '' ? 'Escolha uma opção' : value)}
                                    >
                                        <MenuItem value="seca">Seca</MenuItem>
                                        <MenuItem value="mista">Mista</MenuItem>
                                        <MenuItem value="oleosa">Oleosa</MenuItem>
                                        <MenuItem value="outro">Não sei</MenuItem>
                                    </Select>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="tem-alergia">Tem Alergia?</InputLabel>
                            <Controller
                                name="temAlergia"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select 
                                        {...field} 
                                        fullWidth 
                                        size="large"
                                        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                                        displayEmpty
                                        renderValue={(value) => (value === '' ? 'Escolha uma opção' : value)}
                                    >
                                        <MenuItem value="sim">Sim</MenuItem>
                                        <MenuItem value="nao">Não</MenuItem>
                                    </Select>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="alergia"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        label="Quais Alergias?"
                                        {...field}
                                        fullWidth
                                        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                                        displayEmpty
                                        renderValue={(value) => (value === '' ? 'Escolha uma opção' : value)}
                                        disabled={watch("temAlergia") === "nao"}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="modalidadeCurso">Modalidade do Curso</InputLabel>
                            <Controller
                                name="modalidadeCurso"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select 
                                        {...field} 
                                        fullWidth 
                                        size="large"
                                        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                                        displayEmpty
                                        renderValue={(value) => (value === '' ? 'Escolha uma opção' : value)}
                                    >                                
                                        <MenuItem value="presencial">Presencial</MenuItem>
                                        <MenuItem value="online">Online</MenuItem>
                                    </Select>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel htmlFor="tipoPagamento">Tipo de Pagamento</InputLabel>
                            <Controller
                                name="tipoPagamento"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select 
                                        {...field} 
                                        fullWidth 
                                        size="large"
                                        style={{ color: 'rgba(0, 0, 0, 0.7)' }}
                                        displayEmpty
                                        renderValue={(value) => (value === '' ? 'Escolha uma opção' : value)}
                                    >
                                        <MenuItem value="pix">Pix</MenuItem>
                                        <MenuItem value="dinheiro">Dinheiro</MenuItem>
                                        <MenuItem value="debito">Débito</MenuItem>
                                        <MenuItem value="credito">Crédito</MenuItem>
                                    </Select>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} container justify="center">
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                endIcon={<SaveIcon />}
                                style={{ marginRight: '10px' }}
                            >
                                Salvar
                            </Button>
                            <Button
                                type="button"
                                variant="outlined"
                                color="secondary"
                                endIcon={<CancelIcon />}
                                onClick={handleClose}
                            >
                                Cancelar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {openAlert && (
                    <Alert style={{ fontSize: '1.2rem' }} severity="success" onClose={() => setOpenAlert(false)}>
                        Sua inscrição no curso foi feita com sucesso
                    </Alert>
                )}

            </DialogContent>
        </Dialog>
    );
};

export default InscricaoForm;
