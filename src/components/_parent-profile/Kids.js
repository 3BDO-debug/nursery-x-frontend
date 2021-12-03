import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import { useParams } from 'react-router';
// material
import { Grid } from '@mui/material';
// contexts
import { KidsContext } from '../../contexts';
// components
import UserCard from '../UserCard';

function Kids() {
  const { parentId } = useParams();
  const kids = useContext(KidsContext).kidsState[0];

  const [parentKids, setParentKids] = useState([]);

  useEffect(() => {
    if (parentId) {
      setParentKids(_.filter(kids, (o) => o.parent_id === parseInt(parentId, 10)));
    }
  }, [kids, parentId]);

  return (
    <Grid container spacing={3}>
      {parentKids.map((kid) => (
        <Grid key={kid.id} item xs={12} sm={6} md={4} lg={4}>
          <UserCard user={kid} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Kids;
