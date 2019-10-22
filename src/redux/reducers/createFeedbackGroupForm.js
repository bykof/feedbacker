import {
  SET_CREATE_FEEDBACK_GROUP_PASSWORD, CREATE_FEEDBACK_GROUP
} from "../actionTypes";

const initialJoinFeedBackGroupFormState = {
  createFeedbackGroupPassword: '',
  creatingFeedbackGroup: false,
};

export default function (state = initialJoinFeedBackGroupFormState, action) {
  switch (action.type) {
    case SET_CREATE_FEEDBACK_GROUP_PASSWORD:
      return { ...state, createFeedbackGroupPassword: action.payload };
    case CREATE_FEEDBACK_GROUP:
      console.log(`creating feedback group with password: ${state.createFeedbackGroupPassword}`);
      return { ...state, creatingFeedbackGroup: true };
    default:
      return state;
  }
}
