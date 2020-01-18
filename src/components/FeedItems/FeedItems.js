import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import Pagination from 'material-ui-flat-pagination';

import FeedItem from './FeedItem/FeedItem';
import styles from './FeedItems.module.css';
import axios from '../../shared/backendAxios';
import Spinner from '../Spinner/Spinner';
import NoContent from '../NoContent/NoContent';
import { RESULTS_PER_PAGE } from '../../shared/constants';
import { FetchItemsContext } from '../../context/fetch-items-context';

const useStyles = makeStyles(theme => ({
  paginationRoot: {
    background: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.25)',
  },
}));

const FeedItems = () => {
  const fetchItemsContext = useContext(FetchItemsContext);

  const classes = useStyles();

  const [items, setItems] = useState([]);
  const [numOfItems, setNumOfItems] = useState(0);
  const [offset, setOffset] = useState(1);
  const [isFetched, setIsFetched] = useState(true);

  const getItems = useCallback(async queryParams => {
    try {
      const response = await axios.get('/items', { params: queryParams });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getItemsByFeedIds = useCallback(
    async (feedIds, offset) => {
      setIsFetched(false);
      const data = await getItems({ feedId: feedIds, offset });
      setItems(data.items);
      setNumOfItems(data.numOfResults);
      setIsFetched(true);
    },
    [getItems],
  );

  useEffect(() => {
    if (fetchItemsContext.feedIds) {
      setOffset(1);
      getItemsByFeedIds(fetchItemsContext.feedIds, 1);
    }
  }, [fetchItemsContext, getItemsByFeedIds]);

  const handlePaginationClick = useCallback(
    offset => {
      getItemsByFeedIds(fetchItemsContext.feedIds, offset);
      setOffset(offset);
    },
    [fetchItemsContext.feedIds, getItemsByFeedIds],
  );

  return (
    <div className={styles.container}>
      {isFetched && items.length === 0 && (
        <NoContent additionalText="(please select a rss feed from left side of the screen)" />
      )}
      {!isFetched && <Spinner />}
      <Grid container spacing={2}>
        {isFetched &&
          items.map(item => (
            <Grid item xs={12} key={item.date + item.link}>
              <FeedItem
                title={item.title}
                date={item.date}
                content={item.content}
                link={item.link}
                rssFeedTitle={item.rss_feed_url.title}
              />
            </Grid>
          ))}
      </Grid>
      {isFetched && items.length !== 0 && (
        <div className={styles.paginationContainer}>
          <Pagination
            limit={RESULTS_PER_PAGE}
            offset={offset}
            total={numOfItems}
            classes={{
              root: classes.paginationRoot,
            }}
            onClick={(e, offset) => handlePaginationClick(offset)}
          />
        </div>
      )}
    </div>
  );
};

export default FeedItems;
