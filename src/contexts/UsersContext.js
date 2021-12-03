import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// apis
import { parentsFetcher, staffFetcher } from '../_apis_/users';

export const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [parents, setParents] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    parentsFetcher()
      .then((parentsResponse) => setParents(parentsResponse))
      .catch((error) => console.log('parents-context', error));

    staffFetcher()
      .then((staffResponse) => setStaff(staffResponse))
      .catch((error) => console.log('staff-context', error));
  }, []);

  return (
    <UsersContext.Provider value={{ parentsState: [parents, setParents], staffState: [staff, setStaff] }}>
      {children}
    </UsersContext.Provider>
  );
};

UsersProvider.propTypes = {
  children: PropTypes.node
};
