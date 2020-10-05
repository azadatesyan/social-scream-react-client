import React from 'react';

import { makeStyles } from '@material-ui/core/styles/';
import CommentIcon from '@material-ui/icons/Message';
import TooltipBtn from '../util/TooltipBtn';

// import { useDispatch } from 'react-redux';

const useStyles = makeStyles({
    svgAlign: {
        verticalAlign: 'middle',
        display: 'inline-block',
    },
    commentBtn: {
        display: 'inline-block',
        margin: '0.5rem 0.5rem 0 0'
    }
});

const CommentButton = ({ count }) => {
    const classes = useStyles();

    return (
        <div className={classes.commentBtn}>
            <TooltipBtn tipText="Comment scream" padding={8}>
                <CommentIcon color="primary" className={classes.svgAlign} />
            </TooltipBtn>
            <span className={classes.svgAlign}>{count} comments</span>
        </div>
    );
};

export default CommentButton;