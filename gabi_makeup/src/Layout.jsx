import React from 'react';
import Footer from '../src/componentes/Rodape';
import Menu from '../src/componentes/Menu';

const layoutStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
};

const contentStyle = {
  flex: '1',
  marginBottom: '60px', 
};

function Layout({ children }) {
  return (
    <div style={layoutStyle}>
      <Menu />
        <div style={contentStyle}>
          {children}
        </div>
      <Footer />
    </div>
  );
}

export default Layout;
