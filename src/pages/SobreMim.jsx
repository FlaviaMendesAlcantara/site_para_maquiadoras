import React from "react";
import "../sobreMim.css";

/**
 * Componente funcional que representa a página de sobre mim.
 * @return {JSX.Element} O componente JSX da página de sobre mim.
 */
function SobreMim() {
  return (
    <div className="SobreMim">
      <h1 className="centered-text welcomeText">Gabi - Maquiadora Profissional</h1>
      <p>
        Olá! Sou a Gabi, uma maquiadora profissional e instrutora especializada em automaquiagem e design de sobrancelhas.
        Minha paixão é realçar a beleza única de cada pessoa.
      </p>
      <p>
        Com uma sólida experiência em maquiagem para diversos eventos sociais, produções de moda e ensaios fotográficos,
        estou comprometida em oferecer um serviço personalizado que atenda às necessidades específicas de cada cliente.
      </p>
      <p>
        Além de serviços de maquiagem profissional, também ofereço cursos de automaquiagem para aqueles que desejam aprimorar
        suas habilidades de beleza. Seja bem-vindo(a) à minha página e fique à vontade para explorar meu portfólio e os
        cursos disponíveis.
      </p>
      {/* Adicione mais informações conforme necessário */}
    </div>
  );
}

export default SobreMim;
