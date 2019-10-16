const defaultState = {
  spotifyTest: 'yeeeeppp',
  auth: {},
};


const SpotifyReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SPOTIFY_AUTH':
      return {
        ...state,
        auth: {
          authToken: action.authToken,
        },
      };
    case 'SET_TOP_TRACKS': {
      return {
        ...state,
        topTracks: action.topTracks,
      };
    }
    default:
      return state;
  }
}

export default SpotifyReducer;
