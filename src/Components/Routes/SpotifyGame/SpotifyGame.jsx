import React from "react";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux'
import io from 'socket.io-client';
import styled from 'styled-components'

const SpotifyGameContainer = styled.div`
  margin-top: 40px;
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
        <Grid item container>
          <button onClick={this.onClickSendMsg}>test to sen msg</button>
          <div>
            <h2>hejhje</h2>
          </div>
        </Grid>
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
