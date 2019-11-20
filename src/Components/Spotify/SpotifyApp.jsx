import React from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'

import {
  initSpotify,
  getSpotifyAuth,
  getTopTracks,
  spotifyPlayerPlay,
  spotifyPlayerPause,
  spotifySearch,
  playTrack,
  selectDevice,
} from '../../Redux/Actions/SpotifyActions';

import {
  addQuizQuestion,
  updateQuizQuestionOrder
} from "../../Redux/Actions/SpotifyQuizCreator";

import '../../styles/css/components/spotifyApp.css';

import SpotifyPlayer from './Bottom/SpotifyPlayer';
import TopBar from "./TopBar/TopBar";
import LeftBar from "./LeftBar/LeftBar";
import RightBar from "./RightBar/RightBar";

class SpotifyApp extends React.Component {
  constructor(props) {
    super(props);

    props.initSpotify();
  }

  render() {
    console.log('props?', this.props);
    const {
      getTopTracks,
      getSpotifyAuth,
      topTracks,
      spotifyPlayerPlay,
      spotifyPlayerPause,
      spotifySearch,
      playTrack,
      currentTrack,
      searchResult,
      devices,
      selectDevice,
      addQuizQuestion,
      spotifyQuizCreator,
      updateQuizQuestionOrder,
    } = this.props;



    return (
      <React.Fragment>
        <div className="spotify-app">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={{ marginTop: 50, height: 200, padding: 10 }}>
              <TopBar
                getSpotifyAuth={getSpotifyAuth}
                getTopTracks={getTopTracks}
                spotifySearch={spotifySearch}
                devices={devices}
                selectDevice={selectDevice}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Paper style={{ padding: 10, height: '100%' }}>
              <LeftBar
                topTracks={topTracks}
                playTrack={playTrack}
                addQuizQuestion={addQuizQuestion}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Paper style={{ padding: 10, height: '100%' }}>
              <RightBar
                searchResult={searchResult}
                playTrack={playTrack}
                addQuizQuestion={addQuizQuestion}
                quizQuestions={spotifyQuizCreator.quizQuestions}
                updateQuizQuestionOrder={updateQuizQuestionOrder}
              />
            </Paper>
          </Grid>
        </Grid>
          { false ? (
            <SpotifyPlayer
              currentTrack={currentTrack}
              playTrack={playTrack}
            />
          ) : null
          }
        </div>
      </React.Fragment>
    )
  }
};

function mapStateToProps(state) {
  console.log('the state 5555', state);
  return {
    topTracks: state.spotify.topTracks,
    currentTrack: state.spotify.currentTrack,
    searchResult: state.spotify.searchResult,
    devices: state.spotify.devices,
    spotifyQuizCreator: state.spotifyQuizCreator,
  };
}

const mapDispatchToProps = (dispatch, props) => ({
  initSpotify: () => { return dispatch(initSpotify()); },
  getSpotifyAuth: () => { return dispatch(getSpotifyAuth()); },
  getTopTracks: () => { return dispatch(getTopTracks()); },
  spotifyPlayerPlay: () => { return dispatch(spotifyPlayerPlay()); },
  spotifyPlayerPause: () => { return dispatch(spotifyPlayerPause()); },
  spotifySearch: (searchText) => { return dispatch(spotifySearch(searchText)) },
  playTrack: (track, positionMs) => { dispatch(playTrack(track, positionMs)); },
  selectDevice: (device) => { dispatch(selectDevice(device)); },
  addQuizQuestion: (question) => {return dispatch(addQuizQuestion(question))},
  updateQuizQuestionOrder: (prevIndex, nextIndex) => { return dispatch(updateQuizQuestionOrder(prevIndex, nextIndex))},
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyApp)