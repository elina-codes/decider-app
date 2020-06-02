import React from 'react';
import { DecisionList } from './DecisionList';

export default function Dashboard({ props, setPageTitle }: any) {
  const [decisions, decisionUtilities] = props;
  setPageTitle('Dashboard');

  return <DecisionList props={props} />;
}
