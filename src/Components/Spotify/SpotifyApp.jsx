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

import '../../styles/css/components/spotifyApp.css';

import TopTracks from './TopTracks';
import Search from './Search';
import SpotifyPlayer from './SpotifyPlayer';
import ListTracks from './ListTracks';
import SelectDevice from './SelectDevice';

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
    } = this.props;



    return (
      <React.Fragment>
        <div className="spotify-app">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper style={{ marginTop: 50, height: 200, padding: 10 }}>
              <h2>spotify app should be here</h2>
              <div className="spotify-button-wrapper">
                <button className="btn btn-secondary" onClick={() => getSpotifyAuth()}>
                  Autherize spotify?
                </button>
                <button className="btn btn-secondary" onClick={() => getTopTracks()}>Get the top tracks</button>
                <div>
                  <Search
                    spotifySearch={spotifySearch}
                  />
                </div>
              </div>
              {devices ? (<SelectDevice devices={devices} selectDevice={selectDevice} />) : null}
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper style={{ padding: 10, height: '100%' }}>
              <div>
                { topTracks ? (
                  <ListTracks
                    title={"Toptracks"}
                    items={topTracks.items}
                    playTrack={playTrack}
                  />
                ) : null
                }
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper style={{ padding: 10, height: '100%' }}>
              <div>
                { searchResult ? (
                  <ListTracks
                    title={"Search result"}
                    items={searchResult.tracks.items}
                    playTrack={playTrack}
                  />
                ) : null
                }
              </div>
            </Paper>
          </Grid>
        </Grid>
          <SpotifyPlayer
            currentTrack={currentTrack}
            playTrack={playTrack}
          />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyApp)