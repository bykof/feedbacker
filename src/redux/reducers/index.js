import { combineReducers } from "redux";
import joinFeedbackGroupForm from './joinFeedbackGroupForm';
import createFeedbackGroupForm from './createFeedbackGroupForm';

export default combineReducers({ joinFeedbackGroupForm, createFeedbackGroupForm });
