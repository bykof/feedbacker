import {
  SET_JOIN_FEEDBACK_GROUP_ID,
  SET_JOIN_FEEDBACK_GROUP_PASSWORD,
  JOIN_FEEDBACK_GROUP,
  CREATE_FEEDBACK_GROUP,
  SET_CREATE_FEEDBACK_GROUP_PASSWORD,
  JOIN_FEEDBACK_GROUP_SUCCESS,
  JOIN_FEEDBACK_GROUP_ERROR,
  RESET_JOIN_FEEDBACKGROUP_FORM,
} from "./actionTypes";

export const setJoinFeedbackGroupId = joinFeedbackGroupId => ({
  type: SET_JOIN_FEEDBACK_GROUP_ID,
  payload: joinFeedbackGroupId,
})

export const setJoinFeedbackGroupPassword = joinFeedbackGroupPassword => ({
  type: SET_JOIN_FEEDBACK_GROUP_PASSWORD,
  payload: joinFeedbackGroupPassword,
});

export const joinFeedbackGroup = () => ({
  type: JOIN_FEEDBACK_GROUP,
});

export const joinFeedbackGroupSuccess = feedbackGroup => ({
  type: JOIN_FEEDBACK_GROUP_SUCCESS,
  payload: feedbackGroup,
});


export const joinFeedbackGroupError = error => ({
  type: JOIN_FEEDBACK_GROUP_ERROR,
  payload: error,
});

export const resetFeedbackGroupForm = () => ({
  type: RESET_JOIN_FEEDBACKGROUP_FORM,
});

export const createFeedbackGroup = () => ({
  type: CREATE_FEEDBACK_GROUP,
});

export const setCreateFeedbackGroupPassword = createFeedbackGroupPassword => ({
  type: SET_CREATE_FEEDBACK_GROUP_PASSWORD,
  payload: createFeedbackGroupPassword,
});
