import React from 'react';
import { connect } from 'react-redux';
import CreateFeedbackGroupForm from '../../components/CreateFeedbackGroupForm';
import CreatedFeedbackGroup from '../../components/CreatedFeedbackGroup';


function CreateFeedbackGroupPage(props) {
  let content;
  if (props.createdFeedbackGroup) {
    content = (
      <CreatedFeedbackGroup createdFeedbackGroup={props.createdFeedbackGroup} />
    );
  } else {
    content = (
      <React.Fragment>
        <div className="colummns">
          <div className="column">
            <h1 className="title">
              Create a Feedback Group
          </h1>
          </div>
        </div>
        <div className="colummns">
          <div className="column">
            <p>
              Please do not forget this password. <br />
              You will need it to retrieve your feedbacks.
            </p>
          </div>
        </div>
        <div className="colummns">
          <div className="column">
            <CreateFeedbackGroupForm />
          </div>
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {content}
      <div className="colummns">
        <div className="column">
          <button onClick={props.history.goBack} type="button" className="button is-medium is-info is-fullwidth">
            Back
          </button>
        </div>
      </div>
    </React.Fragment >
  )
}

export default connect(
  (state) => ({
    createdFeedbackGroup: state.feedbackGroup.createdFeedbackGroup,
  }),
  {},
)(CreateFeedbackGroupPage);
