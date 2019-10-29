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
    case 'SET_CURRENT_TRACK': {
      return {
        ...state,
        currentTrack: action.track,
        interval: action.interval,
      };
    }
    case 'SET_SPOTIFY_SEARCH_RESULT': {
      return {
        ...state,
        searchResult: action.searchData,
      };
    }
    case 'SET_AVAILABLE_DEVICES': {
      return {
        ...state,
        devices: action.devices,
      };
    }
    case 'SET_SELECTED_DEVICE': {
      return {
        ...state,
        selectedDevice: action.device,
      };
    }
    default:
      return state;
  }
};

export default SpotifyReducer;
