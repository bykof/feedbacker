import React from 'react';
import { connect } from 'react-redux';
import { setCreateFeedbackGroupPassword, createFeedbackGroup } from '../../redux/actions'

function CreateFeedbackGroupForm(props) {

  const onSubmit = (event) => {
    props.createFeedbackGroup();
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <input
          type="password"
          className="input is-medium"
          placeholder="New Password"
          value={props.createFeedbackGroupPassword}
          onChange={(event) => props.setCreateFeedbackGroupPassword(event.target.value)}
        />
      </div>
      <button type="submit" className="button is-primary is-medium is-fullwidth">
        Create
      </button>
    </form>
  );
}

export default connect(
  state => ({
    createFeedbackGroupPassword: state.createFeedbackGroupForm.createFeedbackGroupPassword,
  }),
  {
    setCreateFeedbackGroupPassword,
    createFeedbackGroup,
  }
)(CreateFeedbackGroupForm);
