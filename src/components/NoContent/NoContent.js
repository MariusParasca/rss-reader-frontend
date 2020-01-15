import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './NoContent.module.css';

const NoContent = ({ additionalText }) => {
  return (
    <div className={styles.container}>
      <Typography variant="h5">No Content {additionalText || ''}</Typography>
    </div>
  );
};

NoContent.propTypes = {
  additionalText: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
};

export default NoContent;
