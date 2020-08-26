// React imports
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI imports
import { withStyles } from '@material-ui/core/styles/';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import AppIcon from '../util/monkey.svg';

// Material-UI styling
const styles = {
    centeredGrid: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    appIcon: {
        maxHeight: '40px',
        width: 'auto',
        margin: '10px auto 0 auto'
    },
    pageTitle: {
        margin: '10px auto',
        fontSize: '2.25rem'
    },
    loginForm: {
        margin: '10px auto'
    },
    textField: {
        margin: '5px auto'
    },
    btn: {
        margin: '10px auto'
    },
    errorMessage: {
        margin: '10px auto'
    }
};

const Login = (props) => {
    // Importing classes for MUI withStyles styling
    const { classes } = props;

    // Importing history from React Router DOM
    const history = useHistory();

    // Controlled form components
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    // Handle form submit
    const handleSubmit = async (event) => {
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
            if(res.ok){
                console.log(responseData);
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

    return (
        <Grid container spacing={0} className={classes.centeredGrid}>
            <Grid item xs={4}>
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

                    {errors.general && 
                        <Typography
                        color="secondary"
                        className={classes.errorMessage}>
                        {errors.general}
                        </Typography>
                    }

                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.btn}>
                        Login
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
};

// TO DO: HANDLE ERROR MESSAGES FOR 'USER NOT FOUND' RESPONSE FROM FIREBASE IN BACK-END FUNCTIONS

export default withStyles(styles)(Login);