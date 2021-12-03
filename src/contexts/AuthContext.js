import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// apis
import { userInfoRequest } from '../_apis_/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem('access_token')) {
      userInfoRequest()
        .then((response) => setUser(response))
        .catch((error) => console.log(error));
    }
  }, []);

  return <AuthContext.Provider value={{ userState: [user, setUser] }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node
};
