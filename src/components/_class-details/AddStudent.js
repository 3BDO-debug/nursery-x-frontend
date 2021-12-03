import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import {
  DialogContent,
  DialogTitle,
  DialogActions,
  Stack,
  InputBase,
  IconButton,
  Paper,
  Divider,
  Button,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from '@mui/lab';
// apis
import { classUpdater } from '../../_apis_/classes';
// contexts
import { KidsContext, ClassesContext } from '../../contexts';
// components
import { DialogAnimate, varSlideInUp } from '../animate';
import SearchResult from './SearchResult';
import { MIconButton } from '../@material-extend';

AddStudent.propTypes = {
  isTriggered: PropTypes.bool,
  closeHandler: PropTypes.func,
  classDetails: PropTypes.object
};

function AddStudent({ isTriggered, closeHandler, classDetails }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const setClasses = useContext(ClassesContext).classesState[1];

  const kids = useContext(KidsContext).kidsState[0];
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(kids);
  const [loading, setLoading] = useState(false);

  const filterStudents = useCallback(() => {
    if (!query) {
      return kids;
    }

    return _.filter(kids, (o) => {
      const kidName = o.name.toLowerCase();
      return _.includes(kidName, query);
    });
  }, [kids, query]);

  const handleAddKid = (kidId) => {
    setLoading(true);

    const data = new FormData();
    data.append('classId', classDetails?.id);
    data.append('kidId', kidId);

    classUpdater(data)
      .then((classesResponse) => {
        setClasses(classesResponse);
        enqueueSnackbar('Success', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      })
      .catch(() =>
        enqueueSnackbar('Something wrong happened', {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        })
      );

    setLoading(false);
  };

  useEffect(() => {
    setSearchResults(filterStudents());
  }, [query, filterStudents]);

  return (
    <DialogAnimate animate={varSlideInUp} open={isTriggered} onClose={closeHandler}>
      <DialogTitle>
        <Paper component="form">
          <Stack sx={{ width: '100%' }} direction="row" alignItems="center">
            <InputBase
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search students..."
              sx={{ flex: 1 }}
              autoFocus
            />
            <IconButton sx={{ marginLeft: 'auto', order: 2 }}>
              <SearchIcon />
            </IconButton>
          </Stack>
        </Paper>
      </DialogTitle>
      <DialogContent>
        <Paper sx={{ display: 'flex', flexDirection: 'column', paddingTop: 2 }}>
          {query === '' &&
            searchResults.length === 0 &&
            kids.map((searchResult) => (
              <>
                <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
                  <SearchResult result={searchResult} />
                  <LoadingButton
                    disabled={loading}
                    loading={loading}
                    sx={{ marginLeft: 'auto', order: 2 }}
                    variant="contained"
                    onClick={() => handleAddKid(searchResult.id)}
                    color={_.includes(classDetails?.class_members, searchResult.id) ? 'error' : 'primary'}
                  >
                    {_.includes(classDetails?.class_members, searchResult.id) ? 'Remove' : 'Add'}
                  </LoadingButton>
                </Stack>
                <Divider sx={{ pt: 2 }} />
              </>
            ))}

          {query !== '' && searchResults.length === 0 ? (
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ width: '100%' }}>
              <Typography variant="subtitle1" sx={{ paddingRight: 1 }}>
                Hmmm, we couldnt find any results.
              </Typography>
              <Icon icon="emojione:sad-but-relieved-face" width={30} height={30} />
            </Stack>
          ) : (
            searchResults.map((searchResult) => (
              <>
                <Stack direction="row" alignItems="center" sx={{ width: '100%' }}>
                  <SearchResult result={searchResult} />
                  <LoadingButton
                    disabled={loading}
                    loading={loading}
                    sx={{ marginLeft: 'auto', order: 2 }}
                    variant="contained"
                    onClick={() => handleAddKid(searchResult.id)}
                    color={_.includes(classDetails?.class_members, searchResult.id) ? 'error' : 'primary'}
                  >
                    {_.includes(classDetails?.class_members, searchResult.id) ? 'Remove' : 'Add'}
                  </LoadingButton>
                </Stack>
                <Divider sx={{ pt: 2 }} />
              </>
            ))
          )}
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Done</Button>
      </DialogActions>
    </DialogAnimate>
  );
}

export default AddStudent;
