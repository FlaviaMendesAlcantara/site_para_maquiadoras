import React from 'react';
import { Carousel } from 'react-bootstrap';
import MaquiagemDia from '../img/MaquiagemDia.jpg';
import maquiagemFesta from '../img/maquiagemFesta.jpg';
import Gabriela from '../img/Gabriela.jpg';
import maquiagemLeve from '../img/maquiagemLeve.jpg';
import olhoEsfumado from '../img/olhoEsfumado.jpg';
import MaquiagemMadura from '../img/MaquiagemMadura.jpg';
import MaquiagemMadrinha from '../img/MaquiagemMadrinha.jpg';
// import debutante2 from '../img/debutante2.jpg';
// import debutante3 from '../img/debutante3.jpg';
import '../../src/homePage.css';
/**
 * Componente funcional que representa a página de inicial.
 * @return {JSX.Element} O componente JSX da página de inicial.
 */
const HomePage = () => {
  const carouselItems = [
    { id: 1, image: MaquiagemDia, caption: 'Maquiagem Dia' },
    { id: 2, image: maquiagemFesta, caption: 'maquiagem Festa' },
    { id: 3, image: Gabriela, caption: 'Gabriela Maquiadora' },
    { id: 4, image: maquiagemLeve, caption: 'maquiagem leve' },
    { id: 5, image: olhoEsfumado, caption: 'olho esfumado' },
    { id: 6, image: MaquiagemMadura, caption: 'Maquiagem madura' },
    { id: 7, image: MaquiagemMadrinha, caption: 'Maquiagem Madrinha' },
    // { id: 8, image: debutante2, caption: 'Debutante', width: 100, height: 100 },
    // { id: 9, image: debutante3, caption: 'Debutante', width: 100, height: 100 },
    // Adicione mais imagens conforme necessário
  ];


  return (
    <div className="centered-text">
      <h1 className="centered-text welcomeText">Bem-vindo !!!</h1>

      <Carousel>
        {carouselItems.map(item => (
          <Carousel.Item key={item.id}>
            <img className="d-block w-100 carousel-img" 
              src={item.image} 
              alt={item.caption}  
            />
            <Carousel.Caption>
              <p>{item.caption}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HomePage;