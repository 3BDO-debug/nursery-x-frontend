import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// apis
import { meetingsFetcher } from '../_apis_/meetings';

export const MeetingsContext = createContext();

export const MeetingsProvider = ({ children }) => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    meetingsFetcher()
      .then((meetingsResponse) => setMeetings(meetingsResponse))
      .catch((error) => console.log('meeting error', error));
  }, []);

  return (
    <MeetingsContext.Provider value={{ meetingsState: [meetings, setMeetings] }}>{children}</MeetingsContext.Provider>
  );
};

MeetingsProvider.propTypes = {
  children: PropTypes.node
};
