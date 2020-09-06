// General stuff
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import JwtDecode from 'jwt-decode';
import './App.css';

// Material-UI stuff
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from './util/theme.js';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Components
import Navbar from './components/Navbar';

// Material-UI withStyles init
const theme = createMuiTheme(themeObject);

// Get localStorage to retrieve previous authentications
const token = localStorage.getItem('FBIdToken');
let authenticated = false;

if (token) {
  console.log('There is a token!');
  console.log(token);
  const decodedToken = JwtDecode(token);
  const expirationDate = decodedToken.exp * 1000;
  if (expirationDate < Date.now()){
    window.location.href = '/login';
  } else {
    authenticated = true;
  }
}

const App = () => {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login">
                {authenticated ? <Redirect to="/" /> : <Login/>}
              </Route>
              <Route exact path="/signup">
                {authenticated ? <Redirect to="/" /> : <Signup/>}
              </Route>
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
