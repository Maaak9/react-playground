import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography';
import SpotifyPlayer from '../Routes/Spotify/Bottom/SpotifyPlayer';

const SongFormWrapper = styled.div`
  .song-form--question {
    width: 100%;
  }
  .chioce-answers {
    width: 100%;
  }
  .spotify-player-wrapper {
    margin-bottom: 15px;
    margin-top: 10px;
  }
  .delete {
    float: right;
  }
`;


export default class SongForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typeOfAnswer: 'choices',
      question: this.props.question || '',
      answer1: this.props.answer1 || '',
      answer2: this.props.answer2 || '',
      answer3: this.props.answer3 || '',
      answer4: this.props.answer4 || '',
    };

    this.onSubmit = this.onSubmit.bind(this)
    this.setTypeOfAnswer = this.setTypeOfAnswer.bind(this)
    this.onFormChange = this.onFormChange.bind(this);
  }

  onSubmit(e) {
    e.stopPropagation();
    const question = {
      track: this.props.track,
      typeOfAnswer: this.state.typeOfAnswer,
      question: this.state.question,
      answer1: this.state.answer1,
      answer2: this.state.answer2,
      answer3: this.state.answer3,
      answer4: this.state.answer4,
    };

    this.props.addQuizQuestion(question);
  }

  setTypeOfAnswer(answer) {
    this.setState({
      typeOfAnswer: answer,
    });
  }

  onFormChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    const {
      track,
      removeQuizQuestion,
    } = this.props;

    const {
      typeOfAnswer,
      question,
      answer1,
      answer2,
      answer3,
      answer4,
    } = this.state;



    return (
      <form noValidate autoComplete="off">
        <SongFormWrapper>
          <Grid item container spacing={1}>
            <Typography>{`${track.artists[0].name} - ${track.name}`}</Typography>
            <Grid item xs={12}>
              <TextField
                className="song-form--question"
                required
                id="question"
                label="Question"
                onChange={(e) => {this.onFormChange(e)}}
                value={question}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>

              <ButtonGroup
                variant="contained"
                size="medium"
                aria-label="outlined contained button group"
              >
                <Button
                  color={typeOfAnswer === 'choices' ? 'primary' : 'default'}
                  onClick={() => this.setTypeOfAnswer('choices')}
                >Choices</Button>
                <Button
                  color={typeOfAnswer === 'text' ? 'primary' : 'default'}
                  onClick={() => this.setTypeOfAnswer('text')}
                >Text</Button>
                <Button
                  color={typeOfAnswer === 'test' ? 'primary' : 'default'}
                  onClick={() => this.setTypeOfAnswer('test')}
                >Three</Button>
              </ButtonGroup>
            </Grid>
            { typeOfAnswer === 'choices' ? (
              <React.Fragment>
                <Grid item xs={6}>
                <TextField
                  className={'chioce-answers'}
                  required
                  id="answer1"
                  label="Answer1"
                  value={answer1}
                  onChange={(e) => {this.onFormChange(e)}}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={'chioce-answers'}
                  required
                  id="answer2"
                  label="Answer2"
                  value={answer2}
                  onChange={(e) => {this.onFormChange(e)}}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={'chioce-answers'}
                  required
                  id="answer3"
                  label="Answer3"
                  value={answer3}
                  onChange={(e) => {this.onFormChange(e)}}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  className={'chioce-answers'}
                  required
                  id="answer4"
                  label="Answer4"
                  value={answer4}
                  onChange={(e) => {this.onFormChange(e)}}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </React.Fragment>) : null
            }
          </Grid>
          <Grid item xs={12} className="spotify-player-wrapper">
            <SpotifyPlayer
              currentTrack={track}
              playTrack={() => {} }
            />
          </Grid>
          <Button
            className="update"
            variant="contained"
            color="primary"
            startIcon={<SaveOutlinedIcon />}
            onClick={this.onSubmit}
          >Submit</Button>
          <Button
            className="delete"
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => { removeQuizQuestion(track) }}
          >Remove</Button>
        </SongFormWrapper>
      </form>
    );
  }
}