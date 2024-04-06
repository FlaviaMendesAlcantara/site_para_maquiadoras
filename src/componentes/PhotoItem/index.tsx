import React from 'react';
import * as C from './styles.ts';

type Props = {
    url: string;
    name: string;
    onDelete: (name: string) => void;
}

export const PhotoItem = ({ url, name, onDelete } : Props) => {
    const handleDelete = () => {
        onDelete(name); 
    };

    return (
        <C.Container>
            <img src={url} alt={name} />
            <div>{name}</div>
            <C.DeleteButton onClick={handleDelete}>Excluir</C.DeleteButton> {/* Botão de exclusão */}
        </C.Container>
    );
}