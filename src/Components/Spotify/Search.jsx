import React, { useState } from 'react';

export default function(props) {
  const { spotifySearch } = props;

  console.warn('lelel props', props);

  const [searchText, setSearchText] = useState('');

  return (
    <div className="spotify--top-tracks">
      <input onChange={(e) => {setSearchText(e.target.value)}} placeholder="Search"></input>
      <button onClick={() => spotifySearch(searchText)}>Search</button>
    </div>
  )

}