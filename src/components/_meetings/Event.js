import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import { DialogTitle, DialogContent, DialogActions, Paper, Button, Grid, TextField } from '@mui/material';
import { LoadingButton, DateTimePicker } from '@mui/lab';
// context
import { MeetingsContext } from '../../contexts';
// apis
import { meetingAdder } from '../../_apis_/meetings';
// componenets
import { DialogAnimate, varSlideInUp } from '../animate';
import { MIconButton } from '../@material-extend';

Event.propTypes = {
  isTriggered: PropTypes.bool,
  closeHandler: PropTypes.func,
  dateRangeSelection: PropTypes.object,
  eventViewMode: PropTypes.object,
  triggeredEvent: PropTypes.object
};

function Event({ isTriggered, closeHandler, dateRangeSelection, eventViewMode, triggeredEvent }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const setMeetings = useContext(MeetingsContext).meetingsState[1];

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      startDate: new Date(),
      endDate: new Date()
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Event title is required'),
      description: Yup.string().required('Event description is required'),
      startDate: Yup.date().required('Start date is required'),
      endDate: Yup.date().required('End date is required')
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      meetingAdder(values)
        .then((meetingsResponse) => {
          setMeetings(meetingsResponse);
          enqueueSnackbar('Meeting created', {
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

      resetForm();
      setSubmitting(false);
      closeHandler();
    }
  });

  const { setFieldValue, getFieldProps, values, dirty, isSubmitting, errors, touched, handleSubmit } = formik;

  useEffect(() => {
    if (dateRangeSelection) {
      setFieldValue('startDate', dateRangeSelection.start);
      setFieldValue('endDate', dateRangeSelection.end);
    }
  }, [dateRangeSelection, setFieldValue]);

  return (
    <DialogAnimate open={isTriggered} onClose={closeHandler} animate={varSlideInUp}>
      <DialogTitle>{eventViewMode ? 'View event' : ' Create event'} </DialogTitle>
      <DialogContent>
        <Paper sx={{ paddingTop: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {eventViewMode ? (
                <TextField label="Title" value={triggeredEvent?.title} fullWidth />
              ) : (
                <TextField
                  label="Title"
                  value={values.title}
                  onChange={(event) => setFieldValue('title', event.target.value)}
                  {...getFieldProps('title')}
                  error={Boolean(touched.title && errors.title)}
                  helperText={touched.title && errors.title}
                  fullWidth
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {eventViewMode ? (
                <TextField
                  label="Description"
                  value={triggeredEvent?.extendedProps?.description}
                  fullWidth
                  multiline
                  rows={3}
                />
              ) : (
                <TextField
                  label="Description"
                  value={values.title}
                  onChange={(event) => setFieldValue('description', event.target.value)}
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                  rows={3}
                  multiline
                  fullWidth
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {eventViewMode ? (
                <DateTimePicker
                  label="Start date"
                  value={triggeredEvent?.start}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              ) : (
                <DateTimePicker
                  label="Start date"
                  value={values.startDate}
                  onChange={(newValue) => setFieldValue('startDate', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...getFieldProps('startDate')}
                      error={Boolean(touched.startDate && errors.startDate)}
                      helperText={touched.startDate && errors.startDate}
                      fullWidth
                    />
                  )}
                />
              )}
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
              {eventViewMode ? (
                <DateTimePicker
                  label="End date"
                  value={triggeredEvent?.end}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              ) : (
                <DateTimePicker
                  label="End date"
                  value={values.endDate}
                  onChange={(newValue) => setFieldValue('endDate', newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...getFieldProps('endDate')}
                      error={Boolean(touched.endDate && errors.endDate)}
                      helperText={touched.endDate && errors.endDate}
                      fullWidth
                    />
                  )}
                />
              )}
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={closeHandler}>
          Cancel
        </Button>
        {!eventViewMode && (
          <LoadingButton variant="contained" loading={isSubmitting} disabled={!dirty} onClick={handleSubmit}>
            Create
          </LoadingButton>
        )}
      </DialogActions>
    </DialogAnimate>
  );
}

export default Event;
