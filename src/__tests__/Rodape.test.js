// import React from 'react';
import {render} from '@testing-library/react';
// import {BrowserRouter as Router} from 'react-router-dom'; // or use HashRouter, MemoryRouter, etc.
// import Rodape from '../componentes/Rodape';

test('Rodape renderizado com erros', () => {
  render(
      <Router>
        <Rodape />
      </Router>
  );
});
