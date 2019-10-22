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
} from '../../Redux/Actions/SpotifyActions';

import '../../css/components/spotifyApp.css';

import TopTracks from './TopTracks';
import Search from './Search';
import SpotifyPlayer from './SpotifyPlayer';
import ListTracks from './ListTracks';

class SpotifyApp extends React.Component {
  constructor(props) {
    super(props);

    props.initSpotify();
  }

  render() {
    console.warn('props?', this.props);
    const {
      getTopTracks,
      getSpotifyAuth,
      topTracks,
      spotifyPlayerPlay,
      spotifyPlayerPause,
      spotifySearch,
      playTrack,
      currentTrack,
      searchResult
    } = this.props;



    return (
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
    )
  }
};

function mapStateToProps(state) {
  console.warn('the state 5555', state);
  return {
    topTracks: state.spotify.topTracks,
    currentTrack: state.spotify.currentTrack,
    searchResult: state.spotify.searchResult,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyApp)