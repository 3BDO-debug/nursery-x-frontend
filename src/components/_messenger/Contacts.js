import React, { useContext, useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
// material
import { Paper, Stack, Avatar, Divider, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Scrollbar from '../Scrollbar';
// contexts
import { UsersContext, AuthContext, MessengerContext } from '../../contexts';
// components
import Contact from './Contact';

function Contacts() {
  const user = useContext(AuthContext).userState[0];
  const parents = useContext(UsersContext).parentsState[0];
  const staff = useContext(UsersContext).staffState[0];
  const setSelectedContact = useContext(MessengerContext).selectedContactState[1];

  const [query, setQuery] = useState('');
  const [contacts, setContacts] = useState([]);
  const [searchResults, setSearchResults] = useState(contacts);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  const filterContacts = useCallback(() => {
    if (!query) {
      return contacts;
    }

    return _.filter(contacts, (o) => {
      const contactName = o.fullname.toLowerCase();
      return _.includes(contactName, query);
    });
  }, [contacts, query]);

  useEffect(() => {
    setSearchResults(filterContacts());
  }, [query, filterContacts]);

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
        <Avatar src={user?.profile_pic} />
        <InputBase
          sx={{ marginLeft: 3, width: '100%' }}
          placeholder="Search contacts..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          endAdornment={
            <IconButton>
              <SearchIcon />
            </IconButton>
          }
        />
      </Paper>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <Scrollbar sx={{ display: 'flex', flexDirection: 'column', maxHeight: '400px' }}>
        {query === '' &&
          searchResults.length === 0 &&
          contacts.map((contact) => (
            <Contact
              onClickHandler={() => handleSelectContact(contact)}
              key={contact.accountId}
              avatarUrl={contact.profilePic}
              fullname={contact.fullname}
            />
          ))}

        {searchResults.length > 0 &&
          searchResults.map((contact) => (
            <Contact
              onClickHandler={() => handleSelectContact(contact)}
              key={contact.accountId}
              avatarUrl={contact.profilePic}
              fullname={contact.fullname}
            />
          ))}
      </Scrollbar>
    </Stack>
  );
}

export default Contacts;
