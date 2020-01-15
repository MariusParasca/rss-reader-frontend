import React, { useCallback, useState } from 'react';
import { makeStyles, Hidden, Drawer } from '@material-ui/core';

import { SIDEBAR_WIDTH } from '../../shared/constants';
import ApplicationBar from '../ApplicationBar/ApplicationBar';
import DrawerContent from './DrawerContent/DrawerContent';

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    width: SIDEBAR_WIDTH,
    [theme.breakpoints.down('sm')]: {
      width: SIDEBAR_WIDTH - 50,
    },
  },
  container: {
    width: SIDEBAR_WIDTH,
    flexShrink: 0,
    [theme.breakpoints.down('md')]: {
      width: 0,
    },
    [theme.breakpoints.up('md')]: {
      width: SIDEBAR_WIDTH,
    },
  },
}));

const SideBar = () => {
  const classes = useStyles();

  const [isOpenOnMobile, setIsOpenOnMobile] = useState(false);

  const toggleIsOpenOnModal = useCallback(() => {
    setIsOpenOnMobile(!isOpenOnMobile);
  }, [isOpenOnMobile]);

  return (
    <div className={classes.container}>
      <ApplicationBar onItemButtonClick={toggleIsOpenOnModal} />
      <Hidden smDown implementation="css">
        <Drawer variant="permanent" open classes={{ paper: classes.drawerPaper }}>
          <DrawerContent onClickIconButton={toggleIsOpenOnModal} />
        </Drawer>
      </Hidden>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          open={isOpenOnMobile}
          onClose={toggleIsOpenOnModal}
          classes={{ paper: classes.drawerPaper }}
        >
          <DrawerContent onClickIconButton={toggleIsOpenOnModal} />
        </Drawer>
      </Hidden>
    </div>
  );
};

export default SideBar;
