import React, { useEffect } from 'react';
import { DecisionList } from './DecisionList';

export default function Dashboard({ props, setPageTitle }: any) {
  const [decisions, decisionUtilities] = props;
  const { updateCurrentDecision } = decisionUtilities();

  useEffect(() => {
    updateCurrentDecision('');
    setPageTitle('Dashboard');
  }, []);

  return <DecisionList props={props} />;
}
