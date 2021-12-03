import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import _ from 'lodash';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
// material
import { Tab, Box, Card, Tabs, Container, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// contexts
import { ClassesContext } from '../contexts';
// routes
import { PATH_APP } from '../routes/paths';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import Cover from '../components/Cover';
import ClassTimeline from '../components/_class-details/ClassTimeline';
import AddStudent from '../components/_class-details/AddStudent';
import ClassActivities from '../components/_class-details/ClassActivities';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

function ClassDetails() {
  const { classId } = useParams();
  const classes = useContext(ClassesContext).classesState[0];
  const [classDetails, setClassDetails] = useState({});
  const [currentTab, setCurrentTab] = useState('timeline');
  const [addStudent, triggerAddStudent] = useState(false);

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    if (classId) {
      setClassDetails(_.find(classes, (o) => o.id === parseInt(classId, 10)));
    }
  }, [classId, classes]);

  const TABS = [
    {
      value: 'timeline',
      icon: <Icon icon="clarity:timeline-line" width={20} height={20} />,
      component: <ClassTimeline classDetails={classDetails} />
    },
    {
      value: 'activites',
      icon: <Icon icon="healthicons:i-note-action" width={20} height={20} />,
      component: <ClassActivities classDetails={classDetails} />
    }
  ];

  return (
    <Page title={`Class details: ${classDetails?.class_name}`}>
      <Container>
        <HeaderBreadcrumbs
          heading={classDetails?.class_name}
          links={[
            { name: 'Dashboard', href: PATH_APP.root },
            { name: 'Classes', href: PATH_APP.dashboard.management.classes },
            { name: classDetails?.class_name }
          ]}
          action={
            <Button startIcon={<Icon icon="carbon:add" />} variant="contained" onClick={() => triggerAddStudent(true)}>
              Add student
            </Button>
          }
        />
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative'
          }}
        >
          <Cover
            data={{
              cover: classDetails?.class_cover,
              name: classDetails?.class_name,
              createdAt: classDetails?.created_at
            }}
          />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
            >
              {TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}

        <AddStudent
          isTriggered={addStudent}
          closeHandler={() => triggerAddStudent(false)}
          classDetails={classDetails}
        />
      </Container>
    </Page>
  );
}

export default ClassDetails;
