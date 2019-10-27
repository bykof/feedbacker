import {
  FIND_ANONYMOUS_FEEDBACK_GROUP,
  CREATE_FEEDBACK_GROUP,
  FIND_ANONYMOUS_FEEDBACK_GROUP_SUCCESS,
  FIND_ANONYMOUS_FEEDBACK_GROUP_ERROR,
  CREATE_FEEDBACK_GROUP_SUCCESS,
  CREATE_FEEDBACK_GROUP_ERROR,
  INVALIDATE_ANONYMOUS_FEEDBACK_GROUP,
} from "./actionTypes";

export const findAnonymousFeedbackGroup = (feedbackerId, password) => ({
  type: FIND_ANONYMOUS_FEEDBACK_GROUP,
  payload: {
    feedbackerId,
    password,
  }
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

export const createFeedbackGroup = (password, masterPassword) => ({
  type: CREATE_FEEDBACK_GROUP,
  payload: {
    password,
    masterPassword,
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
