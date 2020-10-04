import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';

import { useSelector, useDispatch } from 'react-redux';
import { submitComment } from './redux/actions/dataActions';

const CommentForm = () => {
    const dispatch = useDispatch();
    const content = useSelector(state => state);
    const { data: { scream: { screamId } }, user: { authenticated } } = content;

    const [commentBody, setCommentBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitComment(screamId, {text: commentBody}, setCommentBody));
    };

    const handleChange = (e) => {
        setCommentBody(e.target.value);
    };

    return (
        authenticated ? 
        <Grid item sm={12} style={{ textAlign: 'center' }}>
            <form onSubmit={handleSubmit}>
            <TextField
                name="text"
                type="text"
                label="Comment on scream"
                // error={errors.comment ? true : false}
                // helperText={errors.comment}
                value={commentBody}
                onChange={handleChange}
                fullWidth
                // className={classes.textField}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                // className={classes.button}
            >
                Submit
            </Button>
            </form>
        </Grid>
        :
        null
    )
}

export default CommentForm;