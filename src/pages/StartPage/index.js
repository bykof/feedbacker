import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import JoinFeedbackGroupForm from '../../components/JoinFeedbackGroupForm';
import CreateFeedbackGroupLink from '../../components/CreateFeedbackGroupLink';
import Loading from '../../components/Loading';

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
      <div className="columns">
        <div className="column">
          <CreateFeedbackGroupLink />
        </div>
      </div>
    </div>
  );

  let redirectToFeedbackGroup;
  if (props.anonymousFeedbackGroup) {
    redirectToFeedbackGroup = (
      <Redirect push={true} to={FEEDBACKGROUP_PATH(props.anonymousFeedbackGroup.id)} />
    );
    props.invalidateAnonymousFeedbackGroup();
  }

  return (
    <React.Fragment>
      <div className="columns">
        <div className="column">
          <h1 className="is-size-1">Feedbacker</h1>
        </div>
      </div>
      {props.joiningFeedbackGroup ? <Loading /> : joinOrCreate}
      {redirectToFeedbackGroup}
    </React.Fragment>
  );
}


export default connect(
  state => ({
    anonymousFeedbackGroup: state.feedbackGroup.anonymousFeedbackGroup,
  }),
  { invalidateAnonymousFeedbackGroup },
)(StartPage);
