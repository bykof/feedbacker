import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import JoinFeedbackGroupForm from '../../components/JoinFeedbackGroupForm';
import CreateFeedbackGroupLink from '../../components/CreateFeedbackGroupLink';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FEEDBACKGROUP_PATH } from '../../router/paths';
import { resetFeedbackGroupForm } from '../../redux/actions';


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

  const loading = (
    <div className="columns">
      <div className="column has-text-centered">
        <LoadingSpinner />
        <p>Loading...</p>
      </div>
    </div>
  );

  let redirectToFeedbackGroup;
  if (props.feedbackGroup) {
    props.resetFeedbackGroupForm();
    redirectToFeedbackGroup = (
      <Redirect push={true} to={FEEDBACKGROUP_PATH(props.feedbackGroup ? props.feedbackGroup.id : '')} />
    );
  }

  return (
    <React.Fragment>
      <div className="columns">
        <div className="column">
          <h1 className="is-size-1">Feedbacker</h1>
        </div>
      </div>
      {props.joiningFeedbackGroup ? loading : joinOrCreate}
      {redirectToFeedbackGroup}
    </React.Fragment>
  );
}


export default connect(
  state => ({
    joiningFeedbackGroup: state.joinFeedbackGroupForm.joiningFeedbackGroup,
    feedbackGroup: state.joinFeedbackGroupForm.feedbackGroup,
  }),
  { resetFeedbackGroupForm },
)(StartPage);
