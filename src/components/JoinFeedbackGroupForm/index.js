import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { findAnonymousFeedbackGroup } from '../../redux/actions';
import LoadingSpinner from '../LoadingSpinner';


function JoinFeedbackGroupForm(props) {
  const [feedbackerId, setFeedbackerId] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (event) => {
    props.findAnonymousFeedbackGroup(feedbackerId, password);
    event.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <input
          type="text"
          className={
            classNames(
              'input',
              'is-medium',
              {
                'is-danger': props.anonymousFeedbackGroupError
              },
            )
          }

          placeholder="Feedbacker ID"
          value={feedbackerId}
          onChange={(event) => setFeedbackerId(event.target.value)}
        />
      </div>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            type="password"
            className={
              classNames(
                'input',
                'is-medium',
                {
                  'is-danger': props.anonymousFeedbackGroupError,
                },
              )
            }
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="control">
          <button type="submit" className="button is-medium is-primary">
            {
              props.searchingAnonymousFeedbackGroup ? (
                <LoadingSpinner />
              ) : "Join"
            }
          </button>
        </div>
      </div>
      {
        props.anonymousFeedbackGroupError ? (
          <p class="help is-danger">The Feedbacker ID or the password are wrong!</p>
        ) : null
      }
    </form>
  );
}

export default connect(
  state => ({
    anonymousFeedbackGroupError: state.feedbackGroup.anonymousFeedbackGroupError,
    searchingAnonymousFeedbackGroup: state.feedbackGroup.searchingAnonymousFeedbackGroup,
  }),
  { findAnonymousFeedbackGroup }
)(JoinFeedbackGroupForm);
