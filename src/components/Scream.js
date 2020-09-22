import React from 'react';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// MUI imports
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles/';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';

// Bind the plugin to the dayJS lib
dayjs.extend(relativeTime);

// JSS styling to match Material-UI's official doc
const useStyles = makeStyles({
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
});

// The actual component
const Scream = (props) => {
    const { data } = props;
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardMedia className={classes.image}
            image={data.userImage}
            title="Profile picture" />
            <CardContent className={classes.content}>
                <Typography variant="h5" component={Link} to={`/users/${data.username}`} color="primary">{data.username}</Typography>
                <Typography variant="body2" color="textSecondary">{dayjs(data.createdAt).fromNow()}</Typography>
                <Typography variant="body1">{data.text}</Typography>
                <div style={{display: "inline"}}>
                    <LikeButton />
                    <CommentButton />
                </div>
            </CardContent>
        </Card>
    );
}

export default Scream;