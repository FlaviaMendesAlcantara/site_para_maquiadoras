import {render, screen} from '@testing-library/react';
// import App from './App';
/**
 * Componente funcional que representa a página de rodape.
 * @return {JSX.Element} O componente JSX da página de rodape.
 */
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Gabi Makeup/i);
  expect(linkElement).toBeInTheDocument();
});
