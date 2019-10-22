import React from "react";

export default function(props) {
  console.warn('this is the props', props);

  console.log('props.searcbResult.tracks', props.searchResult.tracks);


  const { items } = props.searchResult.tracks;
  const { playTrack } = props;

  console.warn('items', items);

  return (
    <div className="spotify--search-result">
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