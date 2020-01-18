import React, { useState, useCallback } from 'react';
import { makeStyles, ListItem, Checkbox, IconButton, Divider, Menu, MenuItem, Tooltip } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import RefreshIcon from '@material-ui/icons/Refresh';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './Item.module.css';

const useStyles = makeStyles(theme => ({
  listItemRoot: {
    padding: 8,
  },
  iconRoot: {
    color: theme.palette.primary.main,
  },
  listRoot: {
    display: 'flex',
  },
}));

const Item = props => {
  const { rssFeed, onClickCheckBox, onClickRefresh, onClickDelete, index, isChecked } = props;
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  const closeMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <React.Fragment>
      <ListItem classes={{ root: classes.listItemRoot }}>
        <Checkbox color="primary" checked={isChecked} onClick={() => onClickCheckBox(index)} />
        <div className={styles.contentContainer}>
          <div>{rssFeed.title}</div>
          <div>
            <IconButton aria-label="refresh" color="primary" onClick={openMenu}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              keepMounted
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={closeMenu}
              classes={{ list: classes.listRoot }}
            >
              <MenuItem onClick={() => onClickDelete(rssFeed.id)}>
                <DeleteIcon classes={{ root: classes.iconRoot }} />
              </MenuItem>
              <MenuItem onClick={() => onClickRefresh(rssFeed.id)}>
                <Tooltip title="Check for new Rss Feed Items" enterDelay={700}>
                  <RefreshIcon classes={{ root: classes.iconRoot }} />
                </Tooltip>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </ListItem>
      <Divider />
    </React.Fragment>
  );
};

export default Item;
