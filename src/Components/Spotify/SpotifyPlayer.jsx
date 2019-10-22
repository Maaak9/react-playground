import React from "react";
import Slider from '../Slider/RangeSlider';
import debounce from '../../Util/debounce.js';
import '../../css/components/spotifyPlayer.css';


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

    return (
      <div className="spotify-player">
        <div>{`Currently playing: ${currentTrack.artists[0].name} - ${currentTrack.name}`}</div>
        <div>
          {`time left: ${Math.floor(currentTrack.duration_ms / 1000)}`}
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
