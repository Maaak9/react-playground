import React from "react";
import Slider from '../../Slider/RangeSlider';
import debounce from '../../../Util/debounce.js';

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
      <div className="spotify-player">
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
      </div>
    );
  }
};
