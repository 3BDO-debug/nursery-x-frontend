export const meetingsDataFormatter = (meetings) => {
  const meetingsData = meetings.map((meeting) => ({
    title: meeting.title,
    start: new Date(Date.parse(meeting.start_date)),
    end: new Date(Date.parse(meeting.end_date)),
    description: meeting.description
  }));
  return meetingsData;
};
