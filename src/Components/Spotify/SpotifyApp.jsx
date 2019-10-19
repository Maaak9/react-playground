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

import TopTracks from './TopTracks';
import Search from './Search';
import SpotifyPlayer from './SpotifyPlayer';

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
      currentTrack
    } = this.props;

    return (
      <div className="spotify-app">
        <h2>spotify app should be here</h2>
        <button onClick={() => getSpotifyAuth()}>
          Autherize spotify?
        </button>
        <div>
          <button onClick={() => getTopTracks()}>Get the top tracks</button>
        </div>
        <div>
          <button onClick={() => spotifyPlayerPlay()}>Start</button>
        </div>
        <div>
          <button onClick={() => spotifyPlayerPause()}>Pause</button>
        </div>
        <SpotifyPlayer
          currentTrack={currentTrack}
          playTrack={playTrack}
        />
        <div>
          { topTracks ? (
            <TopTracks
              topTracks={topTracks}
              playTrack={playTrack}
            />
          ) : null}
        </div>
        <div>
          <img src="https://i.ibb.co/pdwJ6nm/winamp-blog.jpg" />
        </div>
        <div>
          <Search
            spotifySearch={spotifySearch}
          />
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