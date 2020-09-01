// React imports
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

// Material UI imports
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles/';
import AppIcon from '../util/monkey.svg';
import theme from '../util/theme';

// Material-UI styling
const styles = theme;

const Login = (props) => {
    // Importing classes for MUI withStyles styling
    const { classes } = props;

    // Importing history from React Router DOM
    const history = useHistory();

    // Controlled form components
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    // Handle form submit
    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const userCredentials = {
            email: email,
            password: password
        };
        try {
            const res = await fetch('https://europe-west1-socialape-6b91a.cloudfunctions.net/api/login', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userCredentials)
            });
            const responseData = await res.json();
            setLoading(false);
            if(res.ok){
                console.log(responseData);
                localStorage.setItem('FBIdToken', `Bearer ${responseData.token}`);
                history.push('/');
            } else {
                console.log(responseData);
                setErrors(responseData);
            }
        } catch (err) {
            console.log(err.message);
            setErrors(err.message);
        }
    };

    // Conditionally rendered elements
    const errorMessage = errors.general &&
    <Typography
    color="secondary"
    className={classes.errorMessage}>
    {errors.general}
    </Typography>;
    
    const defaultLoginBtn = 
    <Button
    type="submit"
    variant="contained"
    color="primary"
    className={classes.btn}>
    Login
    </Button>;

    const loadingLoginButton = 
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
                <Typography variant="h2" className={classes.pageTitle}>Login</Typography>
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

                    {errorMessage}
                    {loading ? loadingLoginButton : defaultLoginBtn}
                    <br />
                    <small>Don't have an account? &nbsp;
                        <Link
                        to="/signup"
                        className={classes.signUpLink}>
                            Sign up here
                        </Link>
                    </small>
                </form>
            </Grid>
        </Grid>
    );
};

// TO DO: HANDLE ERROR MESSAGES FOR 'USER NOT FOUND' & 'AUTH/TOO-MANY-REQUESTS' RESPONSES FROM FIREBASE

export default withStyles(styles)(Login);