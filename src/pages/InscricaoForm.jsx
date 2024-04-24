import React from 'react';
import { Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';
import '../InscricaoForm.css'
import useInscricaoForm from './useInscricaoForm';


const InscricaoForm = ({ open, handleClose, curso }) => {
    const { handleSubmit, register, setValue, control,  errors, watchTemAlergia
        ,openAlert,onSubmit,showSuccessMessage, errorMessage, } 
    = useInscricaoForm(handleClose,curso);

    return (
        <div className={open ? "modal fade show" : "modal fade"} style={{ display: open ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Inscrição para {curso ? curso.cur_titulo : 'Curso Indisponível'}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                {/* nome completo */}
                                <div className="col-md-6">
                                    <label htmlFor="nome" className="form-label">
                                        <span className='titulo'>Nome Completo:</span>
                                        <span className='vermelho'>*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className={`form-control ${errors.nome ? 'is-invalid' : ''}`} 
                                        {...register("nome")}
                                        placeholder="Insira seu nome"
                                        onChange={(e) => setValue('nome', e.target.value, { shouldValidate: true })}
                                    />
                                    {errors.nome && <span className="text-danger">{errors.nome.message}</span>}
                                </div>
                                {/* data de nascimento */}
                                <div className="col-md-6">
                                    <Controller
                                        name="dataNascimento"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="mb-3">
                                                <label htmlFor="dataNascimento" className="form-label">  
                                                    <span className='titulo'>Data de Nascimento:</span>
                                                    <span className='vermelho'>*</span>
                                                </label>
                                                <input {...field} type="date" className="form-control" />
                                                {errors.dataNascimento && <span className="text-danger">{errors.dataNascimento.message}</span>}
                                            </div>
                                        )}
                                    />
                                </div>
                                {/* telefone */}
                                <div className="col-md-6">   
                                    <label htmlFor="telefone" className="form-label">                                        
                                        <span className='titulo'>Nº telefone:</span>
                                        <span className='vermelho'>*</span>
                                    </label>                             
                                    <Controller
                                        name="telefone"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <InputMask
                                                mask="(99) 99999-9999"
                                                maskPlaceholder=""
                                                className={`form-control ${errors.telefone ? 'is-invalid' : ''}`}
                                                {...field}
                                                placeholder='Insira seu telefone'
                                            />
                                        )}
                                    />
                                    {errors.telefone && <span className="text-danger">{errors.telefone.message}</span>}
                                </div>

                                {/* tipo de pagamento */}
                                <div className="col-md-6">
                                    <label htmlFor="tipoPagamento" className="form-label">                                        
                                        <span className='titulo'>Tipo de Pagamento:</span>
                                        <span className='vermelho'>*</span>
                                    </label>
                                        <select 
                                            className={`form-control ${errors.tipoPagamento ? 'is-invalid' : ''}`} 
                                            {...register("tipoPagamento")}
                                            placeholder="Insira tipo de pagamento"
                                            onChange={(e) => setValue('tipoPagamento', e.target.value, { shouldValidate: true })}
                                        >
                                            <option value="">Escolha uma opção</option>
                                            <option value="PIX">Pix</option>
                                            <option value="DINHEIRO">Dinheiro</option>
                                            <option value="DEBITO">Debito</option>
                                            <option value="CREDITO">Credito</option>
                                        </select>
                                    {errors.tipoPagamento && <span className="text-danger">{errors.tipoPagamento.message}</span>}
                                </div>
                                {/* modadelidade do curso*/}
                                <div className="col-md-6">
                                    <label htmlFor="modalidadeCurso" className="form-label">
                                        <span className='titulo'>Modalidade do Curso:</span>
                                        <span className='vermelho'>*</span>
                                    </label>
                                        <select 
                                            className={`form-control ${errors.modalidadeCurso ? 'is-invalid' : ''}`} 
                                            {...register("modalidadeCurso")}
                                            placeholder="Escolha a modalidade do Curso"
                                            onChange={(e) => setValue('modalidadeCurso', e.target.value, { shouldValidate: true })}
                                        >
                                            <option value="">Escolha uma opção</option>
                                            <option value="ONLINE">On Line</option>
                                            <option value="PRESENCIAL">Presencial</option>
                                        </select>
                                    {errors.modalidadeCurso && <span className="text-danger">{errors.modalidadeCurso.message}</span>}
                                </div>
                                
                                {/* tipo de pele */}
                                <div className="col-md-6">
                                    <label htmlFor="tipoPele" className="form-label">                                        
                                        <span className='titulo'>Tipo de Pele:</span>
                                        <span className='vermelho'>*</span>
                                    </label>
                                        <select 
                                            className={`form-control ${errors.tipoPele ? 'is-invalid' : ''}`} 
                                            {...register("tipoPele")}
                                            placeholder="Insira seu tipoPele"
                                            onChange={(e) => setValue('tipoPele', e.target.value, { shouldValidate: true })}
                                        >
                                            <option value="">Escolha uma opção</option>
                                            <option value="SECA">Seca</option>
                                            <option value="MISTA">Mista</option>
                                            <option value="OLEOSA">Oleosa</option>
                                            <option value="NAO_SEI">Não sei</option>
                                        </select>
                                    {errors.tipoPele && <span className="text-danger">{errors.tipoPele.message}</span>}
                                </div>

                                {/*tem Alergias*/}
                                <div className="col-md-6">
                                    <label htmlFor="temAlergia" className="form-label">                                        
                                        <span className='titulo'>Tem Alergia?</span>
                                        <span className='vermelho'>*</span>
                                    </label>
                                        <select 
                                            className={`form-control ${errors.temAlergia ? 'is-invalid' : ''}`} 
                                            {...register("temAlergia")}
                                            placeholder="Escolha uma opção..."
                                            onChange={(e) => setValue('temAlergia', e.target.value, { shouldValidate: true })}
                                        >
                                            <option value="">Escolha uma opção</option>
                                            <option value="sim">Sim</option>
                                            <option value="nao">Não</option>
                                        </select>
                                    {errors.temAlergia && <span className="text-danger">{errors.temAlergia.message}</span>}
                                </div>
                                {/* quais alergias*/}
                                {watchTemAlergia === "sim" && (
                                    <div className="col-md-6">
                                        <label htmlFor="alergia" className="form-label">                                            
                                            <span className='titulo'>Quais Alergias?</span>
                                            <span className='vermelho'>*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            className={`form-control ${errors.alergia ? 'is-invalid' : ''}`} 
                                            {...register("alergia")}
                                            placeholder="Informe quais tipos de alergia você tem."
                                            onChange={(e) => setValue('alergia', e.target.value, { shouldValidate: true })}
                                            required={watchTemAlergia === "sim"}
                                        />
                                        {errors.alergia && <span className="text-danger">{errors.alergia.message}</span>}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3"> {/* Espaço de margem na parte inferior */}
                                <button type="submit" className="btn btn-secondary me-2">Confirmar</button>
                                <button type="button" className="btn btn-danger" onClick={handleClose}>Cancelar</button>
                            </div>
                        </form>
                        {openAlert && showSuccessMessage && (
                            <div className="alert alert-success mt-3" role="alert">
                                Sua inscrição no curso foi feita com sucesso
                            </div>
                        )}
                        {errorMessage && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {errorMessage}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default InscricaoForm;
