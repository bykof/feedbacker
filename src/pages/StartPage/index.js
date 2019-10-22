import React from 'react';
import { connect } from 'react-redux';

import JoinFeedbackGroupForm from '../../components/JoinFeedbackGroupForm';
import CreateFeedbackGroupLink from '../../components/CreateFeedbackGroupLink';


function StartPage(props) {

  const joinOrCreate = (
    <div>
      <div className="columns">
        <div className="column">
          <JoinFeedbackGroupForm />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <CreateFeedbackGroupLink />
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="columns">
        <div className="column">
          <h1 className="is-size-1">Feedbacker</h1>
        </div>
      </div>
      {props.joiningFeedbackGroup ? 'Joining...' : joinOrCreate}

    </React.Fragment>
  );
}


export default connect(
  state => ({
    joiningFeedbackGroup: state.joinFeedbackGroupForm.joiningFeedbackGroup,
  }),
  {},
)(StartPage);
