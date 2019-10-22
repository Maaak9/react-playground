import React from "react";
//import '../../css/components/topTracks.css';

export default function(props) {
  console.warn('this is the props', props);

  const { items } = props.topTracks;
  const { playTrack } = props;

  console.warn('items', items);

  return (
    <div className="spotify--top-tracks">
      <h2>Top Tracks!</h2>
      <ul>
        { items.map((item, index) => {
          return (
            <li
              onClick={() => { playTrack(item); }}
              key={`${item.artists[0].name} - ${item.name}`}
            >
              <div>
                {`${index + 1}: ${item.artists[0].name} - ${item.name}`}
              </div>
              <div>
                <img src={item.album.images[1].url} />
              </div>
            </li>
          );
        }) }
      </ul>
    </div>
  )

}