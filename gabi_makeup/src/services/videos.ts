
import { Video } from '../types/Video';
import { storage } from '../libs/firebase.ts';
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject, getMetadata} from 'firebase/storage';

export const getAll = async () => {
    let list: Video[] = [];
    
    const videoPasta = ref(storage,"videosTutorial");
    const videoList = await listAll(videoPasta);

    for(let i in videoList.items){
        let videoUrl = await getDownloadURL(videoList.items[i]);
        let metadata = await getMetadata(videoList.items[i]);
        let description = metadata.customMetadata?.description || '';
        
        list.push({
            name: videoList.items[i].name,
            url: videoUrl,
            description: description,
        })
    }

    return list;
}

export const insert = async (file: File, fileName: string, description: string) => {
    if(['video/mkv','video/m4a','video/mp4', 'video/mov', 'video/avi'].includes(file.type)) {
        let newFileName = fileName;

        // Verificar se o nome já está em uso
        const videoPasta = ref(storage,"videosTutorial");
        const videoList = await listAll(videoPasta);
        
        const existingNames = videoList.items.map(item => item.name.split('.')[0]); // Extrair nomes dos videos existentes

       // Verificar se o nome já está em uso
        if (existingNames.includes(newFileName)) {
            throw new Error('Esse nome já está em uso. Por favor, escolha outro nome.');
        }

        let newFile = ref(storage,`videosTutorial/${newFileName}`);

        const metadata = {
            customMetadata: {
                description: description
            }
        };

        let upload = await uploadBytes(
            newFile, 
            file
            ,metadata
        );
        let videoUrl = await getDownloadURL(upload.ref);

        return { name: newFileName, 
            url: videoUrl
            , description: description 
        } as Video;
    } else {
        return new Error('Tipo de arquivo não permitido.');
    }
}

// Função para excluir uma video
export const deleteVideo = async (videoName: string) => {
    try {
        await deleteObject(ref(storage, `videosTutorial/${videoName}`));
    } catch (error) {
        throw new Error(`Erro ao excluir o vídeo: ${error.message}`);
    }
};
