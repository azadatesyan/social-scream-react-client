import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const TooltipBtn = ({ children, onClick, tipText }) => {

    return (
        <Tooltip title={tipText} placement="bottom">
        <IconButton aria-label={tipText} onClick={onClick}>
          {children}
        </IconButton>
      </Tooltip>
    );
};

export default TooltipBtn;