import styled from 'styled-components';

export const Container = styled.div`
    background-color: #2728F; 
    color: #333;
    min-height:100vh;
`;

export const Area = styled.div`
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

export const PhotoList = styled.div`
    display: grid;
    grid-template-columns:repeat(4, 1fr);
    gap: 10px;
    color: #4F4F4F;
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

