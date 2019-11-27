import React from 'react';
import PropTypes from 'prop-types';

function CreatedFeedbackGroup(props) {
  return (
    <div className="colummns">
      <div className="column">
        <h1 className="title">
          Your Feedbacker ID is:
        </h1>
        <h1 className="title has-text-centered has-background-light">
          {props.createdFeedbackGroup.feedbackerId}
        </h1>
        <div className="notification is-info">
          Please note this number and provide it to your Feedbackers.<br />
        </div>
      </div>
    </div>
  );
}

CreatedFeedbackGroup.propTypes = {
  createdFeedbackGroup: PropTypes.object.isRequired,
}

export default CreatedFeedbackGroup;
