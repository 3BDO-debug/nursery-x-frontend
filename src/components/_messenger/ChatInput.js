import React, { useState, useContext } from 'react';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { Paper, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { LoadingButton } from '@mui/lab';
// apis
import { messageAdder } from '../../_apis_/messenger';
// contexts
import { MessengerContext } from '../../contexts';
// components
import { MIconButton } from '../@material-extend';

function ChatInput() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const setMessages = useContext(MessengerContext).messagesState[1];
  const selectedContact = useContext(MessengerContext).selectedContactState[0];

  const handleSendMessage = () => {
    setLoading(true);

    const data = new FormData();
    data.append('body', message);
    data.append('receiverId', selectedContact.accountId);

    messageAdder(data)
      .then((messagesResponse) => {
        setMessages(messagesResponse);
        enqueueSnackbar('Message sent', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        setMessage('');
        setLoading(false);
      })
      .catch(() => {
        enqueueSnackbar('Something wrong happened', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        setLoading(false);
      });
  };

  return (
    <Paper sx={{ padding: 2, borderTop: '1px solid lightgray', width: '100%' }}>
      <InputBase
        placeholder="Enter message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        endAdornment={
          <LoadingButton disabled={message === '' || loading} loading={loading} onClick={handleSendMessage}>
            <SendIcon />
          </LoadingButton>
        }
        fullWidth
      />
    </Paper>
  );
}

export default ChatInput;
