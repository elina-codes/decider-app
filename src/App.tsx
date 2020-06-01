import React, { useState } from 'react';
import { DecisionList } from './components/DecisionList';
import { FormDialog } from './components/FormDialog';
import Header from './components/Header';
import Typography from '@material-ui/core/Typography';
import * as sampleData from './sample-data';
import './App.scss';
import Suggestions from './components/Suggestions';

function App() {
  const [decisions, setDecisions] = useState(sampleData.decisions);
  const [suggestions, setSuggestions] = useState([]);

  // decisions
  const addDecision = (decisionToUpdate: any) => {
    // TODO: replace with API calls, callbacks
    setDecisions(decisions.concat(decisionToUpdate));
  };

  const deleteDecision = (decisionToUpdate: any) => {
    // TODO: replace with API calls, callbacks
    setDecisions(decisions.filter((decision) => decision.id !== decisionToUpdate.id));
  };

  const updateDecision = (decisionToUpdate: any) => {
    // TODO: replace with API calls, callbacks
    setDecisions(decisions.map((decision) => (decision.id === decisionToUpdate.id ? decisionToUpdate : decision)));
  };

  const completeDecision = (decisionToUpdate: any) => {
    decisionToUpdate.completed = true;
    updateDecision(decisionToUpdate);
  };

  // suggestions
  const updateSuggestions = (suggestions: []) => {
    // TODO: replace with API calls, callbacks
    setSuggestions(suggestions);
  };

  return (
    <div className="App">
      <Header />

      <main className="App-main">
        <div className="App-heading">
          <Typography variant="h4" component="h1">
            My Decisions
          </Typography>

          <FormDialog
            title="New Decision"
            content="Start the decision process by entering a title for your conundrum."
            inputLabel="Decision title"
            inputType="text"
            inputId="decision-title"
            onSubmit={addDecision}
          />
        </div>

        <DecisionList decisions={decisions} onDelete={deleteDecision} />

        <Suggestions suggestions={suggestions} submitCallback={updateSuggestions} />
      </main>
    </div>
  );
}

export default App;
