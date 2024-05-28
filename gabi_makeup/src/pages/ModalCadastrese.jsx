import useModalCadastrese from "./useModalCadastrese";

const ModalCadastrese = ({ open, onClose }) => {
    const { handleSubmit, register, errors,        
        onSubmit, openAlert, showSuccessMessage, errorMessage } = useModalCadastrese();

    const handleFormSubmit = async (formData) => {        
        await onSubmit(formData);
    };

    return (
        <div className={open ? "modal fade show" : "modal fade"} style={{ display: open ? 'block' : 'none' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cadastro de Usuário</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="nomeCompleto" className="form-label">
                                        <span className='titulo'>Nome Completo:</span>
                                        <span className='vermelho'>*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className={`form-control ${errors.nomeCompleto ? 'is-invalid' : ''}`} 
                                        {...register("nomeCompleto")}
                                        placeholder="Digite o nome completo"
                                    />
                                </div>
                                {errors.nomeCompleto && <span className="text-danger">{errors.nomeCompleto.message}</span>}
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="usuario" className="form-label">
                                        <span className='titulo'>Usuário</span>
                                        <span className='vermelho'>*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        className={`form-control ${errors.usuario ? 'is-invalid' : ''}`} 
                                        {...register("usuario")}
                                        placeholder="Escolha um nome de usuário"
                                    />
                                </div>
                                {errors.usuario && <span className="text-danger">{errors.usuario.message}</span>}
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <label htmlFor="senha" className="form-label">
                                        <span className='titulo'>Senha</span>
                                        <span className='vermelho'>*</span>
                                    </label>
                                    <input 
                                        type="password" 
                                        className={`form-control ${errors.senha ? 'is-invalid' : ''}`} 
                                        {...register("senha")}
                                        placeholder="Escolha uma senha"
                                    />
                                </div>
                                {errors.senha && <span className="text-danger">{errors.senha.message}</span>}
                            </div>
                            <div className="mt-3"> 
                                <button type="submit" className="btn btn-secondary me-2">Criar usuário</button>
                                <button type="button" className="btn btn-danger" onClick={onClose}>Desistir</button>
                            </div>                                                           
                        </form>
                        {openAlert && showSuccessMessage && (
                            <div className="alert alert-success mt-3" role="alert">
                                Usuário criado com sucesso!
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
    )

};

export default ModalCadastrese;
