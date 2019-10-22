import React from "react";
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

import '../../css/components/spotifyApp.css';

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
        <a data-toggle="modal" href="#myModal" class="btn btn-primary btn-large">Launch demo modal</a>

        <div id="myModal" className="modal" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Modal body text goes here.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <div className="spotify-app">
          <h2>spotify app should be here</h2>
          <div className="spotify-button-wrapper">
            <button className="btn btn-secondary" onClick={() => getSpotifyAuth()}>
              Autherize spotify?
            </button>
            <button className="btn btn-secondary" onClick={() => getTopTracks()}>Get the top tracks</button>
            <button className="btn btn-secondary" onClick={() => spotifyPlayerPlay()}>Start</button>
            <button className="btn btn-secondary" onClick={() => spotifyPlayerPause()}>Pause</button>
          </div>
          {devices ? (<SelectDevice devices={devices} selectDevice={selectDevice} />) : null}
          <SpotifyPlayer
            currentTrack={currentTrack}
            playTrack={playTrack}
          />
          <div>
            <Search
              spotifySearch={spotifySearch}
            />
          </div>
          <div>
            { searchResult ? (
              <ListTracks
                searchResult={searchResult}
                playTrack={playTrack}
              />
            ) : null
            }
          </div>
          <div>
            { topTracks ? (
              <TopTracks
                topTracks={topTracks}
                playTrack={playTrack}
              />
            ) : null}
          </div>
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