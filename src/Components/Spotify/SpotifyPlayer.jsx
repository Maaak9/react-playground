import React from "react";
import Slider from '../Slider/RangeSlider';
import debounce from '../../Util/debounce.js';

export default class SpotifyPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }

    this.onChangeSlider = debounce(this.onChangeSlider.bind(this), 100);
    this.onAfterChange = this.onAfterChange.bind(this);
  }

  onAfterChange(e) {
    const { playTrack, currentTrack } = this.props;
    console.log('after ', e);

    const positionMs = (e[0] / 100) * currentTrack.duration_ms;

    playTrack(currentTrack.uri, positionMs);
  }

  onChangeSlider(e) {
    const { playTrack, currentTrack } = this.props;
    console.log('change ', e[0])

    console.log((100 / e[0]));
    console.log(currentTrack.duration_ms);

    const positionMs = Math.floor((e[0] / 100 ) * currentTrack.duration_ms);

    playTrack(currentTrack, positionMs);
  }

  render() {
    const {
      currentTrack,
    } = this.props;

    if (!currentTrack) return null;

    console.warn('');


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
