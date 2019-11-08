import React from "react";
import ListTracks from "../ListTracks";

export default function(props) {
  const {
    searchResult,
    playTrack,
  } = props;

  return (
    <React.Fragment>
      { searchResult ? (
        <ListTracks
          title={"Search result"}
          items={searchResult.tracks.items}
          playTrack={playTrack}
        />
      ) : null
      }
    </React.Fragment>
  )

}