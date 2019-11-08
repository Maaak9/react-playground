import React from "react";

export default function(props) {
  const {
    devices,
    selectDevice,
  } = props;

  return (
    <div className="spotify--select-device">
      { devices.map((device) => {
        return (
          <div onClick={() => selectDevice(device)}>{`${device.name} - ${device.type}`}</div>
        )
      }) }
    </div>
  )

}