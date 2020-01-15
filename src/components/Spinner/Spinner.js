import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import styles from './Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.container}>
      <CircularProgress disableShrink />
    </div>
  );
};

export default Spinner;
