import React from 'react';
import { Link } from 'react-router-dom';

// DayJS lib imports
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Redux imports
import { useSelector } from 'react-redux';

// MUI imports
import { Card, CardMedia, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles/';
import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import DeleteButton from './DeleteButton';
import ScreamDialog from './ScreamDialog';

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
        width: "100%",
        objectFit: 'cover'
    }
});

// The actual component
const Scream = (props) => {
    const { data } = props;
    const classes = useStyles();
    const content = useSelector(state => state);

    const { user: { authenticated, credentials: { username } } } = content;
    const isAuthor = authenticated && username === data.username;

    return (
        <Card className={classes.card}>
            <CardMedia className={classes.image}
            image={data.userImage}
            title="Profile picture" />
            <CardContent className={classes.content}>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${data.username}`}
                        color="primary"
                        style={{display: "flex", alignItems: "center"}}>
                        {data.username}
                    </Typography>
                    {isAuthor &&
                        <DeleteButton screamId={data.screamId} />
                    }
                </div>
                <Typography variant="body2" color="textSecondary">{dayjs(data.createdAt).fromNow()}</Typography>
                <Typography variant="body1">{data.text}</Typography>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "inline"}}>
                        <LikeButton count={data.likeCount} screamId={data.screamId} />
                        <CommentButton count={data.commentCount} screamId={data.screamId} />
                    </div>
                    <div style={{display: "inline", paddingTop: "0.5rem"}}>
                        <ScreamDialog screamId={data.screamId} />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default Scream;