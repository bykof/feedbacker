import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as firebase from 'firebase';

import CreateFeedbackForm from '../../components/CreateFeedbackForm';
import Loading from '../../components/Loading';

function FeedbackGroupPage(props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedbackGroup, setFeedbackGroup] = useState(null);
  const feedbackGroupId = props.match.params.feedbackGroupId;

  useEffect(() => {
    const findFeedbackGroup = firebase.functions().httpsCallable('findFeedbackGroup');
    setLoading(true);
    findFeedbackGroup({
      feedbackGroupId: feedbackGroupId,
    }).then((response) => {
      setLoading(false);
      setFeedbackGroup(response.data);
    }).catch((error) => {
      setLoading(false);
      setError(error);
    });
  }, [feedbackGroupId, setFeedbackGroup, setError,]);

  let content;
  if (loading) {
    content = <Loading />;
  } else {
    if (error && !feedbackGroup) {
      content = (
        <React.Fragment>
          <div className="columns">
            <div className="column">
              <div class="notification is-danger">
                Oops! I think you got lost...
            </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <Link to={'/'} className='button is-primary is-medium is-fullwidth'>Take me back!</Link>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      content = <CreateFeedbackForm feedbackGroupId={feedbackGroupId} />
    }
  }

  return content;
}

export default FeedbackGroupPage;
