import {
  SET_JOIN_FEEDBACK_GROUP_ID,
  SET_JOIN_FEEDBACK_GROUP_PASSWORD,
  JOIN_FEEDBACK_GROUP,
} from "../actionTypes";

const initialJoinFeedBackGroupFormState = {
  joinFeedbackGroupId: '',
  joinFeedbackGroupPassword: '',
  joiningFeedbackGroup: false,
};

export default function (state = initialJoinFeedBackGroupFormState, action) {
  switch (action.type) {
    case SET_JOIN_FEEDBACK_GROUP_ID:
      return { ...state, joinFeedbackGroupId: action.payload };
    case SET_JOIN_FEEDBACK_GROUP_PASSWORD:
      return { ...state, joinFeedbackGroupPassword: action.payload };
    case JOIN_FEEDBACK_GROUP:
      console.log(`joining feedback with id: ${state.joinFeedbackGroupId}`)
      return { ...state, joiningFeedbackGroup: true };
    default:
      return state;
  }
}
