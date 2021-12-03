import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router';
// material
import { Card, CardHeader, CardContent, CardActions, TextField, Stack, IconButton } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { UploadSingleFile } from '../upload';
import { MotionInView, varFadeIn } from '../animate';
// apis
import { createClassPost } from '../../_apis_/classes';
// components
import { MIconButton } from '../@material-extend';

CreatePost.propTypes = {
  setClassPosts: PropTypes.func
};

function CreatePost({ setClassPosts }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [attachment, setAttachment] = useState(null);
  const fileInput = useRef();
  const { classId } = useParams();

  const formik = useFormik({
    initialValues: {
      postBody: '',
      postAttachment: null
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      const data = new FormData();
      if (values.postBody !== '') {
        data.append('postBody', values.postBody);
      }

      if (values.postAttachment) {
        data.append('postAttachment', values.postAttachment);
      }

      enqueueSnackbar('Posting...', {
        variant: 'warning',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });

      createClassPost(classId, data)
        .then((classPostsResponse) => {
          setClassPosts(classPostsResponse);
          enqueueSnackbar('Post created successfully', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        })
        .catch(() =>
          enqueueSnackbar('Something wrong happened.', {
            variant: 'error',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          })
        );

      resetForm();
      setAttachment(null);
      setSubmitting(false);
    }
  });

  const { values, setFieldValue, getFieldProps, isSubmitting, handleSubmit } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('postAttachment', file);
        setAttachment({
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader title="Create post" />
      <CardContent>
        <TextField
          value={values.postBody}
          onChange={(event) => setFieldValue('postBody', event.target.value)}
          {...getFieldProps('postBody')}
          label="What's in your mind ?"
          rows={3}
          fullWidth
          multiline
        />
        <input
          ref={fileInput}
          type="file"
          style={{ display: 'none' }}
          onChange={(event) => handleDrop(event.target.files)}
        />
        {attachment && (
          <MotionInView variants={varFadeIn}>
            <UploadSingleFile file={attachment} sx={{ mt: 3 }} />
          </MotionInView>
        )}
      </CardContent>
      <CardActions>
        <Stack direction="row" alignItems="center" width="100%">
          <IconButton onClick={() => fileInput.current.click()}>
            <AttachFileIcon />
          </IconButton>
          <IconButton disabled={isSubmitting} onClick={handleSubmit} sx={{ marginLeft: 'auto', order: '2' }}>
            <SendIcon />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
}

export default CreatePost;
