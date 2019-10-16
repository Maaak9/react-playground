import React from "react";
import { connect } from 'react-redux'

import { initSpotify, getSpotifyAuth, getTopTracks } from '../../Redux/Actions/SpotifyActions';
import TopTracks from './TopTracks';

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
    } = this.props;

    console.warn();


    return (
      <div>
        <h2>spotify app should be here</h2>
        <button onClick={() => getSpotifyAuth()}>
          Autherize spotify?
        </button>
        <div>
          <button onClick={() => getTopTracks()}>Get the top tracks</button>
        </div>
        <div>
          { topTracks ? (
            <TopTracks
              topTracks={topTracks}
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
  };
}

const mapDispatchToProps = (dispatch, props) => ({
  initSpotify: () => { return dispatch(initSpotify()); },
  getSpotifyAuth: () => { return dispatch(getSpotifyAuth()); },
  getTopTracks: () => { return dispatch(getTopTracks()); },
})

// const mapDispatchToProps = dispatch => {
//   return {
//     initSpotify: dispatch(initSpotify()),
//     getSpotifyAuth: dispatch(getSpotifyAuth()),
//   }
// }


export default connect(mapStateToProps, mapDispatchToProps)(SpotifyApp)
// export default SpotifyApp;

