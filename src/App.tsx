import React, { useState } from 'react';
// import * as types from './app/types';
// import { Counter } from './features/counter/Counter';
import { DecisionList } from './components/DecisionList';
import { FormDialog } from './components/FormDialog';
import Header from './components/Header';
import Typography from '@material-ui/core/Typography';
import * as sampleData from './sample-data';
import './App.scss';
import Suggestions from './components/Suggestions';
import * as types from './app/types';

function App() {
  const [decisions, setDecisions] = useState(sampleData.decisions);

  // decision helpers
  const addDecision = (decisionToUpdate: any) => {
    setDecisions(decisions.concat(decisionToUpdate));
  };

  const deleteDecision = (decisionToUpdate: any) => {
    setDecisions(decisions.filter((decision) => decision.id !== decisionToUpdate.id));
  };

  const updateDecision = (decisionToUpdate: any, markComplete: boolean = false) => {
    if (markComplete) decisionToUpdate.completed = true;

    setDecisions(decisions.map((decision) => (decision.id === decisionToUpdate.id ? decisionToUpdate : decision)));
  };

  const completeDecision = (decisionToUpdate: any) => {
    updateDecision(decisionToUpdate, true);
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

        <DecisionList decisions={decisions} filterByStatus onDelete={deleteDecision} />

        <Suggestions />
      </main>
    </div>
  );
}

export default App;
