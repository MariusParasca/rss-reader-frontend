import React, { useState } from 'react';

export const FetchItemsContext = React.createContext({
  feedIds: '',
  changeToFetch: () => {},
});

const FetchItemsContextProvider = props => {
  const [feedIds, setFeedIds] = useState('');
  const [forceRefresh, setForceRefresh] = useState(true);

  const changeHandler = (feedIds, force) => {
    setFeedIds(feedIds);
    if (force) {
      setForceRefresh(!forceRefresh);
    }
  };

  return (
    <FetchItemsContext.Provider value={{ changeFeedIds: changeHandler, feedIds: feedIds }}>
      {props.children}
    </FetchItemsContext.Provider>
  );
};

export default FetchItemsContextProvider;
