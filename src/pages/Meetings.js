import React, { useRef, useState, useEffect, useContext } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import interactionPlugin from '@fullcalendar/interaction';
// material
import { useTheme } from '@mui/material/styles';
import { Container, Card, useMediaQuery } from '@mui/material';
// hooks
import useSettings from '../hooks/useSettings';
// routes
import { PATH_APP } from '../routes/paths';
// contexts
import { MeetingsContext } from '../contexts';
// utils
import { meetingsDataFormatter } from '../utils/mock-data/meetings';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { CalendarStyle, CalendarToolbar } from '../components/calendar';
import Event from '../components/_meetings/Event';

function Meetings() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const calendarRef = useRef(null);
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState(isMobile ? 'listWeek' : 'dayGridMonth');
  const meetings = useContext(MeetingsContext).meetingsState[0];

  const [formatedMeetingsData, setFormatedMeetingsData] = useState([]);

  const [dateRangeSelection, setDateRangeSelection] = useState({});
  const [event, triggerEvent] = useState(false);
  const [eventViewMode, setEventViewMode] = useState(false);
  const [triggeredEvent, setTriggeredEvent] = useState({});

  useEffect(() => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = isMobile ? 'listWeek' : 'dayGridMonth';
      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [isMobile]);

  const handleChangeView = (newView) => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.changeView(newView);
      setView(newView);
    }
  };

  const handleClickDatePrev = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickToday = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  };

  const handleClickDateNext = () => {
    const calendarEl = calendarRef.current;
    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  };

  const handleEventClick = (info) => {
    setEventViewMode(true);
    setTriggeredEvent(info.event);
    triggerEvent(true);
  };

  const handleSelect = (arg) => {
    setEventViewMode(false);
    setDateRangeSelection(arg);
    triggerEvent(true);
  };

  useEffect(() => {
    setFormatedMeetingsData(meetingsDataFormatter(meetings));
  }, [meetings]);

  return (
    <Page title="Meetings">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Meetings"
          links={[{ name: 'Dashboard', href: PATH_APP.root }, { name: 'Meetings' }]}
        />

        <Card>
          <CalendarStyle>
            <CalendarToolbar
              date={date}
              view={view}
              onNextDate={handleClickDateNext}
              onPrevDate={handleClickDatePrev}
              onToday={handleClickToday}
              onChangeView={handleChangeView}
            />
            <FullCalendar
              weekends
              droppable
              selectable
              events={formatedMeetingsData}
              eventTextColor="rgb(0, 171, 85)"
              ref={calendarRef}
              rerenderDelay={10}
              initialDate={date}
              initialView={view}
              dayMaxEventRows={3}
              eventDisplay="block"
              headerToolbar={false}
              select={handleSelect}
              eventClick={handleEventClick}
              height={isMobile ? 'auto' : 720}
              plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
            />
          </CalendarStyle>
          <Event
            isTriggered={event}
            closeHandler={() => triggerEvent(false)}
            dateRangeSelection={dateRangeSelection}
            eventViewMode={eventViewMode}
            triggeredEvent={triggeredEvent}
          />
        </Card>
      </Container>
    </Page>
  );
}

export default Meetings;
