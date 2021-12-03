import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import {
  DialogContent,
  Paper,
  Grid,
  TextField,
  Rating,
  DialogActions,
  Button,
  DialogTitle,
  FormHelperText
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// apis
import { classActivityRatingAdder } from '../../_apis_/classes';
// components
import { DialogAnimate, varSlideInUp } from '../animate';
import { MIconButton } from '../@material-extend';

RateKidForm.propTypes = {
  isTriggered: PropTypes.bool,
  closeHandler: PropTypes.func,
  triggeredKid: PropTypes.object,
  triggeredActivity: PropTypes.object
};

function RateKidForm({ isTriggered, closeHandler, triggeredKid, triggeredActivity }) {
  const { classId } = useParams();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      notes: '',
      rating: 0
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const data = new FormData();
      data.append('classId', classId);
      data.append('kidId', triggeredKid?.id);
      data.append('activityId', triggeredActivity?.id);
      data.append('notes', values.notes);
      data.append('rating', values.rating);

      classActivityRatingAdder(data)
        .then(() =>
          enqueueSnackbar('Activity rating added successfully', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          })
        )
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

  const { setFieldValue, values, getFieldProps, isSubmitting, dirty, errors, touched, handleSubmit } = formik;

  return (
    <DialogAnimate animate={varSlideInUp} open={isTriggered} onClose={closeHandler}>
      <DialogTitle>Rate {triggeredKid?.name}</DialogTitle>
      <DialogContent>
        <Paper component="form" sx={{ marginTop: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                rows={3}
                label="Notes"
                value={values.notes}
                onChange={(event) => setFieldValue('notes', event.target.value)}
                {...getFieldProps('notes')}
                error={Boolean(touched.notes && errors.notes)}
                helperText={touched.notes && errors.notes}
                multiline
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ textAlign: 'center' }}>
              <Rating value={values.rating} onChange={(event, newValue) => setFieldValue('rating', newValue)} />
              <FormHelperText sx={{ px: 2 }} error>
                {errors.rating}
              </FormHelperText>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={closeHandler}>
          Cancel
        </Button>
        <LoadingButton onClick={handleSubmit} disabled={!dirty} loading={isSubmitting} variant="contained">
          Save
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
}

export default RateKidForm;
