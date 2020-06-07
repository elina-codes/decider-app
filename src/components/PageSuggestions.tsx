import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as types from '../app/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { currentUser } from '../sample-data';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1)
      }
    }
  })
);

const Suggestions = ({ props }: any) => {
  const [currentDecision, decisionUtilities, setPageTitle] = props;
  const history = useHistory();
  const classes = useStyles();
  const [skip, setSkip] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [suggestions, setSuggestions] = useState(
    currentDecision.options ? currentDecision.options.map((suggestion: any) => currentDecision.options) : []
  );
  const [value, setValue] = useState(suggestions);

  useEffect(() => {
    setPageTitle('Suggestions');
  }, []);

  // ----------------------------------
  // Options
  // ----------------------------------
  const updateSuggestions = (suggestions: []) => {
    // TODO: replace with API calls, callbacks
    setSuggestions(suggestions);

    const formattedOptions = suggestions.map((suggestion: types.Option) => ({
      content: suggestion,
      authorId: currentUser.id,
      vote_count: 0,
      veto: false
    }));

    (currentDecision as any).options.push(...formattedOptions);
    decisionUtilities().updateDecision(currentDecision);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setValue(inputValue);

    if (error) {
      if (inputValue.trim().length > 0) {
        toggleErrorUI(false);
      }
    } else {
      setDisabled(inputValue.length < 1);
    }
  };

  const suggestionsToArray = () => value.split(/\r?\n/).map((str: string) => str.trim());

  const toggleErrorUI = (errorState: boolean) => {
    const msg = errorState ? 'Please enter a valid suggestion' : '';
    setHelperText(msg);
    setError(errorState);
    if (!skip) setDisabled(errorState);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!skip) {
      if (value.trim().length) {
        const newSuggestions = suggestionsToArray();
        updateSuggestions(newSuggestions);
      } else {
        toggleErrorUI(true);
        return false;
      }
    }

    toggleErrorUI(false);
    setSkip(false);
    history.push(currentDecision.url + '/voting');
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="outlined-multiline-flexible"
        label="Separate with commas or on separate lines"
        helperText={helperText}
        placeholder="My favourite option"
        multiline
        fullWidth
        variant="outlined"
        InputLabelProps={{
          shrink: true
        }}
        value={value}
        onChange={handleChange}
        error={error}
      />

      {/* TODO: component */}
      <div className="button-container">
        <Button variant="outlined" component={Link} to="/">
          Back
        </Button>
        <div className="align-right">
          <Button variant="contained" onClick={() => setSkip(true)} type="submit">
            Skip
          </Button>
          <Button variant="contained" color="primary" type="submit" disabled={disabled}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Suggestions;
