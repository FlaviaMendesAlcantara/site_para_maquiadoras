import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Menu from './componentes/Menu';
import Footer from './componentes/Rodape';
import Login from './componentes/Login';

const Routes = () => {
  return (
    <Router>
      <div>
        <Menu />
        <Switch>
          <Route path="/login" component={Login} />
          {/* Outras rotas aqui */}
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default Routes;
