import axiosInstance from './axios';

export const meetingsFetcher = async () =>
  axiosInstance.get('/meetings/meetings-data').then((response) => response.data);

export const meetingAdder = async (requestData) =>
  axiosInstance({ method: 'post', url: '/meetings/meetings-data', data: requestData }).then(
    (response) => response.data
  );
