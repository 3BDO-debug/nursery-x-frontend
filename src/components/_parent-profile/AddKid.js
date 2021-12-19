import React, { useCallback, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import {
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Paper,
  Grid,
  Autocomplete,
  Chip,
  TextField,
  MenuItem,
  Typography,
  FormHelperText
} from '@mui/material';
import { LoadingButton, MobileDatePicker } from '@mui/lab';
// contexts
import { KidsContext } from '../../contexts';
// apis
import { kidsAdder } from '../../_apis_/kids';
// utils
import { fData } from '../../utils/formatNumber';
// components
import { DialogAnimate, varSlideInUp } from '../animate';
import { UploadAvatar, UploadSingleFile } from '../upload';
import { MIconButton } from '../@material-extend';

// ------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

// ------------------------------------------------------

AddKid.propTypes = {
  isTriggered: PropTypes.bool,
  closeHandler: PropTypes.func
};

function AddKid({ isTriggered, closeHandler }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { parentId } = useParams();

  const setKids = useContext(KidsContext).kidsState[1];

  const [attachment, setAttachment] = useState({});
  const [profilePic, setProfilePic] = useState(null);

  const formik = useFormik({
    initialValues: {
      parentId: parseInt(parentId && parentId, 10),
      name: '',
      profilePic: null,
      gender: '',
      birthDate: new Date(),
      hobbies: [],
      healthConditionNotes: '',
      attachment: null
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Kid name is required'),
      profilePic: Yup.mixed().required('Kid profile pic is required'),
      gender: Yup.string().required('Kid gender is required'),
      birthDate: Yup.date().required('Kid birth date is required'),
      healthConditionNotes: Yup.string().required('Kid health condition notes is required')
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      const data = new FormData();
      data.append('values', JSON.stringify(values));
      data.append('attachment', values.attachment);
      data.append('profilePic', values.profilePic);
      await kidsAdder(data)
        .then((kidsResponse) => {
          setKids(kidsResponse);
          enqueueSnackbar('Kid added successfully', {
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
      setAttachment({});
      setSubmitting(false);
      closeHandler();
    }
  });

  const { setFieldValue, values, dirty, isSubmitting, handleSubmit, touched, errors, getFieldProps } = formik;

  const handleAttachmentDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('attachment', file);
        setAttachment({
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  const handleProfilePicDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('profilePic', file);
        setProfilePic({
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <DialogAnimate open={isTriggered} onClose={closeHandler} animate={varSlideInUp}>
      <DialogTitle>Add kid</DialogTitle>
      <DialogContent>
        <Paper component="form" sx={{ paddingTop: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <UploadAvatar
                accept="image/*"
                file={profilePic}
                onDrop={handleProfilePicDrop}
                error={Boolean(touched.profilePic && errors.profilePic)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
              <FormHelperText error sx={{ px: 2 }} {...getFieldProps('profilePic')}>
                {touched.profilePic && errors.profilePic}
              </FormHelperText>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Name"
                value={values.name}
                onChange={(event) => setFieldValue('name', event.target.value)}
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <MobileDatePicker
                label="Birth date"
                inputFormat="MM/dd/yyyy"
                value={values.birthDate}
                onChange={(newValue) => setFieldValue('birthDate', newValue)}
                renderInput={(params) => <TextField fullWidth {...params} />}
                error={Boolean(touched.birthDate && errors.birthDate)}
                helperText={touched.birthDate && errors.birthDate}
                maxDate={new Date()}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                select
                fullWidth
                label="Gender"
                value={values.gender}
                onChange={(event) => setFieldValue('gender', event.target.value)}
                {...getFieldProps('gender')}
                error={Boolean(touched.gender && errors.gender)}
                helperText={touched.gender && errors.gender}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Autocomplete
                multiple
                freeSolo
                fullWidth
                value={values.tags}
                onChange={(event, newValue) => {
                  setFieldValue('hobbies', newValue);
                }}
                options={TAGS_OPTION.map((option) => option)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                  ))
                }
                renderInput={(params) => <TextField label="Hobbies" {...params} />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Health condition notes"
                value={values.healthConditionNotes}
                onChange={(event) => setFieldValue('healthConditionNotes', event.target.value)}
                {...getFieldProps('healthConditionNotes')}
                error={Boolean(touched.healthConditionNotes && errors.healthConditionNotes)}
                helperText={touched.healthConditionNotes && errors.healthConditionNotes}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <UploadSingleFile onDrop={handleAttachmentDrop} file={attachment} />
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        <LoadingButton loading={isSubmitting} disabled={!dirty} onClick={handleSubmit} variant="contained">
          Save
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
}

export default AddKid;
