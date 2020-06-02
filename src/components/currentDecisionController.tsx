import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useLocation } from 'react-router-dom';

export default function PageHeading({ title, decisionUtilities, children }: any) {
  const { updateCurrentDecision } = decisionUtilities();
  const location = useLocation();

  useEffect(() => {
    const locationDecisionId = location.pathname.split('/')[1];
    if (locationDecisionId) updateCurrentDecision(location);
  }, [location, updateCurrentDecision]);

  return (
    <div className="App-heading">
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      {children}
    </div>
  );
}
