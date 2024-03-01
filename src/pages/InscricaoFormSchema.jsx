import { z } from 'zod';


export const schema = z.object({
    nome: z.string().min(5, "O nome é obrigatório.").max(255, "O nome excedeu o tamanho máximo."),
    telefone: z.string().refine(value => {
        // Remover caracteres não numéricos antes de validar
        const numericValue = value.replace(/\D/g, '');
        return numericValue.length >= 11 && numericValue.length <= 14;
    }, "Digite um número de telefone válido."),
    dataNascimento: z.string().refine((value) => { 
        // Verifica se a data está entre 14 e 90 anos atrás da data atual
        const [day, month, year] = value.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 90); // 90 anos atrás
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 14); // 14 anos atrás

        return parsedDate instanceof Date && parsedDate < maxDate && parsedDate > minDate;
    }, {
        message: 'Digite uma data válida maior que 14 anos e menor que 90 anos no formato dd/mm/aaaa'
    }),
    tipoPele: z.string().min(1,"Selecione um tipo de pele."),
    tipoPagamento: z.string().min(1,"Selecione um tipo de pagamento."),
    modalidadeCurso: z.string().min(1,"Selecione a modalidade do curso."),
    temAlergia: z.string().min(1,"Selecione se tem alergia."),
    alergia: z.string().optional()
});

export const schemaNovoCurso = z.object({
    titulo: z.string().min(5, "O título é obrigatório!").max(255, "O título excedeu o tamanho máximo."),
    descricao: z.string().min(5, "A descrição é obrigatória!").max(555, "A descrição excedeu o tamanho máximo."),
    cargaHoraria: z.string()
    .min(1, "Informe a carga horária do curso.")
    .refine(value => {
        const horas = parseInt(value);
        return horas > 0 && horas <= 30;
    }, {
        message: "A carga horária deve estar entre 1 e 30 horas."
    }),
    valor: z.string()
    .min(1, "Informe o valor do curso.")
    .refine(value => /^\d+(\.\d{1,2})?$/.test(value), {
        message: "Informe um valor válido para o curso, com até duas casas decimais.ex: 10.00"
    }),
    dtInicialCurso: z.string().refine((value) => { 
        const [day, month, year] = value.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        return !isNaN(parsedDate.getDate());
    }, {
        message: 'Digite uma data válida no formato dd/mm/aaaa'
    }),
    dtFinalCurso: z.string().refine((value) => { 
        const [day, month, year] = value.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        return !isNaN(parsedDate.getDate());
    }, {
        message: 'Digite uma data válida no formato dd/mm/aaaa'
    }),
    ativo: z.coerce.boolean().optional(),
})