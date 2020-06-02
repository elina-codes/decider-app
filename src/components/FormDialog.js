import React, { useState } from 'react';
import { createDecision } from '../app/utilities';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export function FormDialog({ title, content, inputLabel, inputType, inputId, decisionUtilities }) {
  // console.log(decisionUtilities);
  const { addDecision } = decisionUtilities();

  const [open, setOpen] = useState(false);
  let decisionTitle = '';

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    handleClose();
    const newDecision = createDecision(decisionTitle);
    addDecision(newDecision);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleClickOpen}>
        New decision
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id={inputId}
            label={inputLabel}
            type={inputType}
            fullWidth
            onChange={(e) => (decisionTitle = e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
