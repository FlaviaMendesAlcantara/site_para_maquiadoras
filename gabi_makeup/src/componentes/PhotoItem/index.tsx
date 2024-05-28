import React from 'react';
import * as C from './styles.ts';

type Props = {
    url: string;
    name: string;
    onDelete: (name: string) => void;
    isAdmin: boolean;
    isLoggedIn: boolean;
}

export const PhotoItem = ({ url, name, onDelete , isAdmin, isLoggedIn} : Props) => {
    const handleDelete = () => {
        onDelete(name); 
    };

    return (
        <C.Container>
            <img src={url} alt={name} />
            <div>{name}</div>
            {isLoggedIn && isAdmin && <C.DeleteButton onClick={handleDelete}>Excluir</C.DeleteButton>}
        </C.Container>
    );
}