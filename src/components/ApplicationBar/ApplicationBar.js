import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, Typography, AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';

import { SIDEBAR_WIDTH } from '../../shared/constants';

const useStyles = makeStyles(theme => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
      marginLeft: SIDEBAR_WIDTH,
    },
  },
}));

const ApplicationBar = props => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Hidden mdUp implementation="css">
          <IconButton color="inherit" aria-label="open drawer" onClick={props.onItemButtonClick}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant="h6" noWrap>
          RSS Aggregator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
