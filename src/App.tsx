import React from 'react';
// import * as types from './app/types';
import { Counter } from './features/counter/Counter';
import { DecisionList } from './components/DecisionList';
import { FormDialog } from './components/FormDialog';
import * as sampleData from './sample-data';
import './App.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FormDialog
          title="New Decision"
          content="Start the decision process by entering a title for your conundrum."
          inputLabel="Decision title"
          inputType="text"
          inputId="decision-title"
        />
      </header>
      <main>
        <span>OR</span>
        <DecisionList decisions={sampleData.decisions} />
        <Counter />
      </main>
    </div>
  );
}

export default App;
