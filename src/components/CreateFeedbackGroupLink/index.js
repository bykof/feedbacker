import React from 'react'

import { Link } from 'react-router-dom';

import { CREATE_FEEDBACK_GROUP_PATH } from '../../router/paths';

function CreateFeedbackGroupLink(props) {
  return (
    <Link to={CREATE_FEEDBACK_GROUP_PATH} type="button" className="button is-info is-medium is-fullwidth">
      New Feedback Group
    </Link>
  )
}

export default CreateFeedbackGroupLink;
