import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import JoinFeedbackGroupForm from '../../components/JoinFeedbackGroupForm';
import CreateFeedbackGroupLink from '../../components/CreateFeedbackGroupLink';

import { FEEDBACKGROUP_PATH } from '../../router/paths';
import { invalidateAnonymousFeedbackGroup } from '../../redux/actions';

function StartPage(props) {

  const joinOrCreate = (
    <div>
      <div className="columns">
        <div className="column">
          <JoinFeedbackGroupForm />
        </div>
      </div>
    </div>
  );

  let redirectToFeedbackGroup;
  let redirectId;
  if (props.anonymousFeedbackGroup) {
    redirectId = props.anonymousFeedbackGroup.id;
  }
  if (props.masterFeedbackGroup) {
    redirectId = props.masterFeedbackGroup.id;
  }
  if (redirectId) {
    redirectToFeedbackGroup = (
      <Redirect push={true} to={FEEDBACKGROUP_PATH(redirectId)} />
    );
  }

  return (
    <React.Fragment>
      <div className="columns">
        <div className="column has-text-centered">
          <h1 className="is-size-1">Feedbacker</h1>
        </div>
      </div>
      <div className="columns">
        <div className="column has-text-centered">
          <CreateFeedbackGroupLink />
        </div>
      </div>
      <hr />
      {joinOrCreate}
      {redirectToFeedbackGroup}
    </React.Fragment>
  );
}


export default connect(
  state => ({
    anonymousFeedbackGroup: state.feedbackGroup.anonymousFeedbackGroup,
    masterFeedbackGroup: state.feedbackGroup.masterFeedbackGroup,
    searchingAnonymousFeedbackGroup: state.feedbackGroup.searchingAnonymousFeedbackGroup,
    searchingMasterFeedbackGroup: state.feedbackGroup.searchingMasterFeedbackGroup,
  }),
  { invalidateAnonymousFeedbackGroup },
)(StartPage);
