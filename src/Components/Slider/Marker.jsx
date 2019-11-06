import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

const SliderMarker = styled.div`
  margin-top: -5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #000;
  -ms-touch-action: pan-x;
  touch-action: pan-x;
  position: absolute;
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  background-color: #000;
  transform: translatex(-50%);
  outline: none;

  :focused {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
  :active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }

`;

export default class Marker extends React.Component {
  constructor(props) {
    super(props);

    this.onMouseDownStartHandler = this.onMouseDownStartHandler.bind(this);
    this.onTouchMoveHandler = this.onTouchMoveHandler.bind(this);
    this.onHandleOnTouchEnd = this.onHandleOnTouchEnd.bind(this);
  }

  onMouseDownStartHandler(e) {
    const { onDragMarker, markerKey, onDragMarkerEnd } = this.props;
    // class for curosr dragging
    document.body.classList.add('slider-dragging');
    onDragMarker(e, markerKey);

    // since onDrag dosent work so good in old browser we do it with mouse move instead
    document.onmousemove = (e) => {
      onDragMarker(e, markerKey);
    };

    document.onmouseup = (e) => {
      onDragMarkerEnd();
      document.onmousemove = null;
      document.onmouseup = null;
      // remove cursor dragging
      document.body.classList.remove('slider-dragging');
    };
  }

  onTouchMoveHandler(e) {
    const event = {
      pageX: e.touches[0].pageX,
      pageY: e.touches[0].pageY,
    };
    this.props.onDragMarker(this.props, event);
  }

  onHandleOnTouchEnd() {
    this.props.onDragMarkerEnd();
    // call and set isDragging false
    const body = document.body;
    body.classList.remove('slider-dragging');
  }

  render() {
    const { currentOffset } = this.props.marker;

    const style = {
      left: `${currentOffset}%`,
    };

    return (
      <SliderMarker
        style={style}
        tabIndex={1}
        onMouseDown={this.onMouseDownStartHandler}
        // onDragStart={this.onDragStartHandler}
        // onDrag={this.onDragHandler}
        onTouchMove={this.onTouchMoveHandler}
        // onDragEnd={this.onDragEndHandler}
        onTouchEnd={this.onHandleOnTouchEnd}
        // aria attribute
        role="slider"
      />
    );
  }
}

Marker.propTypes = {
  marker: PropTypes.object,
  className: PropTypes.string,
  markerKey: PropTypes.string,

  onDragMarker: PropTypes.func.isRequired,
  onDragMarkerEnd: PropTypes.func.isRequired,
};
