import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// apis
import { classesFetcher } from '../_apis_/classes';

export const ClassesContext = createContext();

export const ClassesProvider = ({ children }) => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    classesFetcher()
      .then((classesResponse) => setClasses(classesResponse))
      .catch((error) => console.log('classes=context', error));
  }, []);

  return <ClassesContext.Provider value={{ classesState: [classes, setClasses] }}>{children}</ClassesContext.Provider>;
};

ClassesProvider.propTypes = {
  children: PropTypes.node
};
