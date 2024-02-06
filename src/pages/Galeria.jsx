// Galeria.js

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function Galeria() {
  const [temas, setTemas] = useState([
    { id: 1, nome: "Formatura", fotos: [] },
    { id: 2, nome: "Noiva", fotos: [] },
    { id: 3, nome: "Madrinha", fotos: [] },
    // Adicione mais temas conforme necessário
  ]);

  const adicionarFoto = (temaId, imagemUrl) => {
    const temasAtualizados = temas.map((tema) => {
      if (tema.id === temaId) {
        return {
          ...tema,
          fotos: [...tema.fotos, { id: tema.fotos.length + 1, imagem: imagemUrl }],
        };
      }
      return tema;
    });

    setTemas(temasAtualizados);
  };

  const onDrop = (acceptedFiles) => {
    // Você pode enviar os arquivos para o servidor aqui
    // No exemplo, adicionaremos as fotos ao primeiro tema
    acceptedFiles.forEach((file) => {
      if (file.size > 3000000) {
        alert(`A foto ${file.name} excede o tamanho máximo permitido.`);
        return;
      }
      const imagemUrl = URL.createObjectURL(file);
      adicionarFoto(1, imagemUrl);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <h1>Galeria</h1>
      {temas.map((tema) => (
        <div key={tema.id}>
          <h2>{tema.nome}</h2>
          <div className="galeria-fotos">
            {tema.fotos.map((foto) => (
              <div key={foto.id} className="item-foto">
                <img src={foto.imagem} alt={`${tema.nome} - Foto ${foto.id}`} />
              </div>
            ))}
          </div>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <p>Arraste e solte algumas fotos aqui ou clique para selecionar.</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Galeria;