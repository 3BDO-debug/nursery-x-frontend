import axiosInstance from './axios';

export const staffFetcher = async () => axiosInstance.get('/staff/staff-members').then((response) => response.data);

export const parentsFetcher = async () => axiosInstance.get('/parents/parents-data').then((response) => response.data);
