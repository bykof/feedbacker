import React, { useState } from 'react';
// import * as firebase from 'firebase';

function CreateFeedbackForm(props) {

  const [goodText, setGoodText] = useState('');
  const [improvementText, setImprovementText] = useState('');
  // const addFeedback = firebase.functions().httpsCallable('addFeedback');
  const onSubmit = async (event) => {
    // const response = await addFeedback({
    //   feedbackerId: props.feedbackGroupId,
    //   feedback: {
    //     goodText: goodText,
    //     improvementText: improvementText,
    //   },
    // });

    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label">What was good?</label>
        <div className="control">
          <textarea className="textarea" value={goodText} onChange={(event) => setGoodText(event.target.value)}></textarea>
        </div>
      </div>
      <div className="field">
        <label className="label">What could be improved?</label>
        <div className="control">
          <textarea className="textarea" value={improvementText} onChange={(event) => setImprovementText(event.target.value)}></textarea>
        </div>
      </div>
      <hr />
      <button type="submit" className="button is-primary is-medium is-fullwidth">Send Feedback</button>
    </form>
  );
}

export default CreateFeedbackForm;
