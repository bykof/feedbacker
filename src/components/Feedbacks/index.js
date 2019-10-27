import React from 'react';

import Feedback from '../Feedback';

function Feedbacks(props) {
  return (
    <div>
      {props.feedbacks.map(
        (feedback) => (
          <div key={feedback.id}>
            <Feedback  feedback={feedback} />
            <br />
          </div>
        )
      )}
    </div>
  );
}

export default Feedbacks;
