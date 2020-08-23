import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles/';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Bind the plugin to the dayJS lib
dayjs.extend(relativeTime);

// JSS styling to match Material-UI's official doc
const styles = {
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 20,
        objectFit: 'cover'
    }
};

// The actual component
const Scream = (props) => {
    const { classes, data } = props;
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.image}
            image={data.userImage}
            title="Profile picture" />
            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${data.username}`} color="primary">{data.username}</Typography>
                <Typography variant="body2" color="textSecondary">{dayjs(data.createdAt).fromNow()}</Typography>
                <Typography variant="body1">{data.text}</Typography>
            </CardContent>
        </Card>
    )
}

// TO DO : CREATE A SCREAM WITH FIREBASE SO THAT THE DATE IS ISO FORMATTED, TO THEN CHECK IF DAYJS CAN PARSE IT

export default withStyles(styles)(Scream);