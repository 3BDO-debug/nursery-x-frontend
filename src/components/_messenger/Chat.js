import React, { useContext } from 'react';
// material
import { Paper, Typography, Stack, Avatar } from '@mui/material';
// contexts
import { MessengerContext } from '../../contexts';
// apis
import { mainUrl } from '../../_apis_/axios';
// components
import ChatScreen from './ChatScreen';
import ChatInput from './ChatInput';
import Label from '../Label';

function Chat() {
  const selectedContact = useContext(MessengerContext).selectedContactState[0];

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '400px' }}>
      {selectedContact && (
        <Paper sx={{ borderBottom: '1px solid lightgray', padding: 2 }}>
          <Stack direction="row" width="100%">
            <Avatar sx={{ marginRight: 1 }} src={`${mainUrl}${selectedContact.profilePic}`} />
            <Stack direction="column">
              <Typography variant="subtitle1">{selectedContact.fullname}</Typography>
              <Label variant="ghost" color="info">
                {selectedContact.accountType}
              </Label>
            </Stack>
          </Stack>
        </Paper>
      )}
      <ChatScreen />
      {selectedContact && <ChatInput />}
    </Paper>
  );
}

export default Chat;
