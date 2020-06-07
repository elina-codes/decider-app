import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import * as types from '../app/types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1)
      }
    },
    voted: {
      background: '#aaa'
    },
    vetoed: {
      background: '#666'
    }
  })
);

export default function Voting({ props }: any) {
  const [currentDecision, setPageTitle] = props;
  const classes = useStyles();
  const [options, setOptions] = useState(currentDecision.options);
  const [disabled, setDisabled] = useState(false);
  const backBtnPath = `${currentDecision.url}/suggestions`;

  useEffect(() => {
    setPageTitle('Voting');
  }, []);

  const handleVoteClick = function (e: any, option: types.Option, key: number) {
    e.preventDefault();

    let voteCount: number = option.vote_count;

    if (option.vote_count) {
      voteCount--;
    } else {
      voteCount++;
    }

    let optionsArr = [...options];
    optionsArr[key].vote_count = voteCount;

    setOptions(optionsArr);
  };

  const handleVetoClick = function (e: any, option: types.Option, key: number) {
    e.preventDefault();

    const flippedVetoState: boolean = !option.veto;

    let optionsArr = [...options];
    optionsArr[key].veto = flippedVetoState;

    setOptions(optionsArr);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <List component="nav" aria-label="primary">
        {options &&
          options.map((option: types.Option, key: number) => (
            <ListItem key={key} selected={options[key].veto}>
              {options[key].vote_count > 0 && (
                <ListItemIcon>
                  <CheckCircleIcon />
                </ListItemIcon>
              )}
              <ListItemText inset={options[key].vote_count === 0} primary={option.content} />
              <Button variant="outlined" color="primary" onClick={(e) => handleVoteClick(e, option, key)}>
                Vote
              </Button>
              <Button variant="text" color="secondary" onClick={(e) => handleVetoClick(e, option, key)}>
                Veto
              </Button>
            </ListItem>
          ))}
      </List>

      {/* TODO: component, dynamic step routing */}
      <div className="button-container">
        <Button variant="outlined" component={Link} to={backBtnPath}>
          Back
        </Button>
        <div className="align-right">
          <Button variant="contained" color="primary" type="submit" disabled={disabled}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
