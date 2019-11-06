import styled from 'styled-components'

export const SliderContainer = styled.div`
  position: relative;
  height: 14px;
  padding: 5px 0;
  width: 100%;
  border-radius: 6px;
  -ms-touch-action: none;
  touch-action: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

export const BackgroundTrack = styled.div`
  position: absolute;
  width: 100%;
  background-color: #e9e9e9;
  height: 4px;
  border-radius: 6px;
  width: calc(100% + 16px);
  margin-left: -8px;
`;

export const IntervalTrack = styled.div`
  position: absolute;
  left: 0;
  height: 3px;
  border-radius: 6px;
  background-color: #000;
  left: 0%;
  width: 50%;
`;

export const SliderTrack = styled.div`
  position: absolute;
  width: 100%;
  background-color: #e9e9e9;
  height: 4px;
  border-radius: 6px;
  padding-top: 10px;
  padding-bottom: 6px;
  background: transparent;
  margin-top: -6px;
`;