// General stuff
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import JwtDecode from 'jwt-decode';
import './App.css';

// Redux stuff
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { logoutUser } from './redux/actions/userActions';
import { getUserData } from "./redux/actions/userActions";

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
import AuthRoute from './components/AuthRoute';

// Material-UI withStyles init
const theme = createMuiTheme(themeObject);

// Redux init
const dispatch = store.dispatch;

// Get localStorage to retrieve previous authentications
const token = localStorage.getItem('FBIdToken');
if (token) {
  console.log('User has a login token!');
  const decodedToken = JwtDecode(token);
  const expirationDate = decodedToken.exp * 1000;
  if (expirationDate < Date.now()){
    dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    dispatch(getUserData());
  }
}

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login}/>
              <AuthRoute exact path="/signup" component={Signup}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
