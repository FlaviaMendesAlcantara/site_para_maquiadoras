// import React from 'react';
// import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// import Menu from './componentes/Menu';
// import Footer from './componentes/Rodape';
import HomePage from './pages/HomePage';
import SobreMim from './pages/SobreMim';
import Galeria from './pages/Galeria';
import Cursos from './pages/Cursos';
import Tutoriais from './pages/Tutoriais';
import Login from './pages/Login';

const Routes = () => {
  return (
    <Router>
      <div>
        <Menu />
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route path="/sobre" component={SobreMim}/>
          <Route path="/galeria" component={Galeria}/>
          <Route path="/cursos" component={Cursos}/>
          <Route path="/tutoriais" component={Tutoriais} />
          <Route path="/login" component={Login} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default Routes;
