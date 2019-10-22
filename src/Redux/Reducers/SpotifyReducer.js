import { SET_CURRENT_TRACK, SET_SPOTIFY_SEARCH_RESULT } from '../Actions/SpotifyActions';

const defaultState = {
  spotifyTest: 'yeeeeppp',
  auth: {},
};


const SpotifyReducer = (state = defaultState, action) => {
  console.warn('action.type', action.type);

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
    case SET_CURRENT_TRACK: {
      return {
        ...state,
        currentTrack: action.track,
      };
    }
    case SET_SPOTIFY_SEARCH_RESULT: {
      return {
        ...state,
        searchResult: action.searchData,
      };
    }
    default:
      return state;
  }
}

export default SpotifyReducer;
