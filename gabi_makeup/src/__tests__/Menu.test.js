import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from '../componentes/Menu';


test('Menu renderizado sem erros', () => {
  render(
    <Router>
      <Menu />
    </Router>
  );
});
