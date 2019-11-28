import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { findAnonymousFeedbackGroup, findMasterFeedbackGroup } from '../../redux/actions';
import LoadingSpinner from '../LoadingSpinner';


function JoinFeedbackGroupForm(props) {
  const [isMaster, setIsMaster] = useState(false);
  const [feedbackerId, setFeedbackerId] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (event) => {
    if (isMaster) {
      props.findMasterFeedbackGroup(feedbackerId, password);
    } else {
      props.findAnonymousFeedbackGroup(feedbackerId);
    }
    event.preventDefault();
  }
  const toggleIsMaster = (event) => {
    setIsMaster(!isMaster);
  }

  const isLoading = props.searchingAnonymousFeedbackGroup || props.searchingMasterFeedbackGroup;
  const isError = props.anonymousFeedbackGroupError || props.masterFeedbackGroupError;
  let renderedPassword = null;

  if (isMaster) {
    renderedPassword = (
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            type="password"
            className={
              classNames(
                'input',
                'is-medium',
                {
                  'is-danger': isError,
                },
              )
            }
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {
          isMaster ? (
            <div className="control">
              <button type="submit" className="button is-medium is-primary" disabled={isLoading}>
                {
                  isLoading ? (
                    <LoadingSpinner />
                  ) : "Join"
                }
              </button>
            </div>
          ) : null
        }
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div class="tabs is-toggle is-toggle-rounded is-centered">
        <ul>
          <li class={classNames({'is-active': !isMaster})}>
            <a onClick={() => {setIsMaster(false)}}>
              <span>Create Feedback</span>
            </a>
          </li>
          <li class={classNames({'is-active': isMaster})}>
            <a onClick={() => {setIsMaster(true)}}>
              <span>Receive Feedbacks</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="field has-addons">
        <div className="control is-expanded">
          <input
            type="text"
            className={
              classNames(
                'input',
                'is-medium',
                {
                  'is-danger': isError
                },
              )
            }
            placeholder="Feedbacker ID"
            value={feedbackerId}
            onChange={(event) => setFeedbackerId(event.target.value)}
          />
        </div>
        {
          !isMaster ? (
            <div className="control">
              <button type="submit" className="button is-medium is-primary" disabled={isLoading}>
                {
                  isLoading ? (
                    <LoadingSpinner />
                  ) : "Join"
                }
              </button>
            </div>
          ) : null
        }
      </div>
      {renderedPassword}

      {
        isError ? (
          <p className="help is-danger">The Feedbacker ID or the password are wrong!</p>
        ) : null
      }
    </form>
  );
}

export default connect(
  state => ({
    anonymousFeedbackGroupError: state.feedbackGroup.anonymousFeedbackGroupError,
    masterFeedbackGroupError: state.feedbackGroup.masterFeedbackGroupError,
    searchingAnonymousFeedbackGroup: state.feedbackGroup.searchingAnonymousFeedbackGroup,
    searchingMasterFeedbackGroup: state.feedbackGroup.searchingMasterFeedbackGroup,
  }),
  { findAnonymousFeedbackGroup, findMasterFeedbackGroup },
)(JoinFeedbackGroupForm);
