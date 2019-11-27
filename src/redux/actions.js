import {
  FIND_ANONYMOUS_FEEDBACK_GROUP,
  CREATE_FEEDBACK_GROUP,
  FIND_ANONYMOUS_FEEDBACK_GROUP_SUCCESS,
  FIND_ANONYMOUS_FEEDBACK_GROUP_ERROR,
  CREATE_FEEDBACK_GROUP_SUCCESS,
  CREATE_FEEDBACK_GROUP_ERROR,
  INVALIDATE_ANONYMOUS_FEEDBACK_GROUP,
  FIND_MASTER_FEEDBACK_GROUP_ERROR,
  FIND_MASTER_FEEDBACK_GROUP,
  INVALIDATE_MASTER_FEEDBACK_GROUP,
  FIND_MASTER_FEEDBACK_GROUP_SUCCESS,
} from "./actionTypes";

export const findAnonymousFeedbackGroup = (feedbackerId) => ({
  type: FIND_ANONYMOUS_FEEDBACK_GROUP,
  payload: { feedbackerId }
});

export const findAnonymousFeedbackGroupSuccess = feedbackGroup => ({
  type: FIND_ANONYMOUS_FEEDBACK_GROUP_SUCCESS,
  payload: feedbackGroup,
});

export const findAnonymousFeedbackGroupError = error => ({
  type: FIND_ANONYMOUS_FEEDBACK_GROUP_ERROR,
  payload: error,
});

export const invalidateAnonymousFeedbackGroup = () => ({
  type: INVALIDATE_ANONYMOUS_FEEDBACK_GROUP,
});

export const findMasterFeedbackGroup = (feedbackerId, password) => ({
  type: FIND_MASTER_FEEDBACK_GROUP,
  payload: {
    feedbackerId,
    password,
  }
});

export const findMasterFeedbackGroupSuccess = feedbackGroup => ({
  type: FIND_MASTER_FEEDBACK_GROUP_SUCCESS,
  payload: feedbackGroup,
});

export const findMasterFeedbackGroupError = error => ({
  type: FIND_MASTER_FEEDBACK_GROUP_ERROR,
  payload: error,
});

export const invalidateMasterFeedbackGroup = () => ({
  type: INVALIDATE_MASTER_FEEDBACK_GROUP,
});

export const createFeedbackGroup = (password, repeatPassword) => ({
  type: CREATE_FEEDBACK_GROUP,
  payload: {
    password,
    repeatPassword,
  }
});

export const createFeedbackGroupSuccess = (feedbackGroup) => ({
  type: CREATE_FEEDBACK_GROUP_SUCCESS,
  payload: feedbackGroup,
});

export const createFeedbackGroupError = (error) => ({
  type: CREATE_FEEDBACK_GROUP_ERROR,
  payload: error,
});
