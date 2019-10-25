import React from "react";

export default function(props) {
  const { playTrack, title, items } = props;

  console.log('the list! ', props)

  return (
    <div className="spotify--list-tracks">
      <h2>{title}</h2>
      { items.map((item, index) => {
        return (
          <div
            onClick={() => { playTrack(item); }}
            key={`${item.id}`}
          >
            <div className="title-wrapper">
              <div>{`${item.name}`}</div>
              <div>{`${item.artists[0].name}`}</div>
            </div>
            <div>
              <img src={item.album.images[1].url} />
            </div>
          </div>
        );
      }) }
    </div>
  )

}