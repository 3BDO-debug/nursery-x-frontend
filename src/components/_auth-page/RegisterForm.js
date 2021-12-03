import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { useNavigate } from 'react-router';
// material
import {
  Box,
  Card,
  TextField,
  Grid,
  MenuItem,
  FormHelperText,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
// apis
import { registerRequest } from '../../_apis_/auth';
import { userRolesFetcher } from '../../_apis_/configurations';
// utils
import { fData } from '../../utils/formatNumber';
// components
import RegisterStepper from './RegisterStepper';
import { UploadAvatar } from '../upload';
import { MotionInView, varSlideInLeft, varSlideInRight, varSlideInUp, varZoomIn } from '../animate';
import { MIconButton } from '../@material-extend';

function RegisterForm() {
  const [filePreview, setFilePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [userRoles, setUserRoles] = useState([]);

  const navigate = useNavigate();

  const registerSchema = Yup.object().shape({
    accountType: Yup.string().required('Account type is required'),
    role: Yup.string().optional('Role is required'),
    qualification: Yup.string().optional('Qualification is required'),
    job: Yup.string().optional('Job is required'),
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    govId: Yup.number().required('GOV ID is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    profilePic: Yup.mixed().required('Profile pic is required')
  });

  const formik = useFormik({
    initialValues: {
      accountType: '',
      role: '',
      qualification: '',
      job: '',
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      govId: '',
      phoneNumber: '',
      address: '',
      password: '',
      profilePic: null
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      const data = new FormData();
      data.append('values', JSON.stringify(values));
      data.append('files', values.profilePic);
      await registerRequest(data)
        .then(() => {
          navigate('/auth/login');
          enqueueSnackbar('Account created', {
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
    }
  });

  const { errors, dirty, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('profilePic', file);
        setFilePreview({
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  useEffect(() => {
    userRolesFetcher()
      .then((userRolesResponse) => setUserRoles(userRolesResponse))
      .catch((error) => console.log('user-roles', error));
  }, []);

  const steps = [
    {
      id: 0,
      label: 'Account type',
      content: (
        <Box padding="30px">
          <MotionInView variants={varSlideInLeft}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  select
                  label="Account type"
                  {...getFieldProps('accountType')}
                  error={Boolean(touched.accountType && errors.accountType)}
                  helperText={touched.accountType && errors.accountType}
                  value={values.accountType}
                  onChange={(event) => setFieldValue('accountType', event.target.value)}
                >
                  <MenuItem value="parent">Parent</MenuItem>
                  <MenuItem value="staff-member">Staff member</MenuItem>
                </TextField>
              </Grid>
              {values.accountType === 'staff-member' && (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <MotionInView variants={varSlideInLeft}>
                    <TextField
                      fullWidth
                      select
                      label="Role"
                      {...getFieldProps('role')}
                      error={Boolean(touched.role && errors.role)}
                      helperText={touched.role && errors.role}
                      value={values.role}
                      onChange={(event) => setFieldValue('role', event.target.value)}
                    >
                      {userRoles.map((userRole) => (
                        <MenuItem value={userRole.role} key={userRole.id}>
                          {userRole.role}
                        </MenuItem>
                      ))}
                    </TextField>
                  </MotionInView>
                </Grid>
              )}
              {values.accountType === 'parent' && (
                <>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MotionInView variants={varSlideInLeft}>
                      <TextField
                        label="Qualification"
                        value={values.qualification}
                        onChange={(event) => setFieldValue('qualification', event.target.value)}
                        {...getFieldProps('qualification')}
                        error={Boolean(touched.qualification && errors.qualification)}
                        helperText={touched.qualification && errors.qualification}
                        fullWidth
                      />
                    </MotionInView>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <MotionInView variants={varSlideInLeft}>
                      <TextField
                        label="job"
                        value={values.job}
                        onChange={(event) => setFieldValue('job', event.target.value)}
                        {...getFieldProps('job')}
                        error={Boolean(touched.job && errors.job)}
                        helperText={touched.job && errors.job}
                        fullWidth
                      />
                    </MotionInView>
                  </Grid>
                </>
              )}
            </Grid>
          </MotionInView>
        </Box>
      )
    },
    {
      id: 1,
      label: 'Account info',
      content: (
        <Box padding="30px">
          <MotionInView variants={varSlideInUp}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="First name"
                  fullWidth
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  value={values.firstName}
                  onChange={(event) => setFieldValue('firstName', event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Last name"
                  fullWidth
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  value={values.lastName}
                  onChange={(event) => setFieldValue('lastName', event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Username"
                  fullWidth
                  {...getFieldProps('username')}
                  error={Boolean(touched.username && errors.username)}
                  helperText={touched.username && errors.username}
                  value={values.username}
                  onChange={(event) => setFieldValue('username', event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Email"
                  fullWidth
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  value={values.email}
                  onChange={(event) => setFieldValue('email', event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  label="GOV ID"
                  fullWidth
                  {...getFieldProps('govId')}
                  error={Boolean(touched.govId && errors.govId)}
                  helperText={touched.govId && errors.govId}
                  value={values.govId}
                  onChange={(event) => setFieldValue('govId', event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Phone number"
                  fullWidth
                  {...getFieldProps('phoneNumber')}
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  value={values.phoneNumber}
                  onChange={(event) => setFieldValue('phoneNumber', event.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Address"
                  fullWidth
                  {...getFieldProps('address')}
                  error={Boolean(touched.address && errors.address)}
                  helperText={touched.address && errors.address}
                  value={values.address}
                  onChange={(event) => setFieldValue('address', event.target.value)}
                />
              </Grid>
            </Grid>
          </MotionInView>
        </Box>
      )
    },
    {
      id: 2,
      label: 'Account credentials',
      content: (
        <Box padding="30px">
          <MotionInView variants={varSlideInRight}>
            <TextField
              fullWidth
              value={values.password}
              onChange={(event) => setFieldValue('password', event.target.value)}
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </MotionInView>
        </Box>
      )
    },
    {
      id: 3,
      label: 'Profile photo',
      content: (
        <Box padding="30px">
          <MotionInView variants={varZoomIn}>
            <UploadAvatar
              accept="image/*"
              file={filePreview}
              onDrop={handleDrop}
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
          </MotionInView>
        </Box>
      )
    }
  ];

  return (
    <Card sx={{ p: 3 }}>
      <RegisterStepper steps={steps} submitHandler={handleSubmit} dirty={dirty} isSubmitting={isSubmitting} />
    </Card>
  );
}

export default RegisterForm;
