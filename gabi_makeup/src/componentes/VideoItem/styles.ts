// styles.ts
import styled from 'styled-components';

export const Container = styled.div`
    margin:auto;
    max-width:980px;
    padding:30px 0;
`;

export const Header = styled.h1`
    margin: 0;
    padding: 0;
    text-align:center;
    margin-bottom:30px;
`;

export const ScreenWarnings = styled.div`
    text-align:center;
    .emoji {
        font-size: 50px;
        margin-bottom: 20px;
    }
`;

export const UploadForm = styled.form`
    background-color: #DCDCDC;
    padding: 15px;
    border-radius: 10px;

    input[type=submit] {
        background-color: #808080;
        border:0;
        color: #FFF;
        padding: 8px 16px;
        font-size: 15px;
        border-radius: 10px;
        margin: 0 20px;
        cursor: pointer;

        &:hover {
            opacity: .9;
        }
    }
`;

export const VideoWrapper = styled.div`
    width: 100%;
    max-width: 800px; /* Defina a largura máxima do vídeo */
    margin: auto;
    margin-bottom:10px;
`;

export const Video = styled.video`
    width: 100%;
    height: auto; /* O vídeo irá manter a proporção */
    display: block;
    max-height: 400px;
`;

export const VideoTitle = styled.h2`
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
    z-index: -2;
`;

export const VideoDescription = styled.textarea`
    width: 100%;
    max-width: 100%; // Garante que o textarea ocupe todo o espaço disponível
    resize: none; // Impede que o usuário redimensione o textarea
    padding: 8px; // Adiciona um preenchimento interno
    border: 0.5px solid #ccc; // Adiciona uma borda para melhorar a aparência
    border-radius: 5px; // Adiciona uma borda arredondada
    box-sizing: border-box; // Garante que o tamanho do textarea inclua preenchimento e borda
    font-size: 14px; // Define o tamanho da fonte
    margin-bottom: 10px; // Adiciona espaço entre o textarea e outros elementos
`;


export const DeleteButton = styled.button`
    background-color: #FF0000;
    border: 0;
    color: #FFF;
    padding: 8px 16px;
    font-size: 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: opacity 0.3s;
    margin-top: 20px; /* Adicione margem acima do botão */
    display: block; /* Transforma o botão em um elemento de bloco */
    width: fit-content; /* Define a largura do botão com base em seu conteúdo */
    margin-left: auto; /* Centraliza o botão horizontalmente */
    margin-right: auto; /* Centraliza o botão horizontalmente */
`;
