import React, { useState } from 'react';
import * as firebase from 'firebase';
import className from 'classnames';

import LoadingSpinner from '../LoadingSpinner';

function CreateFeedbackForm(props) {
  const [goodText, setGoodText] = useState('');
  const [error, setError] = useState(null);
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [improvementText, setImprovementText] = useState('');
  const addFeedback = firebase.functions().httpsCallable('addFeedback');
  const onSubmit = (event) => {
    setIsLoading(true);
    setError(null);
    setIsCreated(false);

    addFeedback({
      feedbackGroupId: props.feedbackGroupId,
      feedback: {
        goodText: goodText,
        improvementText: improvementText,
      },
    }).then((response) => {
      setIsCreated(true);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setError(error);
      setIsLoading(false);
    });
    event.preventDefault();
  }

  const createdContent = (
    <React.Fragment>
      <div className="columns">
        <div className="column">
          Thank you very much for you feedback!
        </div>
      </div>
      <div className="columns">
        <div className="column has-text-centered">
          <figure class="image is-128x128 has-ratio">
            <img alt="Thank you gif" src="https://media.giphy.com/media/26FxJCp8QNIvJucCs/giphy.gif" />
          </figure>
        </div>
      </div>
    </React.Fragment>
  );

  const formContent = (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label className="label">What was good? *</label>
        <div className="control">
          <textarea
            className={className('textarea', { 'is-danger': error !== null })}
            value={goodText}
            onChange={(event) => setGoodText(event.target.value)}></textarea>
        </div>
      </div>
      <div className="field">
        <label className="label">What could be improved? *</label>
        <div className="control">
          <textarea
            className={className('textarea', { 'is-danger': error !== null })}
            value={improvementText}
            onChange={(event) => setImprovementText(event.target.value)}></textarea>
        </div>
      </div>
      {
        props.createdError ? (
          <p className="help is-danger">Please check the input fields</p>
        ) : null
      }
      <hr />
      <button type="submit" className="button is-primary is-medium is-fullwidth" disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : 'Send Feedback'}
      </button>
    </form>
  )

  if (isCreated) {
    return createdContent;
  }

  return formContent;
}

export default CreateFeedbackForm;
