import React from "react";
import DialogContainer from "../Dialog/DialogContainer";

export default function(props) {
  const {
    playTrack,
    title,
    items,
    addQuizQuestion,
    removeQuizQuestion
  } = props;

  console.log('44444', props);


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
              addQuizQuestion={addQuizQuestion}
              removeQuizQuestion={removeQuizQuestion}
            />
          </div>
        );
      }) }
    </div>
  )

}