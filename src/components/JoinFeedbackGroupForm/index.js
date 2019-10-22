import React from 'react';
import { connect } from 'react-redux';

import { joinFeedbackGroup, setJoinFeedbackGroupId, setJoinFeedbackGroupPassword } from '../../redux/actions';


function JoinFeedbackGroupForm(props) {

  const onSubmit = (event) => {
    props.joinFeedbackGroup();
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <input
          type="text"
          className="input is-medium"
          placeholder="Feedbacker ID"
          value={props.joinFeedbackId}
          onChange={(event) => props.setJoinFeedbackGroupId(event.target.value)}
        />
      </div>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            type="password"
            className="input is-medium"
            placeholder="Password"
            value={props.joinFeedbackPassword}
            onChange={(event) => props.setJoinFeedbackGroupPassword(event.target.value)}
          />
        </div>
        <div className="control">
          <button
            type="submit"
            className="button is-medium is-primary"
          >
            Join
        </button>
        </div>
      </div>
    </form>
  );
}

export default connect(
  state => ({
    joinFeedbackGroupId: state.joinFeedbackGroupForm.joinFeedbackGroupId,
  }),
  {
    joinFeedbackGroup,
    setJoinFeedbackGroupId,
    setJoinFeedbackGroupPassword,
  }
)(JoinFeedbackGroupForm);
