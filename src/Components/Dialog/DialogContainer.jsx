import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SongForm from './SongForm';

export default function DialogContainer(props) {
  const {
    track,
    addQuizQuestion,
    removeQuizQuestion,
  } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add song to quiz
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onClick={(e) => { e.stopPropagation(); }}
      >
        <DialogTitle id="alert-dialog-title">{"Add track to quiz"}</DialogTitle>
        <DialogContent>
          <SongForm
            track={track}
            addQuizQuestion={addQuizQuestion}
            removeQuizQuestion={removeQuizQuestion}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}