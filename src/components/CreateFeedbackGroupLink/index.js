import React from 'react'

import { Link } from 'react-router-dom';

import { CREATE_FEEDBACK_GROUP_PATH } from '../../router/paths';

function CreateFeedbackGroupLink(props) {
  return (
    <Link to={CREATE_FEEDBACK_GROUP_PATH} type="button" className="button is-link is-rounded">
      <span class="icon">
        <i class="fas fa-plus"></i>
      </span>
      <span>Generate Feedbacker ID</span>
    </Link>
  )
}

export default CreateFeedbackGroupLink;
