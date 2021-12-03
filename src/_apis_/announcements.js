import axiosInstance from './axios';

export const announcementsFetcher = async () =>
  axiosInstance.get('/announcements/announcements-data').then((response) => response.data);

export const announcementAdder = async (requestData) =>
  axiosInstance({ method: 'post', url: '/announcements/announcements-data', data: requestData }).then(
    (response) => response.data
  );
