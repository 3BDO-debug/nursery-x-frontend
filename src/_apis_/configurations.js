import axiosInstance from './axios';

export const userRolesFetcher = async () =>
  axiosInstance.get('/configurations/user-roles').then((response) => response.data);
