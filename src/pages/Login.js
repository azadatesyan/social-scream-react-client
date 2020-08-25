import React from 'react';
import { withStyles } from '@material-ui/core/styles/';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import AppIcon from '../util/monkey.svg';
import { useState } from 'react';

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
        margin: '25px auto'
    }
};

const Login = (props) => {
    // Importing classes for MUI withStyles styling
    const { classes } = props;

    // Controlled form components
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            const userToken = await res.json();
        } catch (err) {
            console.log(err);
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
                    className={classes.textField}
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>

                    <TextField
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    className={classes.textField}
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>

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

export default withStyles(styles)(Login);