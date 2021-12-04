import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
// material
import { Paper, Stack, Avatar, Divider, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Scrollbar from '../Scrollbar';
// contexts
import { UsersContext, AuthContext, MessengerContext } from '../../contexts';
// apis
import { mainUrl } from '../../_apis_/axios';
// components
import Contact from './Contact';

function Contacts() {
  const user = useContext(AuthContext).userState[0];
  const parents = useContext(UsersContext).parentsState[0];
  const staff = useContext(UsersContext).staffState[0];
  const setSelectedContact = useContext(MessengerContext).selectedContactState[1];

  const [contacts, setContacts] = useState([]);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  useEffect(() => {
    if (user?.account_type === 'parent') {
      setContacts(
        staff.map((staffMember) => ({
          accountId: staffMember.staff_account,
          fullname: staffMember.fullname,
          profilePic: staffMember.profile_pic,
          accountType: staffMember.account_type
        }))
      );
    } else {
      const mappedStaff = _.map(staff, (staffMember) => ({
        accountId: staffMember.staff_account,
        fullname: staffMember.fullname,
        profilePic: staffMember.profile_pic,
        accountType: staffMember.account_type
      }));
      const mappedParents = _.map(parents, (parent) => ({
        accountId: parent.parent_account,
        fullname: parent.parent.fullname,
        profilePic: parent.parent.profile_pic,
        accountType: parent.account_type
      }));
      setContacts(_.concat(mappedStaff, mappedParents));
    }
  }, [user, parents, staff]);

  return (
    <Stack direction="column" sx={{ width: '35%', borderRight: '1px solid lightgray' }}>
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Avatar src={`${mainUrl}${user?.profile_pic}`} />
        <InputBase
          sx={{ marginLeft: 3, width: '100%' }}
          placeholder="Search contacts..."
          endAdornment={
            <IconButton>
              <SearchIcon />
            </IconButton>
          }
        />
      </Paper>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Scrollbar sx={{ display: 'flex', flexDirection: 'column', maxHeight: '400px' }}>
        {contacts?.map((contact) => (
          <Contact
            onClickHandler={() => handleSelectContact(contact)}
            key={contact.accountId}
            avatarUrl={`${mainUrl}${contact.profilePic}`}
            fullname={contact.fullname}
          />
        ))}
      </Scrollbar>
    </Stack>
  );
}

export default Contacts;
