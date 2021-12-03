import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// apis
import { kidsFetcher } from '../_apis_/kids';

export const KidsContext = createContext();

export const KidsProvider = ({ children }) => {
  const [kids, setKids] = useState([]);

  useEffect(() => {
    kidsFetcher()
      .then((kidsResponse) => setKids(kidsResponse))
      .catch((error) => console.log(error));
  }, []);

  return <KidsContext.Provider value={{ kidsState: [kids, setKids] }}>{children}</KidsContext.Provider>;
};

KidsProvider.propTypes = {
  children: PropTypes.node
};
