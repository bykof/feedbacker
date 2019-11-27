import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import StartPage from '../../pages/StartPage';
import CreateFeedbackGroupPage from '../../pages/CreateFeedbackGroupPage';
import FeedbackGroupPage from '../../pages/FeedbackGroupPage';
import { CREATE_FEEDBACK_GROUP_PATH, FEEDBACKGROUP_WILDCARD_PATH } from '../../router/paths';


function App() {
  return (
    <section className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-three-fifths is-offset-one-fifth">
            <Router>
              <Switch>
                <Route path={CREATE_FEEDBACK_GROUP_PATH} component={CreateFeedbackGroupPage} />
                <Route path={FEEDBACKGROUP_WILDCARD_PATH} component={FeedbackGroupPage} />
                <Route path="/" component={StartPage} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
