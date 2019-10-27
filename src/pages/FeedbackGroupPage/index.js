import React, { } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Feedbacks from '../../components/Feedbacks';
import CreateFeedbackForm from '../../components/CreateFeedbackForm';

function FeedbackGroupPage(props) {
  if (props.anonymousFeedbackGroup) {
    return <CreateFeedbackForm feedbackGroupId={props.anonymousFeedbackGroup.id} />;
  } else if (props.masterFeedbackGroup) {
    return <Feedbacks feedbacks={props.masterFeedbackGroup.feedbacks} />
  } else {
    return <Redirect to={'/'} />;
  }
}

export default connect(
  state => ({
    masterFeedbackGroup: state.feedbackGroup.masterFeedbackGroup,
    anonymousFeedbackGroup: state.feedbackGroup.anonymousFeedbackGroup,
  }), {}
)(FeedbackGroupPage);
