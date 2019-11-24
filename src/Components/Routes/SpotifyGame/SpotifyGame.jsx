import React from "react";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import io from 'socket.io-client';
import styled from 'styled-components'

const SpotifyGameContainer = styled.div`
	width: 100%;
  height:100vh;
  background: #B0DCE8;

  .center {
    padding: 10px;
    width: 150px;
    height: 100px;
    background-color: red;

    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;

    margin: auto;
  }
`;

// import {
//   initSpotify,
// } from '../../../Redux/Actions/SpotifyActions';

// import {
//   // addQuizQuestion,
// } from "../../../Redux/Actions/SpotifyQuizCreator";


class SpotifyGameWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.socket = io('http://localhost:8000');
    this.socket.on('connect', function(){});

    this.onClickSendMsg = this.onClickSendMsg.bind(this);
  }

  onClickSendMsg() {
    console.log('about to send msg');

    this.socket.emit('chat message', 'coolt');
    this.socket.emit('test', { a: 1, hej: { wow: 'Hejhej', lel: 'cooolt' }});
  }

  render() {
    const {
    } = this.props;

    return (
      <SpotifyGameContainer>
        <div className="center">
          <button
            onClick={this.onClickSendMsg}
          >test to sen msg</button>
          <div>hejhej</div>
        </div>
      </SpotifyGameContainer>
    );
  }
};

function mapStateToProps(state) {
  console.log('the state 5555', state);
  return {
    // topTracks: state.spotify.topTracks,
    // currentTrack: state.spotify.currentTrack,
    // searchResult: state.spotify.searchResult,
    // devices: state.spotify.devices,
    // spotifyQuizCreator: state.spotifyQuizCreator,
  };
}

const mapDispatchToProps = (dispatch, props) => ({
  // initSpotify: () => { return dispatch(initSpotify()); },
});

SpotifyGameWrapper.propTypes = {
  // from state

  // Spotify Actions

  // SpotifyQuizCreator Actions
};

export default connect(mapStateToProps, mapDispatchToProps)(SpotifyGameWrapper);
