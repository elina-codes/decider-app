// import React, { useState } from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as types from '../app/types';
import { isCurrentUser, multiClass, createListItem } from '../app/utilities';
import styles from './DecisionList.module.scss';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';
import CheckIcon from '@material-ui/icons/Check';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import Switch from '@material-ui/core/Switch';
// import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// import { stringify } from 'querystring';

function decisionUIData(decision: types.Decision) {
  // const isActive = !decision.completed;
  const outcome = decision.outcome && decision.outcome.length ? decision.outcome : null;

  function memberList(key: string | number, limit: number = 0) {
    const members = decision.members;
    let memberListItems: JSX.Element[] = [];

    // Helpers
    const createMemberListItem = (keyModifier: string, text: string) => <li key={`${key}-${keyModifier}`}>{text}</li>;

    for (let i = 0; i < members.length; i++) {
      const { id, first_name, last_name } = members[i];
      let listItem = null;

      if (limit) {
        // Limited view:
        if (i >= limit) {
          // If we have exceeded the member limit, display a count of remaining members and break loop
          const membersLeftNum: number = members.length - memberListItems.length;
          listItem = createMemberListItem('others', `+${membersLeftNum} others`);
          memberListItems.push(listItem);
          break;
        } else if (isCurrentUser(id)) {
          // Show current user at the top of the list as 'You'
          listItem = createMemberListItem(id, 'You');
          memberListItems.unshift(listItem);
        } else {
          // Show other members' first names only
          listItem = createMemberListItem(id, first_name);
          memberListItems.push(listItem);
        }
      } else {
        // Regular view: display all members, show full names
        listItem = createMemberListItem(id, `${first_name} ${last_name}`);
        memberListItems.push(listItem);
      }
    }

    return <ul className={`list--unstyled ${limit && 'list--inline'}`}>{memberListItems}</ul>;
  }

  function outcomeList(): JSX.Element | undefined {
    if (outcome) {
      return (
        <ol className="list--unstyled">{outcome.map((result: string, key: number) => createListItem(key, result))}</ol>
      );
    } else {
      return <span className={styles.inProgress}>Decision still in progress</span>;
    }
  }

  return { memberList, outcomeList };
}

export const DecisionList = ({ props }: any) => {
  const [decisions, decisionUtilities] = props;

  const [filterByStatus, setFilterByStatus] = useState(false);
  let decisionList: types.DecisionList[] = [];

  const toggleFilterByStatus = () => {
    setFilterByStatus((prev) => !prev);
  };

  if (filterByStatus) {
    const completedDecisions: types.DecisionList = {
      title: 'Completed',
      decisions: decisions.filter((decision: types.Decision) => decision.completed)
    };

    const activeDecisions: types.DecisionList = {
      title: 'In progress',
      decisions: decisions.filter((decision: types.Decision) => !decision.completed)
    };

    decisionList.push(activeDecisions, completedDecisions);
  } else {
    const allDecisions: types.DecisionList = {
      title: 'All',
      decisions: decisions
    };
    decisionList.push(allDecisions);
  }

  return (
    <>
      <FormControlLabel
        control={<Switch checked={filterByStatus} onChange={toggleFilterByStatus} />}
        label="Filter by Status"
      />

      {decisionList.map((group, key) => (
        <div className={styles.decisionsListContainer} key={`decisionGroup-${key}`}>
          <Typography variant="overline" component="h2" className={styles.decisionsListHead}>
            {group.title}
          </Typography>
          {group.decisions.map((decision: types.Decision, key: number) => (
            <DecisionListItem key={key} decision={decision} decisionUtilities={decisionUtilities} />
          ))}
        </div>
      ))}
    </>
  );
};

export const DecisionListItem = ({ decision, decisionUtilities }: any) => {
  const { deleteDecision } = decisionUtilities();
  const { memberList, outcomeList } = decisionUIData(decision);
  const { id, title, members, completed, outcome } = decision;
  const summaryKey = id + '-summary';
  const detailsKey = id + '-details';

  return (
    <ExpansionPanel className={styles.decisionItemContainer}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <div className={styles.decisionSummary}>
          <div className={multiClass(styles.decisionSummarySection, styles.decisionSummaryPrimary)}>
            <Typography variant="h6" component="h3" className={styles.decisionTitle}>
              {title}
            </Typography>
            <div className={styles.decisionMembers}>
              <PeopleIcon fontSize="small" /> {memberList(summaryKey, 3)}
            </div>
          </div>

          <div className={styles.decisionSummarySection}>
            {!completed && (
              <div className={styles.decisionSummaryActions}>
                <Button
                  component={Link}
                  variant="contained"
                  to={decision.url}
                  color="primary"
                  startIcon={<PersonAddIcon />}
                >
                  {' '}
                  Join
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<SendIcon />}
                  href={decision.url}
                  onClick={(e) => e.stopPropagation()}
                  onFocus={(e) => e.stopPropagation()}
                >
                  Invite
                </Button>
              </div>
            )}
            {completed && outcome && (
              <div className={styles.decisionWinner}>
                <Typography
                  variant="overline"
                  component="h4"
                  className={multiClass('hide-for-mobile', styles.decisionDetailsTitle)}
                >
                  Winner
                </Typography>
                <span className={styles.decisionOutcome}>
                  <CheckIcon /> {outcome[0]}
                </span>
              </div>
            )}
          </div>
        </div>
      </ExpansionPanelSummary>

      <ExpansionPanelDetails className={styles.decisionDetails} style={{ paddingLeft: 0, paddingRight: 30 }}>
        <div className={multiClass(styles.decisionDetailsSection, styles.decisionDetailsOutcome)}>
          <Typography variant="overline" component="h4" className={styles.decisionDetailsTitle}>
            Top Choices
          </Typography>
          {outcomeList()}
        </div>

        <div className={multiClass(styles.decisionDetailsSection, styles.decisionDetailsMembers)}>
          <Typography variant="overline" component="h4" className={styles.decisionDetailsTitle}>
            Members ({members.length})
          </Typography>
          {memberList(detailsKey)}
        </div>
      </ExpansionPanelDetails>
      <Divider />
      <ExpansionPanelActions>
        <Button
          variant="text"
          color="secondary"
          size="small"
          startIcon={<DeleteIcon />}
          onClick={() => deleteDecision(decision.id)}
        >
          Delete
        </Button>
      </ExpansionPanelActions>
    </ExpansionPanel>
  );
};
