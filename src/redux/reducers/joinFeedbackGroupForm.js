import store from '../store';

import * as firebase from 'firebase';

import {
  SET_JOIN_FEEDBACK_GROUP_ID,
  SET_JOIN_FEEDBACK_GROUP_PASSWORD,
  JOIN_FEEDBACK_GROUP,
  JOIN_FEEDBACK_GROUP_SUCCESS,
  JOIN_FEEDBACK_GROUP_ERROR,
  RESET_JOIN_FEEDBACKGROUP_FORM,
} from '../actionTypes';

import {
  joinFeedbackGroupSuccess,
  joinFeedbackGroupError,
} from '../actions';

const initialJoinFeedBackGroupFormState = {
  joinFeedbackGroupId: '35066',
  joinFeedbackGroupPassword: 'test',
  joiningFeedbackGroup: false,
  feedbackGroup: null,
  error: null,
};

export default function (state = initialJoinFeedBackGroupFormState, action) {
  switch (action.type) {
    case SET_JOIN_FEEDBACK_GROUP_ID:
      return { ...state, joinFeedbackGroupId: action.payload };
    case SET_JOIN_FEEDBACK_GROUP_PASSWORD:
      return { ...state, joinFeedbackGroupPassword: action.payload };
    case JOIN_FEEDBACK_GROUP:
      console.log(`joining feedback with id: ${state.joinFeedbackGroupId}`)
      const findAnonymousFeedbackGroup = firebase.functions().httpsCallable('findAnonymousFeedbackGroup');
      findAnonymousFeedbackGroup({
        feedbackerId: state.joinFeedbackGroupId,
        password: state.joinFeedbackGroupPassword,
      }).then((response) => {
        store.dispatch(joinFeedbackGroupSuccess(response.data));
      }).catch((error) => {
        store.dispatch(joinFeedbackGroupError(error));
      })
      return { ...state, joiningFeedbackGroup: true, error: null, feedbackGroup: null };
    case JOIN_FEEDBACK_GROUP_SUCCESS:
      console.log('successfull retrieved: ', action.payload);
      return { ...state, joiningFeedbackGroup: false, feedbackGroup: action.payload, error: null };
    case JOIN_FEEDBACK_GROUP_ERROR:
      console.log('oops error: ', action.payload);
      return { ...state, joiningFeedbackGroup: false, error: action.payload, feedbackGroup: null };
    case RESET_JOIN_FEEDBACKGROUP_FORM:
      return initialJoinFeedBackGroupFormState;
    default:
      return state;
  }
}
