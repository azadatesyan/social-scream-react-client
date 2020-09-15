// React imports
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

// Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

// Material UI imports
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles/';
import AppIcon from '../util/monkey.svg';
import theme from '../util/theme';

// Material-UI styling
const useStyles = makeStyles(theme);

const Signup = (props) => {
    // Importing classes for MUI withStyles styling
    const classes = useStyles();

    // Importing state and dispatch from Redux
    const content = useSelector(state => state);
    const dispatch = useDispatch();
    const { errors, loading } = content.ui;

    // Importing history from React Router DOM
    const history = useHistory();

    // Controlled form components
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    // Handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newUserData = {
            email: email,
            password: password,
            confirmPassword: confirmPassword,
            username: username
        };
        dispatch(signupUser(newUserData, history));
    };

    // Conditionally rendered elements
    const errorMessage = errors.general &&
    <Typography
    color="secondary"
    className={classes.errorMessage}>
    {errors.general}
    </Typography>;
    
    const defaultSignupBtn = 
    <Button
    type="submit"
    variant="contained"
    color="primary"
    className={classes.btn}>
    Signup
    </Button>;

    const loadingSignupButton = 
    <Button
    type="submit"
    variant="contained"
    color="primary"
    className={classes.loadingBtn}>
        <CircularProgress size={20} />
    </Button>;

    return (
        <Grid container spacing={0} className={classes.centeredGrid}>
            <Grid item xs={3}>
                <img src={AppIcon} alt="monkey-icon" className={classes.appIcon}></img>
                <Typography variant="h2" className={classes.pageTitle}>Signup</Typography>
                <form noValidate className={classes.loginForm} onSubmit={handleSubmit}>
                    <TextField
                    fullWidth
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    helperText={errors.email}
                    error={errors.email ? true : false}
                    className={classes.textField}
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>

                    <TextField
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    helperText={errors.password}
                    error={errors.password ? true : false}
                    className={classes.textField}
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>

                    <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    helperText={errors.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    className={classes.textField}
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}/>

                    <TextField
                    fullWidth
                    id="username"
                    name="username"
                    type="text"
                    label="Username"
                    helperText={errors.username}
                    error={errors.username ? true : false}
                    className={classes.textField}
                    value={username}
                    onChange={e => setUsername(e.target.value)}/>                    

                    {errorMessage}
                    {loading ? loadingSignupButton : defaultSignupBtn}
                    <br />
                    <small>Already have an account? &nbsp;
                        <Link
                        to="/login"
                        className={classes.signUpLink}>
                            Log in here
                        </Link>
                    </small>
                </form>
            </Grid>
        </Grid>
    );
};

export default Signup;