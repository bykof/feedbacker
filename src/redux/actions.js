import {
  SET_JOIN_FEEDBACK_GROUP_ID,
  SET_JOIN_FEEDBACK_GROUP_PASSWORD,
  JOIN_FEEDBACK_GROUP,
  CREATE_FEEDBACK_GROUP,
  SET_CREATE_FEEDBACK_GROUP_PASSWORD,
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

export const createFeedbackGroup = () => ({
  type: CREATE_FEEDBACK_GROUP,
});

export const setCreateFeedbackGroupPassword = createFeedbackGroupPassword => ({
  type: SET_CREATE_FEEDBACK_GROUP_PASSWORD,
  payload: createFeedbackGroupPassword,
});
