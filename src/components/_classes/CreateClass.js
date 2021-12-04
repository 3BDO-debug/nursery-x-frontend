import { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Button,
  Grid,
  TextField,
  FormHelperText
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// contexts
import { ClassesContext } from '../../contexts';
// apis
import { classesAdder } from '../../_apis_/classes';
// components
import { DialogAnimate, varSlideInUp } from '../animate';
import { UploadSingleFile } from '../upload';
import { MIconButton } from '../@material-extend';

CreateClass.propTypes = {
  isTriggered: PropTypes.bool,
  closeHandler: PropTypes.func
};

function CreateClass({ isTriggered, closeHandler }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [classCover, setClassCover] = useState({});

  const setClasses = useContext(ClassesContext).classesState[1];

  const formik = useFormik({
    initialValues: {
      className: '',
      classCover: null
    },
    validationSchema: Yup.object().shape({
      className: Yup.string().required('Class name is required'),
      classCover: Yup.mixed().required('Class cover image is required')
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const data = new FormData();
      data.append('className', values.className);
      data.append('classCover', values.classCover);

      await classesAdder(data)
        .then((classesResponse) => {
          setClasses(classesResponse);
          enqueueSnackbar('Class successfully created', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
          closeHandler();
        })
        .catch(() =>
          enqueueSnackbar('Something wrong happened and we couldnt create the class.', {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          })
        );

      setSubmitting(false);
      resetForm();
    }
  });

  const { handleSubmit, values, setFieldValue, getFieldProps, isSubmitting, dirty, touched, errors } = formik;

  const handleFileDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setClassCover({
          ...file,
          preview: URL.createObjectURL(file)
        });
        setFieldValue('classCover', file);
      }
    },
    [setFieldValue]
  );

  return (
    <DialogAnimate open={isTriggered} onClose={closeHandler} animate={varSlideInUp}>
      <DialogTitle>Create new class</DialogTitle>
      <DialogContent>
        <Paper onSubmit={handleSubmit} component="form" sx={{ paddingTop: 5 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TextField
                label="Class name"
                value={values.className}
                onChange={(event) => setFieldValue('className', event.target.value)}
                {...getFieldProps('className')}
                error={Boolean(touched.className && errors.className)}
                helperText={touched.className && errors.className}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <UploadSingleFile file={classCover} onDrop={handleFileDrop} />
              <FormHelperText error sx={{ px: 2 }}>
                {touched.classCover && errors.classCover}
              </FormHelperText>
            </Grid>
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>cancel</Button>
        <LoadingButton loading={isSubmitting} disabled={!dirty} onClick={handleSubmit} variant="contained">
          save
        </LoadingButton>
      </DialogActions>
    </DialogAnimate>
  );
}

export default CreateClass;
