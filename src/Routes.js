import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import HomePage from './pages/HomePage';
import SobreMim from './pages/SobreMim';
import Galeria from './pages/Galeria.tsx';
import Cursos from './pages/Cursos';
import Tutoriais from './pages/Tutorial.tsx';
import Login from './pages/Login';
import Layout from './Layout.jsx';
import PainelAdminstracao from './pages/PainelAdministracao.jsx';

const Routes = () => {
  return (
    <Router>
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route path="/home" component={HomePage}/>            
            <Route path="/sobre" component={SobreMim}/>
            <Route path="/galeria" component={Galeria}/>
            <Route path="/cursos" component={Cursos}/>
            <Route path="/tutoriais" component={Tutoriais} />
            <Route path="/login" component={Login} />
            <Route path="/painel" component={PainelAdminstracao} />
          </Switch>
        </Layout>
      </div>
    </Router>
  );
};

export default Routes;
