import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { findAnonymousFeedbackGroup, findMasterFeedbackGroup } from '../../redux/actions';
import LoadingSpinner from '../LoadingSpinner';


function JoinFeedbackGroupForm(props) {
  const [isMaster, setIsMaster] = useState(false);
  const [feedbackerId, setFeedbackerId] = useState('');
  const [password, setPassword] = useState('');
  const [masterPassword, setMasterPassword] = useState('');
  const onSubmit = (event) => {
    if (isMaster) {
      props.findMasterFeedbackGroup(feedbackerId, password, masterPassword);
    } else {
      props.findAnonymousFeedbackGroup(feedbackerId, password);
    }
    event.preventDefault();
  }
  const toggleIsMaster = (event) => {
    setIsMaster(!isMaster);
  }

  const isLoading = props.searchingAnonymousFeedbackGroup || props.searchingMasterFeedbackGroup;
  const isError = props.anonymousFeedbackGroupError || props.masterFeedbackGroupError;
  let renderedMasterPassword = null;

  if (isMaster) {
    renderedMasterPassword = (
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
            placeholder="Master Password"
            value={masterPassword}
            onChange={(event) => setMasterPassword(event.target.value)}
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
      <div className="field">
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
      {renderedMasterPassword}
      {
        isError ? (
          <p className="help is-danger">The Feedbacker ID or the password are wrong!</p>
        ) : null
      }
      <div className="field">
        <input id="isMaster" type="checkbox" className="switch is-rounded" checked={isMaster} onChange={toggleIsMaster} />
        <label htmlFor="isMaster">receive feedbacks</label>
      </div>
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
