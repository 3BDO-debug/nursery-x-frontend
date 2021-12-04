import React, { useCallback, useContext, useEffect, useState } from 'react';
import _ from 'lodash';
// material
import { Paper, Typography } from '@mui/material';
// context
import { MessengerContext, AuthContext } from '../../contexts';
// apis
import { mainUrl } from '../../_apis_/axios';
// components
import Scrollbar from '../Scrollbar';
import Message from './Message';

function ChatScreen() {
  const messages = useContext(MessengerContext).messagesState[0];
  const user = useContext(AuthContext).userState[0];
  const selectedContact = useContext(MessengerContext).selectedContactState[0];
  const [conversation, setConversation] = useState([]);

  const renderChatScreen = useCallback(() => {
    let context;
    if (selectedContact) {
      if (conversation.length > 0) {
        context = conversation.map((message) => (
          <Message
            key={message.id}
            avatarUrl={`${mainUrl}${message.sender_profile_pic}`}
            timestamp={new Date(message.timestamp).toLocaleString()}
            body={message.body}
            senderView={user.id === message.sender}
          />
        ));
      } else if (conversation.length === 0) {
        context = (
          <Typography sx={{ textAlign: 'center', marginTop: '20vh' }} variant="subtitle1">
            Start a conversation with {selectedContact.fullname}
          </Typography>
        );
      }
    } else if (!selectedContact) {
      context = (
        <Typography sx={{ textAlign: 'center', marginTop: '20vh' }} variant="subtitle1">
          Select a contact to start chat with
        </Typography>
      );
    }
    return context;
  }, [selectedContact, conversation, user]);

  useEffect(() => {
    renderChatScreen();
  }, [selectedContact, user, renderChatScreen, messages, conversation]);

  useEffect(() => {
    if (selectedContact) {
      const conversationData = _.filter(
        messages,
        (message) => message.initialized_between === (user.id + selectedContact.accountId).toString()
      );
      setConversation(conversationData);
    }
  }, [messages, selectedContact, user]);

  return (
    <Scrollbar sx={{ display: 'flex', flexDirection: 'column', maxHeight: '400px' }}>
      <Paper sx={{ flexGrow: 1 }}>{renderChatScreen()}</Paper>
    </Scrollbar>
  );
}

export default ChatScreen;
