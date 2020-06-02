import React, { useState } from 'react';
import Header from './components/Header';
import * as sampleData from './sample-data';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import PageHeading from './components/PageHeading';
import { FormDialog } from './components/FormDialog';
import Suggestions from './components/PageSuggestions';
import Dashboard from './components/PageDashboard';
import Voting from './components/PageVoting';
import NotFound from './components/NotFound';

function App() {
  const [currentDecision, setCurrentDecision] = useState({});
  const [decisions, setDecisions] = useState(sampleData.decisions);
  const [suggestions, setSuggestions] = useState([]);
  const [options, setOptions] = useState(suggestions);
  const [pageTitle, setPageTitle] = useState('Dashboard');

  // ----------------------------------
  // Decisions
  // ----------------------------------
  const decisionUtilities = () => {
    const addDecision = (decisionToAdd: any) => {
      // TODO: replace with API calls, callbacks
      setDecisions(decisions.concat(decisionToAdd));
    };

    const deleteDecision = (decisionToDeleteId: string) => {
      // TODO: replace with API calls, callbacks
      setDecisions(decisions.filter((decision) => decision.id !== decisionToDeleteId));
    };

    const updateDecision = (decisionToUpdate: any) => {
      // TODO: replace with API calls, callbacks
      setDecisions(decisions.map((decision) => (decision.id === decisionToUpdate.id ? decisionToUpdate : decision)));
    };

    const completeDecision = (decisionToComplete: any) => {
      decisionToComplete.completed = true;
      updateDecision(decisionToComplete);
    };

    const updateCurrentDecision = (decisionId: string) => {
      if (decisionId) {
        if (!(currentDecision as any).id || (currentDecision as any).id === decisionId) {
          setCurrentDecision(decisions.filter((decision) => decision.id === decisionId));
        }
      } else {
        setCurrentDecision({});
      }
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

  // ----------------------------------
  // Suggestions
  // ----------------------------------
  const suggestionUtilities = () => {
    const updateSuggestions = (suggestions: []) => {
      // TODO: replace with API calls, callbacks
      setSuggestions(suggestions);
      // if (!currentDecision.hasOwnProperty('options')) {
      //   currentDecision.options = [];
      // }

      // currentDecision.options.push(suggestions);
      // decisionUtilities().updateDecision(currentDecision);
    };

    return { updateSuggestions };
  };

  // ----------------------------------
  // Options
  // ----------------------------------
  const optionUtilities = () => {
    const updateOptions = (options: []) => {
      // TODO: replace with API calls, callbacks
      setOptions(options);
    };

    return { updateOptions };
  };

  return (
    <div className="App">
      <Header />

      <main className="App-main">
        <Router>
          <PageHeading title={pageTitle} decisionUtilities={decisionUtilities}>
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
              <Voting props={[options, optionUtilities]} setPageTitle={setPageTitle} />
            </Route>

            <Route path="/:currentDecision">
              <Suggestions props={[suggestions, suggestionUtilities]} setPageTitle={setPageTitle} />
            </Route>

            <Route path="/:currentDecision">
              <Suggestions props={[suggestions, suggestionUtilities]} setPageTitle={setPageTitle} />
            </Route>

            <Route component={NotFound} />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
