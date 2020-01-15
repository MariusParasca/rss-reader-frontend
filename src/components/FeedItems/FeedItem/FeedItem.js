import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Card } from '@material-ui/core';

import styles from './FeedItem.module.css';

const FeedItem = props => {
  const { title, date, content, link, rssFeedTitle } = props;

  return (
    <Card className={styles.card}>
      <div className={styles.titleContainer}>
        <a href={link} className={styles.anchorTitle}>
          <span className={styles.title}>{title || 'No title'}</span>
        </a>
        <div className={styles.rssFeedTitle}>{rssFeedTitle || 'No rss feed title'}</div>
      </div>
      <span className={styles.date}>{date || 'no date'}</span>
      <Typography variant="body2">{content || 'No content'}</Typography>
    </Card>
  );
};

FeedItem.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  rssFeedTitle: PropTypes.string.isRequired,
};

export default FeedItem;
