import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// apis
import { messagesFetcher } from '../_apis_/messenger';

export const MessengerContext = createContext();

export const MessengerProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    messagesFetcher()
      .then((messagesResponse) => setMessages(messagesResponse))
      .catch((error) => console.log('Messenger context', error));
  }, []);

  return (
    <MessengerContext.Provider
      value={{ messagesState: [messages, setMessages], selectedContactState: [selectedContact, setSelectedContact] }}
    >
      {children}
    </MessengerContext.Provider>
  );
};

MessengerProvider.propTypes = {
  children: PropTypes.node
};
