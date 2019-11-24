import React from "react";
import ListTracks from "../ListTracks";

export default function(props) {
  const {
    topTracks,
    playTrack,
    addQuizQuestion,
  } = props;

  return (
    <React.Fragment>
      { topTracks ? (
        <ListTracks
          addQuizQuestion={addQuizQuestion}
          title={"Toptracks"}
          items={topTracks.items}
          playTrack={playTrack}
        />
      ) : null
      }
    </React.Fragment>
  )

}