import React from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles/';
import NotLikedIcon from '@material-ui/icons/FavoriteBorder';
import TooltipBtn from '../util/TooltipBtn';

import { useSelector, useDispatch } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';

const useStyles = makeStyles({
    svgAlign: {
        verticalAlign: 'middle',
        display: 'inline-block'
    },
    likeBtn: {
        display: 'inline-block',
        margin: '0.5rem 0.5rem 0 0'
    }
});

const LikeButton = ({ count, screamId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const content = useSelector(state => state);
    const { user: { authenticated, likes } } = content;

    const isLiked = likes && likes.find(like => like.screamId === screamId);
    const tipText = isLiked ? 'Unlike scream' : 'Like scream';

    const handleClick = () => {
        authenticated ? handleLike() : history.push('/login');
    };

    const handleLike = () => {
        console.log(isLiked);
        if (isLiked) {
            dispatch(unlikeScream(screamId));
        } else {
            dispatch(likeScream(screamId));
        }
    };

    return (
        <div className={classes.likeBtn}>
            <TooltipBtn onClick={handleClick} tipText={tipText} padding={8}>
                <NotLikedIcon
                color="primary"
                className={classes.svgAlign}
                style={{cursor: 'pointer'}} />
            </TooltipBtn>
            <span className={classes.svgAlign}>{count} likes</span>
        </div>
    );
};

export default LikeButton;