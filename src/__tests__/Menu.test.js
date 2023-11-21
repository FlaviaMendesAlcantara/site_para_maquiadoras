import {render} from '@testing-library/react';
// import {BrowserRouter as Router} from 'react-router-dom'; // or use HashRouter, MemoryRouter, etc.
// import Menu from '../componentes/Menu';

test('Menu renderizado com erros', () => {
  render(
      <Router>
        <Menu />
      </Router>
  );
});
