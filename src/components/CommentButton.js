import React from 'react';

import { makeStyles } from '@material-ui/core/styles/';
import CommentIcon from '@material-ui/icons/Message';

const useStyles = makeStyles({
    svgAlign: {
        margin: '0.75rem 0.25rem 0 0',
        verticalAlign: 'middle',
        display: 'inline-block',
    },
    commentBtn: {
        display: 'inline',
        marginLeft: '0.5rem'
    }
});

const CommentButton = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.commentBtn}>
            <CommentIcon className={classes.svgAlign} />
            <span className={classes.svgAlign}>0 comments</span>
        </div>
    );
};

export default CommentButton;