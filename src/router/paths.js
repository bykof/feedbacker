export const CREATE_FEEDBACK_GROUP_PATH = '/create';
export const FEEDBACKGROUP_WILDCARD_PATH = '/feedback/:feedbackId';
export const FEEDBACKGROUP_PATH = (feedbackGroupId) => {
  return `/feedback/${feedbackGroupId}`;
};
