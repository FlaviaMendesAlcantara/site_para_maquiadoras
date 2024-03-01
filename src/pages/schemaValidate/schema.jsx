import { z } from 'zod';

// Define o esquema de validação usando Zod
const schema = z.object({
    nome: z.string().min(1).max(255),
    telefone: z.string().min(14).max(14), // Adapte isso conforme necessário
    dataNascimento: z.date().refine((value) => {
        // Verifica se a data está entre 10 e 100 anos atrás
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 10);
        
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 100);

        const selectedDate = new Date(value);

        return selectedDate >= minDate && selectedDate <= maxDate;
    }, {
        message: 'A data de nascimento deve estar entre 10 e 100 anos.'
    }),
    tipoPele: z.enum(['seca', 'mista', 'oleosa', 'outro']),
    temAlergia: z.enum(['sim', 'nao']),
    alergia: z.string().optional(),
    tipoPagamento: z.enum(['pix', 'dinheiro', 'debito', 'credito']),
    modalidadeCurso: z.enum(['presencial', 'online']),
});

// // Valida os dados do formulário usando o esquema definido
// try {
//     const validatedData = schema.parse(formData);
//     console.log('Dados válidos:', validatedData);
// } catch (error) {
//     console.error('Erro de validação:', error);
// }
