import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const TooltipBtn = ({ children, onClick, tipText, padding }) => {
  padding = padding + "px";

    return (
        <Tooltip title={tipText} placement="bottom">
        <IconButton aria-label={tipText} onClick={onClick} style={{padding}}>
          {children}
        </IconButton>
      </Tooltip>
    );
};

export default TooltipBtn;