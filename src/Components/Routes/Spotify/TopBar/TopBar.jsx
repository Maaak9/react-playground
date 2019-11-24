import React from "react";
import Button from '@material-ui/core/Button';
import SelectDevice from "./SelectDevice";
import Search from "./Search";

export default function(props) {
  const {
    getSpotifyAuth,
    getTopTracks,
    spotifySearch,
    devices,
    selectDevice,
  } = props;

  return (
    <React.Fragment>
      <div className="spotify-button-wrapper">
        <Button variant="contained" onClick={() => getSpotifyAuth()}>Autherize spotify?</Button>
        <Button variant="contained" onClick={() => getTopTracks()}>Get the top tracks</Button>
        <Search spotifySearch={spotifySearch} />
      </div>
      {devices ? (<SelectDevice devices={devices} selectDevice={selectDevice} />) : null}
    </React.Fragment>
  )

}