import React, { useState } from 'react';
import className from 'classnames';
import { connect } from 'react-redux';
import {
  createFeedbackGroup
} from '../../redux/actions'
import LoadingSpinner from '../LoadingSpinner';

function CreateFeedbackGroupForm(props) {
  const [feedbackGroupPassword, setFeedbackGroupPassword] = useState('');
  const [feedbackGroupRepeatPassword, setFeedbackGroupRepeatPassword] = useState('');
  const onSubmit = (event) => {
    props.createFeedbackGroup(feedbackGroupPassword, feedbackGroupRepeatPassword);
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <input
          type="password"
          className={className('input is-medium', { 'is-danger': props.createdError !== null })}
          placeholder="New Password"
          value={feedbackGroupPassword}
          onChange={(event) => setFeedbackGroupPassword(event.target.value)}
        />
      </div>
      <div className="field">
        <input
          type="password"
          className={className('input is-medium', { 'is-danger': props.createdError !== null })}
          placeholder="Repeat Password"
          value={feedbackGroupRepeatPassword}
          onChange={(event) => setFeedbackGroupRepeatPassword(event.target.value)}
        />
      </div>
      {
        props.createdError ? (
          <p className="help is-danger">Please check input fields</p>
        ) : null
      }
      <hr />
      <button type="submit" className="button is-primary is-medium is-fullwidth" disabled={props.creatingFeedbackGroup}>
        {props.creatingFeedbackGroup ? <LoadingSpinner /> : 'Create'}
      </button>
    </form>
  );
}

export default connect(
  state => ({
    creatingFeedbackGroup: state.feedbackGroup.creatingFeedbackGroup,
    createdError: state.feedbackGroup.createdError,
  }),
  { createFeedbackGroup }
)(CreateFeedbackGroupForm);
