import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import {
  Card,
  CardHeader,
  CardContent,
  InputBase,
  CardActions,
  Avatar,
  Container,
  Grid,
  Paper,
  Stack,
  IconButton,
  Box,
  Typography,
  CircularProgress
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// apis
import { mainUrl } from '../../_apis_/axios';
import { classPostCommentsFetcher, createClassPostComment } from '../../_apis_/classes';
// contexts
import { AuthContext } from '../../contexts';
// components
import PostComment from './PostComment';
import Scrollbar from '../Scrollbar';
import { MIconButton } from '../@material-extend';

PostCard.propTypes = {
  post: PropTypes.object
};

function PostCard({ post }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [comments, setComments] = useState([]);
  const user = useContext(AuthContext).userState[0];

  const formik = useFormik({
    initialValues: {
      comment: ''
    },
    onSubmit: (values, { resetForm, setSubmitting }) => {
      enqueueSnackbar('Commenting...', {
        variant: 'warning',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
      const data = new FormData();
      data.append('comment', values.comment);
      createClassPostComment(post?.id, data)
        .then((commentsResponse) => {
          setComments(commentsResponse);
          enqueueSnackbar('Commented successfully', {
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
      setSubmitting(false);
      resetForm();
    }
  });

  useEffect(() => {
    if (post) {
      classPostCommentsFetcher(post?.id)
        .then((commentsResponse) => setComments(commentsResponse))
        .catch((error) => console.log(error));
    }
  }, [post]);

  const { dirty, isSubmitting, handleSubmit, setFieldValue, values } = formik;

  return (
    <Card sx={{ mt: 2 }}>
      <CardHeader
        avatar={<Avatar src={`${mainUrl}${post.created_by_profile}`} alt={post.created_by_name} />}
        title={post.created_by_name}
        subheader={new Date(post.created_at).toLocaleString()}
      />
      <CardContent>
        <Container>
          <Grid container spacing={5}>
            {post.post_body && (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="body1">{post.post_body}</Typography>
              </Grid>
            )}
            {post.post_attachment && (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Paper
                  component="img"
                  src={`${mainUrl}${post.post_attachment}`}
                  alt="post attachment"
                  sx={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="subtitle1">Comments ({comments.length})</Typography>
              <Box component="div">
                <Scrollbar
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '10px',
                    maxHeight: '400px',
                    width: '100%'
                  }}
                >
                  {comments.length === 0 ? (
                    <Typography variant="subtitle2" sx={{ paddingTop: 2 }} textAlign="center">
                      No comments
                    </Typography>
                  ) : (
                    comments.map((comment, index) => <PostComment key={index} comment={comment} />)
                  )}
                </Scrollbar>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </CardContent>
      <CardActions>
        <Stack direction="row" alignItems="center" padding={3} width="100%">
          <Avatar src={`${mainUrl}${user?.profile_pic}`} />
          <InputBase
            value={values.comment}
            onChange={(event) => setFieldValue('comment', event.target.value)}
            placeholder="Write a comment.."
            sx={{ flexGrow: 1, marginLeft: 2, border: '1px solid lightgray', borderRadius: '8px', paddingLeft: 2 }}
            endAdornment={
              <IconButton onClick={handleSubmit} disabled={!dirty}>
                {isSubmitting ? <CircularProgress /> : <SendIcon />}
              </IconButton>
            }
          />
        </Stack>
      </CardActions>
    </Card>
  );
}

export default PostCard;
