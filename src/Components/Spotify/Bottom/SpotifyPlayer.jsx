import React from "react";
import Slider from '../../Slider/RangeSlider';
import debounce from '../../../Util/debounce.js';
import styled from 'styled-components';

const SpotifyPlayerWrapper = styled.div`
  display: flex;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 10px 20px 10px 20px;
  border-radius: 5px;
  background: #80B7A7;

  .left-container img{
    width: 75px;
  }
  .spotify-player--slider-track {
    flex-grow: 1;
    margin: auto 20px 4px 40px;
  }
  .controllers {
    text-align: center;
    margin: 10px;
  }
  .controllers button {
    margin: 0 5px 0 5px;
  }
  .left-container {
    display: flex;
  }
  .artist-track {
    font-size: 12px;
    margin: auto auto auto 10px;
  }
`;


export default class SpotifyPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onChangeSlider = debounce(this.onChangeSlider.bind(this), 100);
    this.onAfterChange = this.onAfterChange.bind(this);
  }

  onAfterChange(e) {
    const { playTrack, currentTrack } = this.props;
    const positionMs = (e[0] / 100) * currentTrack.duration_ms;

    playTrack(currentTrack.uri, positionMs);
  }

  onChangeSlider(e) {
    const { playTrack, currentTrack } = this.props;
    const trackInterval = {
      positionStartMs: Math.floor((e[0] / 100 ) * currentTrack.duration_ms),
      positionEndMs: Math.floor((e[1] / 100 ) * currentTrack.duration_ms)
    };
    playTrack(currentTrack, trackInterval);
  }

  render() {
    const {
      currentTrack,
    } = this.props;

    if (!currentTrack) return null;

    // <button className="btn btn-secondary" onClick={() => spotifyPlayerPlay()}>Start</button>
    // <button className="btn btn-secondary" onClick={() => spotifyPlayerPause()}>Pause</button>

    return (
      <SpotifyPlayerWrapper>
        <div className="left-container">
          <img src={currentTrack.album.images[0].url} />
          <div className="artist-track">
            <div>{currentTrack.artists[0].name}</div>
            <div>{currentTrack.name}</div>
          </div>
        </div>
        <div className="spotify-player--slider-track">
          <div className="controllers">
            <button className="btn btn-secondary">+</button>
            <button className="btn btn-secondary">S/P</button>
          </div>
          <Slider
            className="track"
            minn={0}
            max={100}
            marker0={{
              initialOffset: 0,
              className: 'marker-1',
            }}
            marker1={{
              initialOffset: 100,
              className: 'marker-2',
            }}
            onChange={this.onChangeSlider}
            onAfterChange={this.onAfterChange}
          />
        </div>
      </SpotifyPlayerWrapper>
    );
  }
};
