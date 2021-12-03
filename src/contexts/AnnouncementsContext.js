import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// apis
import { announcementsFetcher } from '../_apis_/announcements';

export const AnnouncementsContext = createContext();

export const AnnouncementsProvider = ({ children }) => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    announcementsFetcher()
      .then((announcementsResponse) => setAnnouncements(announcementsResponse))
      .catch((error) => console.log('announcements', error));
  }, []);

  return (
    <AnnouncementsContext.Provider value={{ announcementsState: [announcements, setAnnouncements] }}>
      {children}
    </AnnouncementsContext.Provider>
  );
};

AnnouncementsProvider.propTypes = {
  children: PropTypes.node
};
