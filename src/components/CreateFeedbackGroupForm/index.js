import React, { useState } from 'react';
import className from 'classnames';
import { connect } from 'react-redux';
import {
  createFeedbackGroup
} from '../../redux/actions'
import LoadingSpinner from '../LoadingSpinner';

function CreateFeedbackGroupForm(props) {
  const [feedbackGroupPassword, setFeedbackGroupPassword] = useState('');
  const [feedbackGroupMasterPassword, setFeedbackGroupMasterPassword] = useState('');
  const onSubmit = (event) => {
    props.createFeedbackGroup(feedbackGroupPassword, feedbackGroupMasterPassword);
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <input
          type="password"
          className={className('input is-medium', {'is-danger': props.createdError !== null})}
          placeholder="New Password"
          value={feedbackGroupPassword}
          onChange={(event) => setFeedbackGroupPassword(event.target.value)}
        />
      </div>
      <div className="field">
        <input
          type="password"
          className={className('input is-medium', {'is-danger': props.createdError !== null})}
          placeholder="New Master Password"
          value={feedbackGroupMasterPassword}
          onChange={(event) => setFeedbackGroupMasterPassword(event.target.value)}
        />
      </div>
      {
        props.createdError ? (
          <p className="help is-danger">Please check the input fields</p>
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
