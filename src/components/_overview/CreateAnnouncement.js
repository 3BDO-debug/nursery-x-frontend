import React, { useState, useCallback, useContext } from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Button,
  TextField,
  Grid,
  FormHelperText,
  FormControlLabel,
  Switch
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// context
import { AnnouncementsContext } from '../../contexts';
// apis
import { announcementAdder } from '../../_apis_/announcements';
// componenets
import { DialogAnimate, varSlideInUp } from '../animate';
import { UploadSingleFile } from '../upload';
import { QuillEditor } from '../editor';
import { MIconButton } from '../@material-extend';

CreateAnnouncement.propTypes = {
  isTriggered: PropTypes.bool,
  closeHandler: PropTypes.func
};

function CreateAnnouncement({ isTriggered, closeHandler }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [coverPreview, setCoverPreview] = useState({});

  const setAnnouncements = useContext(AnnouncementsContext).announcementsState[1];

  const formik = useFormik({
    initialValues: {
      title: '',
      body: '',
      isFeatured: false,
      cover: null
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      body: Yup.string().required('Body is required'),
      cover: Yup.mixed().required('Cover is required')
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const data = new FormData();
      data.append('title', values.title);
      data.append('body', values.body);
      data.append('isFeatured', values.isFeatured ? 'isFeatured' : '');
      data.append('cover', values.cover);

      announcementAdder(data)
        .then((announcementsResponse) => {
          setAnnouncements(announcementsResponse);
          enqueueSnackbar('Announcement posted successfully', {
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
      setCoverPreview({});
      setSubmitting(false);
      closeHandler();
    }
  });

  const { setFieldValue, values, getFieldProps, isSubmitting, dirty, touched, errors, handleSubmit } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('cover', file);
        setCoverPreview({
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <DialogAnimate animate={varSlideInUp} open={isTriggered} onClose={closeHandler}>
      <DialogTitle>Create announcement</DialogTitle>
      <DialogContent>
        <Paper sx={{ paddingTop: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Title"
                value={values.title}
                onChange={(event) => setFieldValue('title', event.target.value)}
                {...getFieldProps('title')}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && errors.title}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <QuillEditor
                id="announcement-body"
                value={values.body}
                onChange={(value) => setFieldValue('body', value)}
              />
              <FormHelperText error sx={{ px: 2 }}>
                {touched.body && errors.body}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <FormControlLabel
                control={
                  <Switch
                    value={values.isFeatured}
                    onChange={(event) => setFieldValue('isFeatured', event.target.checked)}
                  />
                }
                label="Mark as featured"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <UploadSingleFile file={coverPreview} onDrop={handleDrop} />
              <FormHelperText error sx={{ px: 2 }}>
                {touched.cover && errors.cover}
              </FormHelperText>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        <LoadingButton
          variant="contained"
          disabled={!dirty}
          loading={isSubmitting}
          onClick={handleSubmit}
          endIcon={<Icon icon="fluent:send-16-filled" />}
        >
          Post
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
}

export default CreateAnnouncement;
