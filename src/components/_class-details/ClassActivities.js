import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
// material
import { Card, CardHeader, CardContent, Button } from '@mui/material';
// apis
import { classActivitiesFetcher } from '../../_apis_/classes';
// utils
import { activitiesTableColumns, activitiesTableData } from '../../utils/mock-data/activities';
// components
import MUIDataTable from '../mui-datatable/MUIDataTable';
import CreateActivity from './CreateActivity';
import RateKids from './RateKids';

ClassActivities.propTypes = {
  classDetails: PropTypes.object
};

function ClassActivities({ classDetails }) {
  const { classId } = useParams();

  const [triggeredActivity, setTriggeredActivity] = useState({});

  const [rateKids, triggerRateKids] = useState(false);

  const [createActivity, triggerCreateActivity] = useState(false);

  const [activitiesTableRows, setActivitiesTableRows] = useState([]);

  useEffect(() => {
    if (classId) {
      classActivitiesFetcher(classId)
        .then((classActivitiesResponse) => setActivitiesTableRows(activitiesTableData(classActivitiesResponse)))
        .catch((error) => console.log(error));
    }
  }, [classId]);

  return (
    <Card>
      <CardHeader
        title="Class activities"
        action={
          <Button
            onClick={() => triggerCreateActivity(true)}
            startIcon={<Icon icon="wpf:create-new" />}
            variant="contained"
          >
            Create activity
          </Button>
        }
      />
      <CardContent>
        <MUIDataTable
          columns={activitiesTableColumns(setTriggeredActivity, triggerRateKids)}
          data={activitiesTableRows}
          options={{ elevation: 0, selectableRows: false }}
        />
        <CreateActivity
          isTriggered={createActivity}
          closeHandler={() => triggerCreateActivity(false)}
          setClassActivities={setActivitiesTableRows}
          activitiesTableData={activitiesTableData}
          classId={classId}
        />
        <RateKids
          isTriggered={rateKids}
          closeHandler={() => triggerRateKids(false)}
          triggeredActivity={triggeredActivity}
          classDetails={classDetails}
        />
      </CardContent>
    </Card>
  );
}

export default ClassActivities;
