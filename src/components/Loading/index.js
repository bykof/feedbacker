import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

export default function Loading(props) {
  return (
    <div className="columns">
      <div className="column has-text-centered">
        <LoadingSpinner />
        <p>Loading...</p>
      </div>
    </div>
  )
}
