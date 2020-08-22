import React, { useState } from 'react';

const Scream = (props) => {
    const { data } = props;
    return (
        <div>
            <p>{data.text}</p>
            <p>{data.username}</p>
        </div>
    )
}

export default Scream;