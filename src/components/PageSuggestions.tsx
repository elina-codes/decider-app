import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1)
      }
    }
  })
);

export default function Suggestions({ props, setPageTitle }: any) {
  const [suggestions, suggestionUtilities] = props;
  const { updateSuggestions } = suggestionUtilities();

  const classes = useStyles();
  const [value, setValue] = React.useState(suggestions);
  const [skip, setSkip] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('');
  const [disabled, setDisabled] = React.useState(true);

  setPageTitle('Suggestions');

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
    // submitCallback();
  };

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        id="outlined-multiline-flexible"
        label="Suggestions (One per line)"
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
      <div className="button-container align-right">
        <Button variant="contained" onClick={() => setSkip(true)} type="submit">
          Skip
        </Button>
        <Button variant="contained" color="primary" type="submit" disabled={disabled}>
          Submit
        </Button>
      </div>
    </form>
  );
}
