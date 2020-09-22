import React, { Fragment } from 'react';

// MUI imports
import { Link } from 'react-router-dom';
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TooltipBtn from '../util/TooltipBtn';

// Redux imports
import { useSelector } from 'react-redux' ;

const Navbar = () => {
    const { user: {authenticated} } = useSelector(state => state);

    return (
            <Appbar>
                <Toolbar className="navbar-container">
                    {authenticated ? (
                        <Fragment>
                            <TooltipBtn tipText="Post a scream">
                                <AddIcon style={{color: 'white'}} />
                            </TooltipBtn>
                            <Link to="/">
                                <TooltipBtn tipText="Home">
                                    <HomeIcon style={{color: 'white'}} />
                                </TooltipBtn>
                            </Link>
                            <TooltipBtn tipText="Notifications">
                                <NotificationsIcon style={{color: 'white'}} />
                            </TooltipBtn>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Link to="/">
                                <TooltipBtn tipText="Home">
                                    <HomeIcon style={{color: 'white'}} />
                                </TooltipBtn>
                            </Link>
                            <Link to="/login">
                                <TooltipBtn tipText="Login">
                                    <PersonIcon style={{color: 'white'}} />
                                </TooltipBtn>
                            </Link>
                            <Link to="/signup">
                                <TooltipBtn tipText="Signup">
                                    <PersonAddIcon style={{color: 'white'}} />
                                </TooltipBtn>
                            </Link>                            
                        </Fragment>
                    )}
                </Toolbar>
            </Appbar>
    )
}

export default Navbar;
