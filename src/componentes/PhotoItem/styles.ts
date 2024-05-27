// galeria.styles.ts
import styled from "styled-components";

export const Container = styled.div`
    background-color: #DCDCDC;
    border-radius: 10px;
    padding: 5px;
    position: relative; /* Adiciona posição relativa ao contêiner */

    img {
        max-width: 100%;
        display: block;
        margin-bottom: 10px;
        border-radius: 10px;
    }
`;

export const DeleteButton = styled.button`
    background-color: #FF0000; /* Vermelho */
    border: 0;
    color: #FFF;
    padding: 8px 16px;
    font-size: 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: opacity 0.3s;

    position: absolute; /* Define a posição absoluta */
    bottom: 0; /* Alinha o botão na parte inferior */
    left: 50%; /* Alinha o botão no centro horizontal */
    transform: translateX(-50%); /* Centraliza horizontalmente */

    &:hover {
        opacity: 0.9;
    }
`;
