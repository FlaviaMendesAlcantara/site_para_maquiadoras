import styled from 'styled-components';

export const Container = styled.div`
    background-color: #2728F; 
    color: #333;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Area = styled.div`
    width: 100%;
    max-width: 800px;
    padding: 30px;
`;

export const Header = styled.h1`
    text-align: center;
    margin-bottom: 30px;
`;

export const ScreenWarnings = styled.div`
    text-align:center;

    .emoji {
        font-size: 50px;
        margin-bottom: 20px;
    }
`;

export const PhotoList = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    color: #4F4F4F;
`;
export const UploadForm = styled.form`
    background-color: #DCDCDC;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px; // Adiciona espaço entre o formulário de upload e outros elementos
`;

export const UploadInput = styled.input`
    margin-bottom: 10px; // Adiciona espaço entre o campo de entrada e outros elementos
    width: 100%; // Garante que o campo de entrada ocupe toda a largura disponível
    padding: 8px; // Adiciona preenchimento interno ao campo de entrada
    border: 0.5px solid #ccc; // Adiciona uma borda para melhorar a aparência
    border-radius: 5px; // Adiciona uma borda arredondada
    box-sizing: border-box; // Garante que o tamanho do campo de entrada inclua preenchimento e borda
    font-size: 14px; // Define o tamanho da fonte do campo de entrada
`;

export const UploadDescription = styled.textarea`
    margin-bottom: 10px; // Adiciona espaço abaixo do textarea
`;

export const UploadButton = styled.button`
    background-color: #808080;
    border:0;
    color: #FFF;
    padding: 8px 16px;
    font-size: 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: opacity 0.3s;
    margin-bottom: 10px; // Adiciona espaço abaixo do botão de envio
`;

export const UploadTitle = styled.input`
    width: 100%;
    max-width: 100%; // Garante que o input ocupe todo o espaço disponível
    padding: 8px; // Adiciona um preenchimento interno
    border: 0.5px solid #ccc; // Adiciona uma borda para melhorar a aparência
    border-radius: 5px; // Adiciona uma borda arredondada
    box-sizing: border-box; // Garante que o tamanho do input inclua preenchimento e borda
    font-size: 14px; // Define o tamanho da fonte
    margin-bottom: 10px; // Adiciona espaço entre o input e outros elementos
`;
