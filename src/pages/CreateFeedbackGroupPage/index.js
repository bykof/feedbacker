import React from 'react';
import CreateFeedbackGroupForm from '../../components/CreateFeedbackGroupForm';


function CreateFeedbackGroupPage(props) {
  return (
    <React.Fragment>
      <div className="colummns">
        <div className="column">
          <p>
            Create a new Feedback Group
        </p>
        </div>
      </div>
      <div className="colummns">
        <div className="column">
          <CreateFeedbackGroupForm />
        </div>
      </div>
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

export default CreateFeedbackGroupPage;
