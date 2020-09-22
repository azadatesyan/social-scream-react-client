import React from 'react';

import { makeStyles } from '@material-ui/core/styles/';
import NotLikedIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles({
    svgAlign: {
        margin: '0.75rem 0.25rem 0 0',
        verticalAlign: 'middle',
        display: 'inline-block'
    },
    likeBtn: {
        display: 'inline',
        marginRight: '0.5rem'
    }
});

const LikeButton = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.likeBtn}>
            <NotLikedIcon className={classes.svgAlign} />
            <span className={classes.svgAlign}>0 likes</span>
        </div>
    );
};

export default LikeButton;