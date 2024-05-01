import React, { useState } from 'react';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { GoogleLogin } from '@react-oauth/google';
import ModalCadastrese from './ModalCadastrese';
// import FacebookLogin from 'react-facebook-login';
// import { blue } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffcccc',
    },
    secondary: {
      main: '#757171',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(#fff,#75717185)',
    
  },
  box: {
    padding: theme.spacing(3),
    boxShadow: '0px 0px 10px 2px rgba(0,0,0,0.2)',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundImage: 'linear-gradient( 30deg, #fff , #ffcccc )', 
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '250px',
    },
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: theme.spacing(2),
  },
  googleButton: {
    marginTop: theme.spacing(2),
  },
  // ffacebookButton: {
  //   marginTop: theme.spacing(2),
  //   '& .facebook-login-button': {
  //     width: '100%', // Defina a largura desejada
  //     padding: theme.spacing(1),
  //     color:blue
  //     // Adicione outros estilos conforme necessário
  //   },
  // },
}));

function Login() {
  const [cadastreseOpen, setCadastreseOpen] = useState(false);

  const handleSignup = () => {
    setCadastreseOpen(true);
  };

  const handleCloseSignup = () => {
    setCadastreseOpen(false);
  };

  const classes = useStyles();
  const responseMessage = (response) => {
    console.log(response);
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  // const responseFacebook = (response) => {
  //   // Aqui você pode lidar com a resposta do login com o Facebook
  //   console.log(response);
  // };

  return (
    <ThemeProvider theme={theme}>
      <Box className={classes.root}>
        <Box className={classes.box}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField id="standard-basic" label="Usuário" />
            <TextField id="standard-basic" label="Senha" type="password" />
            <Box className={classes.buttonGroup}>
              <Button variant="contained" color="primary">
                Entrar
              </Button>
              <Button variant="contained" color="secondary">
                Cancelar
              </Button>
            </Box>
            
            <Box className={classes.googleButton}>
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
            </Box>

            <Box>
              <Button variant="contained" color="primary" onClick={handleSignup}>
                Cadastre-se
              </Button>
            </Box>

            {/* <Box className={classes.facebookButton}>
              <FacebookLogin
                appId="Seu-ID-do-Facebook"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                cssClass="facebook-login-button"
              />
            </Box>  */}
          </form>
        </Box>
      </Box>
      <ModalCadastrese open={cadastreseOpen} onClose={handleCloseSignup} />
    </ThemeProvider>
  );
}

export default Login;