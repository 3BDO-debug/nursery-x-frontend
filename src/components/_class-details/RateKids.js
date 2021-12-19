import React, { useState } from 'react';
import PropTypes from 'prop-types';
// material
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography
} from '@mui/material';
// componenets
import { DialogAnimate, varSlideInUp } from '../animate';
import RateKidForm from './RateKidForm';

RateKids.propTypes = {
  isTriggered: PropTypes.bool,
  closeHandler: PropTypes.func,
  classDetails: PropTypes.object,
  triggeredActivity: PropTypes.object
};

function RateKids({ isTriggered, closeHandler, classDetails, triggeredActivity }) {
  const [triggeredKid, setTriggeredKid] = useState({});

  const [rateKidForm, triggerRateKidForm] = useState(false);

  return (
    <DialogAnimate open={isTriggered} onClose={closeHandler} animate={varSlideInUp}>
      <DialogTitle>Rate kids</DialogTitle>
      <DialogContent>
        <Paper component="div" sx={{ marginTop: 2 }}>
          <List>
            {classDetails?.class_members_data?.map((classMember) => (
              <ListItem
                key={classMember.id}
                secondaryAction={
                  <Button
                    onClick={() => {
                      setTriggeredKid(classMember);
                      triggerRateKidForm(true);
                    }}
                  >
                    Rate
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar src={classMember.profile_pic} alt={classMember.name} />
                </ListItemAvatar>
                <ListItemText primary={<Typography variant="subtitle2">{classMember.name}</Typography>} />
              </ListItem>
            ))}
          </List>
        </Paper>
        <RateKidForm
          isTriggered={rateKidForm}
          closeHandler={() => triggerRateKidForm(false)}
          triggeredActivity={triggeredActivity}
          triggeredKid={triggeredKid}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
      </DialogActions>
    </DialogAnimate>
  );
}

export default RateKids;
