import axiosInstance from './axios';

export const classesFetcher = async () =>
  axiosInstance.get('/activity-classes/activity-classes-data').then((response) => response.data);

export const classesAdder = async (requestData) =>
  axiosInstance({ method: 'post', url: '/activity-classes/activity-classes-data', data: requestData }).then(
    (response) => response.data
  );

export const classUpdater = async (requestData) =>
  axiosInstance({ method: 'put', url: '/activity-classes/activity-classes-data', data: requestData }).then(
    (response) => response.data
  );

export const classActivitiesFetcher = async (classId) =>
  axiosInstance.get(`/activity-classes/class-activities/${classId}`).then((response) => response.data);

export const classActivityAdder = async (classId, requestData) =>
  axiosInstance({ method: 'post', url: `/activity-classes/class-activities/${classId}`, data: requestData }).then(
    (response) => response.data
  );

export const classActivityRatingsFetcher = async (kidId) =>
  axiosInstance.get(`/activity-classes/class-activity-ratings?kidId=${kidId}`).then((response) => response.data);

export const classActivityRatingAdder = async (requestData) =>
  axiosInstance({ method: 'post', url: '/activity-classes/class-activity-ratings', data: requestData }).then(
    (response) => response.data
  );

export const createClassPost = async (classId, requestData) =>
  axiosInstance({ method: 'post', url: `/activity-classes/class-posts/${classId}`, data: requestData }).then(
    (response) => response.data
  );

export const classPostsFetcher = async (classId) =>
  axiosInstance.get(`/activity-classes/class-posts/${classId}`).then((response) => response?.data);

export const createClassPostComment = async (classId, requestData) =>
  axiosInstance({ method: 'post', url: `/activity-classes/class-post-comments/${classId}`, data: requestData }).then(
    (response) => response.data
  );

export const classPostCommentsFetcher = async (classId) =>
  axiosInstance.get(`/activity-classes/class-post-comments/${classId}`).then((response) => response.data);
