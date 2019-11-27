import * as firebase from 'firebase';

import store from '../store';
import {
  FIND_ANONYMOUS_FEEDBACK_GROUP,
  CREATE_FEEDBACK_GROUP,
  CREATE_FEEDBACK_GROUP_SUCCESS,
  CREATE_FEEDBACK_GROUP_ERROR,
  FIND_ANONYMOUS_FEEDBACK_GROUP_ERROR,
  FIND_ANONYMOUS_FEEDBACK_GROUP_SUCCESS,
  INVALIDATE_ANONYMOUS_FEEDBACK_GROUP,
  FIND_MASTER_FEEDBACK_GROUP,
  FIND_MASTER_FEEDBACK_GROUP_SUCCESS,
  FIND_MASTER_FEEDBACK_GROUP_ERROR,
  INVALIDATE_MASTER_FEEDBACK_GROUP
} from "../actionTypes";
import {
  findAnonymousFeedbackGroupSuccess,
  findAnonymousFeedbackGroupError,


  createFeedbackGroupSuccess,
  createFeedbackGroupError,
  findMasterFeedbackGroupSuccess,
  findMasterFeedbackGroupError,
} from '../actions';

const initialJoinFeedBackGroupState = {
  creatingFeedbackGroup: false,
  createdFeedbackGroup: null,
  createdError: null,

  searchingAnonymousFeedbackGroup: false,
  anonymousFeedbackGroup: null,
  anonymousFeedbackGroupError: null,

  searchingMasterFeedbackGroup: false,
  masterFeedbackGroup: null,
  masterFeedbackGroupError: null,
};

export default function (state = initialJoinFeedBackGroupState, action) {
  switch (action.type) {
    case FIND_ANONYMOUS_FEEDBACK_GROUP:
      const findAnonymousFeedbackGroup = firebase.functions().httpsCallable('findAnonymousFeedbackGroup');
      findAnonymousFeedbackGroup({
        feedbackerId: action.payload.feedbackerId,
      }).then((response) => {
        store.dispatch(findAnonymousFeedbackGroupSuccess(response.data));
      }).catch((error) => {
        store.dispatch(findAnonymousFeedbackGroupError(error));
      })
      return { ...state, searchingAnonymousFeedbackGroup: true, anonymousFeedbackGroup: null, anonymousFeedbackGroupError: null };

    case FIND_ANONYMOUS_FEEDBACK_GROUP_SUCCESS:
      return { ...state, searchingAnonymousFeedbackGroup: false, anonymousFeedbackGroup: action.payload, anonymousFeedbackGroupError: null };

    case FIND_ANONYMOUS_FEEDBACK_GROUP_ERROR:
      return { ...state, searchingAnonymousFeedbackGroup: false, anonymousFeedbackGroup: null, anonymousFeedbackGroupError: action.payload };

    case INVALIDATE_ANONYMOUS_FEEDBACK_GROUP:
      return { ...state, searchingAnonymousFeedbackGroup: false, anonymousFeedbackGroup: null, anonymousFeedbackGroupError: null };

    case FIND_MASTER_FEEDBACK_GROUP:
      const findMasterFeedbackGroup = firebase.functions().httpsCallable('findMasterFeedbackGroup');
      findMasterFeedbackGroup({
        feedbackerId: action.payload.feedbackerId,
        password: action.payload.password,
      }).then((response) => {
        store.dispatch(findMasterFeedbackGroupSuccess(response.data));
      }).catch((error) => {
        store.dispatch(findMasterFeedbackGroupError(error));
      })
      return { ...state, searchingMasterFeedbackGroup: true, masterFeedbackGroup: null, masterFeedbackGroupError: null };

    case FIND_MASTER_FEEDBACK_GROUP_SUCCESS:
      return { ...state, searchingMasterFeedbackGroup: false, masterFeedbackGroup: action.payload, masterFeedbackGroupError: null };

    case FIND_MASTER_FEEDBACK_GROUP_ERROR:
      return { ...state, searchingMasterFeedbackGroup: false, masterFeedbackGroup: null, masterFeedbackGroupError: action.payload };

    case INVALIDATE_MASTER_FEEDBACK_GROUP:
      return { ...state, searchingMasterFeedbackGroup: false, masterFeedbackGroup: null, masterFeedbackGroupError: null };

    case CREATE_FEEDBACK_GROUP:
      const createFeedbackGroup = firebase.functions().httpsCallable('createFeedbackGroup');
      console.log(`Creating FeedbackGroup with: ${action.payload.password}, ${action.payload.masterPassword}`);
      createFeedbackGroup({
        password: action.payload.password,
        repeatPassword: action.payload.repeatPassword,
      }).then((response) => {
        console.log('Got response: ', response.data);
        store.dispatch(createFeedbackGroupSuccess(response.data));
      }).catch((error) => {
        store.dispatch(createFeedbackGroupError(error));
      })
      return { ...state, creatingFeedbackGroup: true };

    case CREATE_FEEDBACK_GROUP_SUCCESS:
      return { ...state, creatingFeedbackGroup: false, createdFeedbackGroup: action.payload, createdError: null };

    case CREATE_FEEDBACK_GROUP_ERROR:
      return { ...state, creatingFeedbackGroup: false, createdFeedbackGroup: null, createdError: action.payload };
    default:
      return state;
  }
}
