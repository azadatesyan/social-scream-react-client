import React from 'react';
import { Link } from 'react-router-dom';
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Navbar = () => {
    return (
        <div>
            <Appbar>
                <Toolbar className="navbar-container">
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/signup">Signup</Button>
                </Toolbar>
            </Appbar>
        </div>
    )
}

export default Navbar;
