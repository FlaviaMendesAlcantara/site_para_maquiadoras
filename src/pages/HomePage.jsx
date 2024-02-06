import React from 'react';
import { Carousel } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import noiva from '../img/noiva.jpg';
import noiva3 from '../img/noiva.jpeg';
import noiva2 from '../img/noiva2.jpeg';
import noivaNegra from '../img/noivaNegra.jpg';
import idosa from '../img/idosa.jpg';
import formatura from '../img/formatura.jpg';
import debutante from '../img/debutante.jpg';
import debutante2 from '../img/debutante2.jpg';
import debutante3 from '../img/debutante3.jpg';
/**
 * Componente funcional que representa a página de inicial.
 * @return {JSX.Element} O componente JSX da página de inicial.
 */
const HomePage = () => {
  const carouselItems = [
    { id: 1, image: noiva, caption: 'Noiva', width: 100, height: 100 },
    { id: 2, image: noiva2, caption: 'Noiva', width: 100, height: 100 },
    { id: 3, image: noivaNegra, caption: 'Pele negra', width: 100, height: 100 },
    { id: 4, image: noiva3, caption: 'Noiva', width: 100, height: 100 },
    { id: 5, image: idosa, caption: 'Pele Madura', width: 100, height: 100 },
    { id: 6, image: formatura, caption: 'Formatura', width: 100, height: 100 },
    { id: 7, image: debutante, caption: 'Debutante', width: 100, height: 100 },
    { id: 8, image: debutante2, caption: 'Debutante', width: 100, height: 100 },
    { id: 9, image: debutante3, caption: 'Debutante', width: 100, height: 100 },
    // Adicione mais imagens conforme necessário
  ];
  

  const topComments = [
    { id: 1, author: 'Maria Beatriz', comment: 'Obrigada eu amei, ficou maravilhosa.', stars: 5 },
    { id: 2, author: 'Joana Mendes', comment: 'Simplesmente amei, ficou tudo perfeito. Do atendimento ao resultado.', stars: 4 },
    { id: 2, author: 'Flavia Alcantara', comment: 'Tirando a Maquiagem as duas da manhã.Gabi Maquiagem muito linda. Muito obrigada por tudo!', stars: 5 },
    // Adicione mais comentários conforme necessário
  ];

  return (
    <div className="centered-text">
      <h1 className="centered-text welcomeText">Bem-vindo !!!</h1>

      <Carousel>
        {carouselItems.map(item => (
          <Carousel.Item key={item.id}>
            <img className="d-block w-100" src={item.image} alt={item.caption}  />
            <Carousel.Caption>
              <p>{item.caption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <h2  className="centered-text welcomeText">Comentários</h2>
      <div>
      <ul>
        {topComments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.author}</strong>
            <p>{comment.comment}</p>
            <div>
              {[...Array(comment.stars)].map((_, index) => (
                <FaStar key={index} color="gold" />
              ))}
            </div>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default HomePage;