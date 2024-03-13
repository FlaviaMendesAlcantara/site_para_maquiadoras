// Galeria.js
import React, { FormEvent, useEffect, useState } from 'react';
// import {storage} from '../libs/firebase.ts';
import * as C from './galeria.styles.ts';
import * as Photos from '../services/photos.ts'; 
import { Photo } from '../types/Photo.ts';
import { PhotoItem } from '../componentes/PhotoItem/index.tsx';

function Galeria() {

    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState<Photo[]>([]);

    useEffect(() => {
        const getPhotos = async() => {
            setLoading(true);
            setPhotos(await Photos.getAll())  ;
            setLoading(false);
        }
        getPhotos();
    }, []);

    const handleFormSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const file =  formData.get('image') as File;

        if (file && file.size > 0){
            setUploading(true);
            //faz o envio do arquivo
            setUploading(false);
        }
    };

    return (
        <C.Container>
            <C.Area>
                <C.Header>Galeria de Fotos</C.Header>

                    {/* Area de upload  */}

                    <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
                        <input type='file' name='image' />
                        <input type='submit' name='Enviar' />
                    </C.UploadForm>

                    {loading &&
                        <C.ScreenWarnings>
                            <div className="emoji">🤚</div>
                            <div>Carregando...</div>
                        </C.ScreenWarnings>
                    }

                    {!loading && photos && photos.length>0 &&
                        <C.PhotoList>
                            {photos.map((item, index)=>(
                                <PhotoItem key={index} url={item.url} name={item.name} />
                            ))}
                        </C.PhotoList>
                    }

                    {!loading && photos.length === 0 &&
                        <C.ScreenWarnings>
                            <div className="emoji">😞</div>
                            <div>Não há fotos cadastradas.</div>
                        </C.ScreenWarnings>
                    }
            </C.Area>
        </C.Container>
    );
    
}

export default Galeria;
