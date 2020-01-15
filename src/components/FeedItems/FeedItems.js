import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Grid } from '@material-ui/core';

import FeedItem from './FeedItem/FeedItem';
import styles from './FeedItems.module.css';
import axios from '../../shared/backendAxios';
import Spinner from '../Spinner/Spinner';
import NoContent from '../NoContent/NoContent';
import { FetchItemsContext } from '../../context/fetch-items-context';

const FeedItems = () => {
  const fetchItemsContext = useContext(FetchItemsContext);

  const [items, setItems] = useState([]);
  const [isFetched, setIsFetched] = useState(false);

  const getItems = useCallback(async queryParams => {
    try {
      const response = await axios.get('/items', { params: queryParams });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getItemsByFeedIds = useCallback(
    async feedIds => {
      setIsFetched(false);
      const promises = [];
      for (let i = 0; i < feedIds.length; i += 1) {
        const feedId = feedIds[i];
        promises.push(getItems({ feedId }));
      }
      const results = await Promise.all(promises);
      setItems(results.reduce((prev, cur) => prev.concat(cur), []));
      setIsFetched(true);
    },
    [getItems],
  );

  useEffect(() => {
    getItemsByFeedIds(fetchItemsContext.feedIds);
  }, [fetchItemsContext, getItemsByFeedIds]);

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
    </div>
  );
};

export default FeedItems;
