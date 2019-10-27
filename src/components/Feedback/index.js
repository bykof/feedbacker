import React from 'react';

function Feedback(props) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="content">
          <div className="columns">
            <div className="column has-text-centered">
              <span className="icon">
                <i className="fas fa-plus"></i>
              </span>
            </div>
            <div className="column">
              {props.feedback.goodText}
            </div>
          </div>
          <hr />
          <div className="columns">
            <div className="column has-text-centered">
              <span className="icon">
                <i className="fas fa-info"></i>
              </span>
            </div>
            <div className="column">
              {props.feedback.improvementText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
