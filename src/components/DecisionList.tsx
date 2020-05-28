// import React, { useState } from 'react';
import React from 'react';
import * as types from '../app/types';
import { isCurrentUser } from '../app/utilities';
import styles from './DecisionList.module.scss';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import Collapse from '@material-ui/core/Collapse';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
// import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import { stringify } from 'querystring';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    maxWidth: 800,
    margin: '50px auto'
  }
});

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
});

const createListItem = (key: string | number, text: string) => <li key={key}>{text}</li>;

function decisionUIData(decision: types.DecisionBasic) {
  function statusLabel(isActive: boolean): JSX.Element {
    const winner = decision.outcome && decision.outcome[0] ? decision.outcome[0] : '';

    return (
      <span className={`${styles.decisionStatus} ${isActive && styles.active}`}>
        {isActive && <RecordVoiceOverIcon />}
        {isActive ? 'Active' : '#1: ' + winner}
      </span>
    );
  }

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
          // If we have exceeded the member limit, display a count of remaining members and stop
          const membersLeftNum: number = members.length - memberListItems.length;
          listItem = createMemberListItem('others', `+${membersLeftNum} others`);
          memberListItems.push(listItem);
          break;
        } else {
          if (isCurrentUser(id)) {
            // Skip current user and increase member limit to display next member in their place
            limit++;
          } else {
            // Display only first names
            listItem = createMemberListItem(id, first_name);
          }
        }
      } else {
        // Regular view: display all members, show full names
        listItem = createMemberListItem(id, `${first_name} ${last_name}`);
      }

      if (listItem) memberListItems.push(listItem);
    }

    return <ul className={`list--unstyled ${limit && 'list--inline'}`}>{memberListItems}</ul>;
  }

  return { statusLabel, memberList };
}

export const DecisionList = ({ decisions }: any) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.table} component={Paper} elevation={3}>
      <Table style={{ tableLayout: 'fixed' }}>
        <TableBody>
          {decisions.map((decision: types.DecisionBasic, key: any) => (
            <DecisionListItem decision={decision} key={key} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const DecisionListItem = ({ decision }: any) => {
  const [open, setOpen] = React.useState(false);
  const { statusLabel, memberList } = decisionUIData(decision);
  const mainRowKey = decision.id + '-main';
  const infoRowKey = decision.id + '-info';
  const isActive = !decision.completed;
  const classes = useRowStyles();

  return (
    <>
      <TableRow key={mainRowKey} className={classes.root}>
        <TableCell style={{ width: 30 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell colSpan={2}>
          <Typography variant="h6" component="h3">
            {decision.title}
          </Typography>
          <Typography variant="overline" component="span">
            {statusLabel(isActive)}
          </Typography>
        </TableCell>

        <TableCell colSpan={2}>{memberList(mainRowKey, 2)}</TableCell>

        <TableCell align="right">
          {isActive && (
            <Button variant="contained" color="primary" startIcon={<PersonAddIcon />} href={decision.url}>
              Join
            </Button>
          )}
        </TableCell>

        <TableCell align="right">
          {isActive && (
            <Button variant="outlined" color="primary" endIcon={<SendIcon />} href={decision.url}>
              Invite
            </Button>
          )}
        </TableCell>

        <TableCell align="right" style={{ width: 50 }}>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow key={decision.id + '-info'} className={styles.decisionInfoContainer}>
        <TableCell style={{ padding: 0 }}></TableCell>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="decision info" style={{ tableLayout: 'fixed' }}>
                <TableHead className={styles.decisionInfoHead}>
                  <TableRow>
                    <TableCell>
                      <Typography variant="overline" component="span">
                        Final Results
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="overline" component="span">
                        Members ({decision.members.length})
                      </Typography>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell style={{ width: 50 }}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={styles.decisionInfoBody}>
                  <TableRow key={decision.id + 'members'}>
                    <TableCell>
                      <ol className="list--unstyles">
                        {decision.outcome &&
                          decision.outcome.map((result: string, key: number) => createListItem(key, result))}
                      </ol>
                    </TableCell>
                    <TableCell scope="row">{memberList(infoRowKey)}</TableCell>
                    <TableCell></TableCell>
                    <TableCell style={{ width: 50 }}></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
