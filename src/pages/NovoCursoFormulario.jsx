import React from 'react';
import { Controller } from 'react-hook-form';
import { Alert } from 'react-bootstrap';
import '../InscricaoForm.css';
import useNovoCursoFormulario from './useNovoCursoFormulario';

const NovoCursoFormulario = ({ handleClose }) => {
    const { handleSubmit, register, control,  errors, showSuccessMessage,setShowSuccessMessage,onSubmit } 
    = useNovoCursoFormulario(handleClose);

    return (
        <div className="modal-content">
            <div className="modal-header justify-content-center">
                <h5 className="modal-title">Novo Curso</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="ativo" className='titulo'>
                                Curso Ativo?
                            </label>
                            <input type="checkbox" id="ativo" className="form-check-input" {...register("ativo")} />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="titulo" className='titulo'>
                                Título do Curso:
                                <span className='vermelho'>*</span>
                            </label>
                            <input type="text" id="titulo" className="form-control" {...register("titulo")} />
                            {errors.titulo && <span className="error-message text-danger">{errors.titulo.message}</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor='descricao' className='titulo'>
                                Descrição do Curso:
                                <span className='vermelho'>*</span>
                            </label>
                            <input type="text" id="descricao" className="form-control" {...register("descricao")} />
                            {errors.descricao && <span className="error-message text-danger">{errors.descricao.message}</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor='cargaHoraria' className='titulo'>
                                Carga Horária (em horas):
                                <span className='vermelho'>*</span>
                            </label>
                            <input type="text" id="cargaHoraria" className="form-control" {...register("cargaHoraria")} />
                            {errors.cargaHoraria && <span className="error-message text-danger">{errors.cargaHoraria.message}</span>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor='valor' className='titulo'>
                                Valor:
                                <span className='vermelho'>*</span>
                            </label>
                            <input type="text" id="valor" className="form-control" {...register("valor")} />
                            {errors.valor && <span className="error-message text-danger">{errors.valor.message}</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <Controller
                                name="dtInicialCurso"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <div>
                                        <label htmlFor="dtInicialCurso" className="form-label titulo">
                                            Data Inicial do Curso:
                                            <span className='vermelho'>*</span>
                                        </label>
                                        <input {...field} type="date" className="form-control" />
                                        {errors.dtInicialCurso && <span className="error-message  text-danger">{errors.dtInicialCurso.message}</span>}
                                    </div>
                                )}
                            />
                        </div>
                        <div className="col-md-6">
                            <Controller
                                name="dtFinalCurso"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <div>
                                        <label htmlFor="dtFinalCurso" className="form-label titulo">
                                            Data Final do Curso:
                                            <span className='vermelho'>*</span>
                                        </label>
                                        <input {...field} type="date" className="form-control" />
                                        {errors.dtFinalCurso && <span className="error-message  text-danger">{errors.dtFinalCurso.message}</span>}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-12 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary">Criar Curso</button>
                        </div>
                    </div>
                </form>
                {showSuccessMessage && (
                    <Alert variant="success" onClose={() => setShowSuccessMessage(false)} dismissible>
                        Curso criado com sucesso!
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default NovoCursoFormulario;
