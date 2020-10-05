import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// MUI
import { Grid, Typography } from '@material-ui/core';

// Redux
import { useSelector } from 'react-redux';

// Other
import dayjs from 'dayjs';

const Comments = () => {
    const content = useSelector(state => state);
    const { data: { scream: { comments } } } = content;

    return (
        <Grid container>
            {comments.map((comment) => {
                const { text, createdAt, username, userImage } = comment;
                return (
                    <Fragment key={createdAt}>
                        <Grid item sm={12} style={{margin: "0.5rem 0"}}>
                            <Grid container>
                                <Grid item sm={2}>
                                    <img src={userImage} alt="commentPicture" style={{maxWidth: "100%", height: 100, borderRadius: "50%", objectFit: "cover"}} />
                                </Grid>
                                <Grid item sm={10} style={{paddingLeft: "20px"}}>
                                    <Typography variant="h5" component={Link} to={`/users/${username}`} color="primary">
                                        {username}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                    </Typography>
                                    <Typography variant="body1" style={{paddingTop: "10px"}}>
                                        {text}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Fragment>
                );
            })}
        </Grid>
    );
};

export default Comments;
