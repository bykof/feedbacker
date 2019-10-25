import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  createFeedbackGroup
} from '../../redux/actions'

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
          className="input is-medium"
          placeholder="New Password"
          value={feedbackGroupPassword}
          onChange={(event) => setFeedbackGroupPassword(event.target.value)}
        />
      </div>
      <div className="field">
        <input
          type="password"
          className="input is-medium"
          placeholder="New Master Password"
          value={feedbackGroupMasterPassword}
          onChange={(event) => setFeedbackGroupMasterPassword(event.target.value)}
        />
      </div>
      <button type="submit" className="button is-primary is-medium is-fullwidth">
        Create
      </button>
    </form>
  );
}

export default connect(
  state => ({}),
  { createFeedbackGroup }
)(CreateFeedbackGroupForm);
