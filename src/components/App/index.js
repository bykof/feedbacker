import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import StartPage from '../../pages/StartPage';
import CreateFeedbackGroupPage from '../../pages/CreateFeedbackGroupPage';
import { CREATE_FEEDBACK_GROUP_PATH } from '../../router/paths';


function App() {
  return (
    <section className="section">
      <div className="container">
        <Router>
          <Switch>
            <Route path={CREATE_FEEDBACK_GROUP_PATH} component={CreateFeedbackGroupPage} />
            <Route path="/" component={StartPage} />
          </Switch>
        </Router>
      </div>
    </section>
  );
}

export default App;
