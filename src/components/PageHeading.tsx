import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';

export default function PageHeading({ pageTitle, subtitle = '', currentDecision, decisionUtilities, children }: any) {
  const { updateCurrentDecision } = decisionUtilities();
  const location = useLocation();

  useEffect(() => {
    if (!currentDecision.hasOwnProperty('id')) {
      const locationDecisionId = location.pathname.split('/')[1];
      if (locationDecisionId) updateCurrentDecision(locationDecisionId);
    }
  }, [location, currentDecision]);

  return (
    <div className="App-heading">
      <Typography variant="h4" component="h1">
        {subtitle + ' '}
        {pageTitle}
      </Typography>
      {children}
    </div>
  );
}
