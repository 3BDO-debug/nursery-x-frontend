import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import {
  DialogTitle,
  DialogContent,
  Paper,
  Grid,
  TextField,
  DialogActions,
  Button,
  FormHelperText
} from '@mui/material';
import { LoadingButton, TimePicker } from '@mui/lab';
// apis
import { classActivityAdder } from '../../_apis_/classes';
// components
import { DialogAnimate, varSlideInUp } from '../animate';
import { UploadSingleFile } from '../upload';
import { MIconButton } from '../@material-extend';

CreateActivity.propTypes = {
  isTriggered: PropTypes.bool,
  closeHandler: PropTypes.func,
  setClassActivities: PropTypes.func,
  activitiesTableData: PropTypes.func,
  classId: PropTypes.number
};

function CreateActivity({ isTriggered, closeHandler, setClassActivities, activitiesTableData, classId }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [activityImgPreview, setActivityImgPreview] = useState(null);

  const formik = useFormik({
    initialValues: {
      activity: '',
      activityImg: null,
      startsAt: new Date().getTime()
    },
    validationSchema: Yup.object().shape({
      activity: Yup.string().required('Activity name is required'),
      activityImg: Yup.mixed().required('Activity image is required'),
      startsAt: Yup.date().required('Activity start time is required')
    }),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const data = new FormData();
      data.append('activity', values.activity);
      data.append('activityImg', values.activityImg);
      data.append('startsAt', new Date(values.startsAt).toLocaleString());

      classActivityAdder(classId, data)
        .then((classActivitiesResponse) => {
          setClassActivities(activitiesTableData(classActivitiesResponse));
          enqueueSnackbar('Class activity created successfully', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        })
        .catch((error) =>
          enqueueSnackbar(`Something wrong happened - ${error}`, {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          })
        );
      setActivityImgPreview(null);
      resetForm();
      setSubmitting(false);
      closeHandler();
    }
  });

  const { errors, dirty, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('activityImg', file);
        setActivityImgPreview({
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <DialogAnimate open={isTriggered} onClose={closeHandler} animate={varSlideInUp}>
      <DialogTitle>Create activity</DialogTitle>
      <DialogContent>
        <Paper component="form" sx={{ paddingTop: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Activity name"
                {...getFieldProps('activity')}
                error={Boolean(touched.activity && errors.activity)}
                helperText={touched.activity && errors.activity}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TimePicker
                label="Starts at"
                value={values.startsAt}
                onChange={(newValue) => setFieldValue('startsAt', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...getFieldProps('startsAt')}
                    error={Boolean(touched.startsAt && errors.startsAt)}
                    helperText={touched.startsAt && errors.startsAt}
                    fullWidth
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <UploadSingleFile file={activityImgPreview} onDrop={handleDrop} />
              <FormHelperText error sx={{ px: 2 }} {...getFieldProps('activityImg')}>
                {touched.activityImg && errors.activityImg}
              </FormHelperText>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        <LoadingButton
          type="submit"
          variant="contained"
          disabled={!dirty}
          loading={isSubmitting}
          onClick={handleSubmit}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
}

export default CreateActivity;
