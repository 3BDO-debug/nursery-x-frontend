import axiosInstance from './axios';

export const messagesFetcher = async () =>
  axiosInstance.get('/messenger/messages-data').then((response) => response.data);

export const messageAdder = async (requestData) =>
  axiosInstance({ method: 'post', url: '/messenger/messages-data', data: requestData }).then(
    (response) => response.data
  );
