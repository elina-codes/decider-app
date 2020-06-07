import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import * as sampleData from './sample-data';
import * as types from './app/types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import PageHeading from './components/PageHeading';
import { FormDialog } from './components/FormDialog';
import Suggestions from './components/PageSuggestions';
import Dashboard from './components/PageDashboard';
import Voting from './components/PageVoting';
import NotFound from './components/NotFound';
import { Decision } from './app/types';

function App() {
  const [currentDecision, setCurrentDecision]: any = useState({});
  const [decisions, setDecisions] = useState(sampleData.decisions);
  const [pageTitle, setPageTitle] = useState('Dashboard');

  // ----------------------------------
  // Decisions
  // ----------------------------------
  const decisionUtilities = () => {
    const addDecision = (decisionToAdd: any) => {
      // TODO: replace with API calls, callbacks, optimize to not update whole array
      const newDecisionList = decisions.concat(decisionToAdd);
      setDecisions(newDecisionList);
    };

    const deleteDecision = (decisionToDeleteId: string) => {
      // TODO: replace with API calls, callbacks, optimize to not update whole array
      const decisionToDelete = decisions.filter((decision) => decision.id !== decisionToDeleteId);
      if (decisionToDelete) setDecisions(decisionToDelete);
    };

    const updateDecision = (decisionToUpdate: any) => {
      // TODO: replace with API calls, callbacks, optimize to not update whole array
      decisionToUpdate = decisions.map((decision) =>
        decision.id === decisionToUpdate.id ? decisionToUpdate : decision
      );
      setDecisions(decisionToUpdate);
    };

    const completeDecision = (decisionToComplete: any) => {
      decisionToComplete.completed = true;
      updateDecision(decisionToComplete);
    };

    const updateCurrentDecision = (decisionId: string) => {
      let decisionToUpdate: any = {};

      if (decisionId && (!currentDecision || (currentDecision as any).id !== decisionId)) {
        decisionToUpdate = decisions.find((decision) => decision.id === decisionId);
      }

      setCurrentDecision(decisionToUpdate);
    };

    const clearCurrentDecision = () => {
      setCurrentDecision({});
    };

    return {
      addDecision,
      deleteDecision,
      updateDecision,
      completeDecision,
      updateCurrentDecision,
      clearCurrentDecision
    };
  };

  return (
    <div className="App">
      <Router>
        <Header />

        <main className="App-main">
          <PageHeading
            pageTitle={pageTitle}
            subtitle={currentDecision.title}
            currentDecision={currentDecision}
            decisionUtilities={decisionUtilities}
          >
            <Route exact path="/">
              <FormDialog
                title="New Decision"
                content="Start the decision process by entering a title for your conundrum."
                inputLabel="Decision title"
                inputType="text"
                inputId="decision-title"
                decisionUtilities={decisionUtilities}
              />
            </Route>
          </PageHeading>

          <Switch>
            <Route exact path="/">
              <Dashboard props={[decisions, decisionUtilities]} setPageTitle={setPageTitle} />
            </Route>

            <Route path="/:currentDecision/voting">
              <Voting props={[currentDecision, setPageTitle]} />
            </Route>

            <Route path="/:currentDecision">
              <Suggestions props={[currentDecision, decisionUtilities, setPageTitle]} />
            </Route>

            <Route path="/:currentDecision/suggestions">
              <Suggestions props={[currentDecision, decisionUtilities, setPageTitle]} />
            </Route>

            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
