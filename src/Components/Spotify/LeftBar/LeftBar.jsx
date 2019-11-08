import React from "react";
import ListTracks from "../ListTracks";

export default function(props) {
  const {
    topTracks,
    playTrack,
  } = props;

  return (
    <React.Fragment>
      { topTracks ? (
        <ListTracks
          title={"Toptracks"}
          items={topTracks.items}
          playTrack={playTrack}
        />
      ) : null
      }
    </React.Fragment>
  )

}