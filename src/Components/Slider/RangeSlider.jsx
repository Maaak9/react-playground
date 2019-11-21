import React, { Component } from 'react';
import debounce from '../../Util/debounce.js';
import Marker from './Marker';
import { SliderContainer, BackgroundTrack, IntervalTrack, SliderTrack } from '../../styles/css/components/RangeSlider.js';

const createId = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

class RangeSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isDragActive: false,
      trackSize: null,
      marker0: {
        currentOffset: props.marker0.initialOffset,
        initialOffset: props.marker0.initialOffset,
      },
      marker1: {
        currentOffset: props.marker1.initialOffset,
        initialOffset: props.marker1.initialOffset,
      },
    };

    this.id = createId();

    this.resizeListener = debounce(this.resizeListener.bind(this), 100);
    this.onDragMarker = this.onDragMarker.bind(this);
    this.onDragMarkerEnd = this.onDragMarkerEnd.bind(this);
    this.calculateNewValues = this.calculateNewValues.bind(this);
    this.onClickTrack = this.onClickTrack.bind(this);
  }

  componentDidMount() {
    const { width, left } = document.getElementById(this.id).getBoundingClientRect();

    this.setState({
      trackSize: width,
      trackLeft: left,
    });

    window.addEventListener('resize', this.resizeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  onClickTrack(e) {
    const { width, left } = document.getElementById(this.id).getBoundingClientRect();
    const event = { pageX: e.pageX, pageY: e.pageY };
    this.setState({
      trackSize: width,
      trackLeft: left,
    }, () => {
      const { trackLeft, trackSize, marker0, marker1 } = this.state;

      const offset = ((event.pageX - trackLeft) / trackSize) * 100;
      const marker0Diff = Math.abs(offset - marker0.currentOffset);
      const marker1Diff = Math.abs(offset - marker1.currentOffset);

      // Check which is closeset
      if (marker0Diff <= marker1Diff) {
        this.setState({
          marker0: {
            ...this.state.marker0,
            onDragStart: {
              pageX: event.pageX,
              pageY: event.pageY,
            },
            currentOffset: offset,
            initialOffset: offset,
          },
        }, () => this.calculateNewValues());
      } else {
        this.setState({
          marker1: {
            ...this.state.marker1,
            onDragStart: {
              pageX: event.pageX,
              pageY: event.pageY,
            },
            currentOffset: offset,
            initialOffset: offset,
          },
        }, () => this.calculateNewValues());
      }
    });
  }

  onDragMarkerEnd() {
    this.setState({
      isDragActive: false,
      marker0: {
        ...this.state.marker0,
        initialOffset: this.state.marker0.currentOffset,
      },
      marker1: {
        ...this.state.marker1,
        initialOffset: this.state.marker1.currentOffset,
      },
    });
  }

  onDragMarker(e, marker) {
    if (e.pageX === 0) return;
    const { isDragActive } = this.state;

    if (!isDragActive) {
      this.setState({
        isDragActive: true,
        [marker]: {
          ...this.state[marker],
          onDragStart: {
            pageX: e.pageX,
            pageY: e.pageY,
          },
        },
      });
    } else {
      const { onDragStart, initialOffset } = this.state[marker];
      const { trackSize } = this.state;
      const diffPercentage = parseFloat(((e.pageX - onDragStart.pageX) / (trackSize / 100)));
      let newOffset = initialOffset + diffPercentage;

      if (newOffset > 100) newOffset = 100;
      if (newOffset < 0) newOffset = 0;

      if (diffPercentage !== 0) {
        this.setState({
          [marker]: {
            ...this.state[marker],
            currentOffset: newOffset,
          },
        }, this.calculateNewValues());
      }
    }
  }

  resizeListener() {
    // Update tracksize if resize
    const element = document.getElementById(this.id);
    if (element) {
      const { width, left } = element.getBoundingClientRect();
      this.setState({
        trackSize: width,
        trackLeft: left,
      });
    }
  }

  calculateNewValues() {
    const { min, max, onChange } = this.props;
    const { marker0, marker1 } = this.state;
    const interval = max - min;
    const marker0Value = ((marker0.currentOffset / 100) * interval) + min;
    const marker1Value = ((marker1.currentOffset / 100) * interval) + min;

    let result = [];
    if (marker0Value > marker1Value) {
      result = [marker1Value, marker0Value];
    } else {
      result = [marker0Value, marker1Value];
    }

    onChange(result);
  }

  render() {
    const { trackSize, marker0, marker1 } = this.state;
    let min, max;

    if (marker0.currentOffset < marker1.currentOffset) {
      min = marker0.currentOffset;
      max = marker1.currentOffset;
    } else {
      min = marker1.currentOffset;
      max = marker0.currentOffset;
    }

    const style = {
      left: `${this.props.marker0.currentOffset || min}%`,
      width: `${(this.props.marker1.currentOffset || max) - (this.props.marker0.currentOffset || min)}%`,
    };

    return (
      <SliderContainer className="kuuken">
        <BackgroundTrack />
        <IntervalTrack style={style} />
        <SliderTrack
          id={this.id}
          onClick={this.onClickTrack}
        />
        { trackSize ? (
        <React.Fragment>
          <Marker
            markerKey="marker0"
            onDragMarker={this.onDragMarker}
            onDragMarkerEnd={this.onDragMarkerEnd}
            marker={{
              ...marker0,
              currentOffset: this.props.marker0.currentOffset || marker0.currentOffset,
            }}
          />
          <Marker
            markerKey="marker1"
            onDragMarker={this.onDragMarker}
            onDragMarkerEnd={this.onDragMarkerEnd}
            marker={{
              ...marker1,
              currentOffset: this.props.marker1.currentOffset || marker1.currentOffset,
            }}
          />
        </React.Fragment>
        ) : ''
        }
      </SliderContainer>
    );
  }
}

RangeSlider.defaultProps = {
  className: null,
  min: 0,
  max: 100,
  marker0: {
    initialOffset: 0,
    className: 'marker-1',
  },
  marker1: {
    initialOffset: 100,
    className: 'marker-2',
  },
};

export default RangeSlider;
