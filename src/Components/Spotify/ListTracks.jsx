import React from "react";
import Button from '@material-ui/core/Button';
import DialogContainer from "../Dialog/DialogContainer";

export default function(props) {
  const { playTrack, title, items } = props;

  console.log('the list! ', props)

  return (
    <div className="spotify--list-tracks">
      <h2>{title}</h2>
      { items.map((track, index) => {
        return (
          <div
            onClick={() => { playTrack(track); }}
            key={`${track.id}`}
          >
            <div className="title-wrapper">
              <div>{`${track.name}`}</div>
              <div>{`${track.artists[0].name}`}</div>
            </div>
            <div>
              <img src={track.album.images[1].url} />
            </div>
            <DialogContainer
              track={track}
            />
          </div>
        );
      }) }
    </div>
  )

}