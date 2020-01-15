import React from 'react';

import SideBar from './components/SideBar/SideBar';
import FeedItems from './components/FeedItems/FeedItems';
import styles from './App.module.css';

import FetchItemsContextProvider from './context/fetch-items-context';

function App() {
  return (
    <div className={styles.container}>
      <FetchItemsContextProvider>
        <SideBar />
        <FeedItems />
      </FetchItemsContextProvider>
    </div>
  );
}

export default App;
