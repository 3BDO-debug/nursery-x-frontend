import axiosInstance from './axios';

export const kidsFetcher = async () => axiosInstance.get('/kids/kids-data').then((response) => response.data);

export const kidsAdder = async (requestData) =>
  axiosInstance({ method: 'post', url: '/kids/kids-data', data: requestData }).then((response) => response.data);
