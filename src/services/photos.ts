
import { Photo } from '../types/Photo';
import { storage } from '../libs/firebase.ts';
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject} from 'firebase/storage';
// import { getDatabase, ref as dbRef, set } from 'firebase/database';
// import { v4 as createId} from 'uuid';

export const getAll = async () => {
    let list: Photo[] = [];
    
    const imagesPasta = ref(storage,"imagensGaleria");
    const photoList = await listAll(imagesPasta);

    for(let i in photoList.items){
        let photoUrl = await getDownloadURL(photoList.items[i]);
        
        list.push({
            name: photoList.items[i].name,
            url: photoUrl,
        })
    }

    return list;
}

export const insert = async (file: File, fileName:string) => {
    if(['image/jpeg', 'image/jpg',  'image/png'].includes(file.type)) {
        let newFileName = fileName;

        // Verificar se o nome já está em uso
        const imagesPasta = ref(storage,"imagensGaleria");
        const photoList = await listAll(imagesPasta);
        
        const existingNames = photoList.items.map(item => item.name.split('.')[0]); // Extrair nomes das fotos existentes

        // Verificar se o nome já está em uso
        if (existingNames.includes(newFileName)) {
            throw new Error('Esse nome já está em uso. Por favor, escolha outro nome.');
        }

        let newFile = ref(storage,`imagensGaleria/${newFileName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref);

        return { name: newFileName, url: photoUrl } as Photo;
    } else {
        return new Error('Tipo de arquivo não permitido.');
    }
}

// Função para excluir uma foto
export const deletePhoto = async (photoName: string) => {
    try {
        await deleteObject(ref(storage, `imagensGaleria/${photoName}`));
    } catch (error) {
        throw new Error(`Erro ao excluir a foto: ${error.message}`);
    }
};
