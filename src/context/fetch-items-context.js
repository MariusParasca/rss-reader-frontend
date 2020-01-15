import React, { useState } from 'react';

export const FetchItemsContext = React.createContext({
  feedId: [],
  changeToFetch: () => {},
});

const FetchItemsContextProvider = props => {
  const [feedIds, setFeedIds] = useState([]);

  const changeHandler = feedIds => {
    setFeedIds(feedIds);
  };

  return (
    <FetchItemsContext.Provider value={{ changeFeedIds: changeHandler, feedIds: feedIds }}>
      {props.children}
    </FetchItemsContext.Provider>
  );
};

export default FetchItemsContextProvider;
