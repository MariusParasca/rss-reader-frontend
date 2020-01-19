import React, { useState, useEffect, useCallback, useContext } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles, Divider, Snackbar, IconButton, List, Hidden, TextField, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { FetchItemsContext } from '../../../context/fetch-items-context';
import axios from '../../../shared/backendAxios';
import { isUrl } from '../../../shared/validations';
import Spinner from '../../Spinner/Spinner';
import Item from './Item/Item';
import styles from './Drawer.module.css';

const useStyles = makeStyles(theme => ({
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
  },
}));

const updateTextField = func => ({ target: { value } }) => {
  func(value);
};

const DrawerContent = props => {
  const classes = useStyles();

  const [rssFeeds, setRssFeeds] = useState([]);
  const [rssFeedsIsChecked, setRssFeedsIsChecked] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const fetchItemsContext = useContext(FetchItemsContext);

  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [snackBarColor, setSnackBarColor] = useState('success');

  const [rssLink, setRssLink] = useState('');
  const [isRssLinkValid, setIsRssLinkValid] = useState(true);
  const [rssLinkHelperText, setRssLinkHelperText] = useState('');

  const setSnackBarOptions = useCallback((isOpen, message, snackBarType) => {
    setIsOpenSnackBar(isOpen);
    setAlertMessage(message);
    setSnackBarColor(snackBarType);
  }, []);

  const onCloseSnackBar = useCallback(() => {
    setIsOpenSnackBar(false);
  }, []);

  const isUrlValid = useCallback(() => {
    if (isUrl(rssLink)) {
      setIsRssLinkValid(true);
      setRssLinkHelperText('');
    } else if (rssLink) {
      setIsRssLinkValid(false);
      setRssLinkHelperText('Invalid URL(link)');
    }
  }, [rssLink]);

  const sendGetItemsRequests = useCallback(
    isRssFeedsChecked => {
      const feedIds = [];

      for (let i = 0; i < rssFeeds.length; i += 1) {
        const rssFeed = rssFeeds[i];
        if (isRssFeedsChecked[i]) {
          feedIds.push(rssFeed.id);
        }
      }
      fetchItemsContext.changeFeedIds(feedIds.join(';'));
    },
    [fetchItemsContext, rssFeeds],
  );

  const onClickCheckBox = useCallback(
    index => {
      const newRssFeedsIsChecked = [...rssFeedsIsChecked];
      newRssFeedsIsChecked[index] = !newRssFeedsIsChecked[index];
      setRssFeedsIsChecked(newRssFeedsIsChecked);
      sendGetItemsRequests(newRssFeedsIsChecked);
    },
    [rssFeedsIsChecked, sendGetItemsRequests],
  );

  const fetchData = useCallback(
    async id => {
      try {
        await axios.get(`fetch/${id}`);
        sendGetItemsRequests(rssFeedsIsChecked);
        setSnackBarOptions(true, 'Data fetched successfully', 'success');
      } catch (error) {
        setSnackBarOptions(true, 'Error getting feeds', 'error');
      }
    },
    [setSnackBarOptions, rssFeedsIsChecked, sendGetItemsRequests],
  );

  const addLink = useCallback(
    async url => {
      try {
        setIsFetched(false);
        const response = await axios.post('/feed/add', {
          url,
        });
        setRssFeeds(rssFeeds.concat({ id: response.data.id, url: url, title: response.data.title }));
        setRssFeedsIsChecked(rssFeedsIsChecked => rssFeedsIsChecked.concat(false));
        sendGetItemsRequests(rssFeedsIsChecked);

        setSnackBarOptions(true, 'Successfully added', 'success');

        setIsRssLinkValid(true);
        setRssLinkHelperText('');
        setRssLink('');
      } catch (error) {
        setIsRssLinkValid(false);
        setRssLinkHelperText(error.response.data.message);
      } finally {
        setIsFetched(true);
      }
    },
    [rssFeeds, setSnackBarOptions, rssFeedsIsChecked, sendGetItemsRequests],
  );

  const onClickDeleteButton = useCallback(
    async id => {
      try {
        const index = rssFeeds.findIndex(rssFeed => rssFeed.id === id);
        rssFeeds.splice(index, 1);
        rssFeedsIsChecked.splice(index, 1);
        setRssFeeds(rssFeeds);
        setRssFeedsIsChecked(rssFeedsIsChecked);
        sendGetItemsRequests(rssFeedsIsChecked);
        await axios.delete(`/feeds/${id}`);
        setSnackBarOptions(true, 'Successfully deleted', 'success');
      } catch (error) {
        setSnackBarOptions(true, 'Error deleting feed', 'error');
      }
    },
    [setSnackBarOptions, rssFeeds, rssFeedsIsChecked, sendGetItemsRequests],
  );

  const onClickAddButton = useCallback(() => {
    if (isUrl(rssLink)) {
      addLink(rssLink);
    } else {
      setIsRssLinkValid(false);
      setRssLinkHelperText('Invalid URL(link)');
    }
  }, [rssLink, addLink]);

  const getFeeds = useCallback(async () => {
    try {
      const response = await axios.get('feeds');
      const newRssFeedsIsChecked = Array(response.data.length).fill(false);
      setRssFeedsIsChecked(newRssFeedsIsChecked);
      setRssFeeds(response.data);
      setIsFetched(true);
    } catch (error) {
      setSnackBarOptions(true, 'Error getting feeds', 'error');
    }
  }, [setSnackBarOptions]);

  useEffect(() => {
    getFeeds();
  }, [getFeeds]);

  return (
    <React.Fragment>
      <div className={classes.toolbar}>
        <Hidden mdUp implementation="css">
          <div>
            <IconButton aria-label="refresh" color="primary" onClick={props.onClickIconButton}>
              <ArrowBackIosIcon />
            </IconButton>
          </div>
        </Hidden>
      </div>
      <Divider />
      <div className={styles.addContainer}>
        <TextField
          label="RSS feed link"
          type="url"
          value={rssLink}
          onBlur={isUrlValid}
          onChange={updateTextField(setRssLink)}
          error={!isRssLinkValid}
          helperText={rssLinkHelperText}
        />
        <Fab color="primary" aria-label="add" onClick={onClickAddButton}>
          <AddIcon />
        </Fab>
      </div>
      <Divider />
      <List>
        {!isFetched && <Spinner />}
        {isFetched &&
          rssFeeds.map((rssFeed, index) => {
            return (
              <Item
                key={`item-${index}`}
                isChecked={rssFeedsIsChecked[index]}
                rssFeed={rssFeed}
                index={index}
                onClickCheckBox={onClickCheckBox}
                onClickRefresh={fetchData}
                onClickDelete={onClickDeleteButton}
              />
            );
          })}
      </List>
      <Snackbar open={isOpenSnackBar} autoHideDuration={6000} onClose={onCloseSnackBar}>
        <MuiAlert elevation={6} variant="filled" color={snackBarColor} onClose={onCloseSnackBar}>
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </React.Fragment>
  );
};

export default DrawerContent;
