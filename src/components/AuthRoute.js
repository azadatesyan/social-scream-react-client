import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute =  ({component: Component}, ...props) => {
    const content = useSelector(state => state);
    let authenticated = content.user.authenticated;

    return (
        authenticated ? <Redirect to="/" /> : <Route component={Component} {...props} />
    );
}

export default AuthRoute;