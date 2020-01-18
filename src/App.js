import React from 'react';
import { ThemeProvider } from '@material-ui/core';

import theme from './theme';
import SideBar from './components/SideBar/SideBar';
import FeedItems from './components/FeedItems/FeedItems';
import styles from './App.module.css';

import FetchItemsContextProvider from './context/fetch-items-context';

function App() {
  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <FetchItemsContextProvider>
          <SideBar />
          <FeedItems />
        </FetchItemsContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
