export const SET_CURRENT_TRACK = 'SET_CURRENT_TRACK';
export const SET_SPOTIFY_SEARCH_RESULT = 'SET_SPOTIFY_SEARCH_RESULT';
export const SET_AVAILABLE_DEVICES = 'SET_AVAILABLE_DEVICES';
export const SET_SELECTED_DEVICE = 'SET_SELECTED_DEVICE';

const SpotifyWebApi = require('spotify-web-api-js');
const spotifyApi = new SpotifyWebApi();

export const getSpotifyAuth = () => () => {
  const scopes = [
    'user-read-email', 'user-read-private', 'user-follow-read', 'user-library-read',
    'user-read-playback-state', 'user-library-modify','user-read-currently-playing',
    'user-modify-playback-state','user-follow-modify','playlist-read-collaborative',
    'streaming', 'user-top-read', 'app-remote-control', 'user-read-recently-played',
  ];

  const clientId = '&client_id=059334fb1bcb4d8d91407121f11646e4';
  const spotifyAuthUrl = 'https://accounts.spotify.com/authorize?response_type=token';
  const encodedScopes = `&scope=${encodeURIComponent(scopes.join(', '))}`;
  const encodedRedirectUri = `&redirect_uri=${encodeURIComponent('http://localhost:3000/spotify/')}`;

  const loginUrl = `${spotifyAuthUrl}${clientId}${encodedScopes}${encodedRedirectUri}`;
  window.location.href = loginUrl;
};

export const initSpotify = () => (dispatch, getState) => {
  const { authToken } = getState().spotify.auth;

  if (!authToken) {
    const url = window.location.href;
    const token = url.match(/(?<=access_token=)(.*)(?=&token)/g);
    if (token) {
      spotifyApi.setAccessToken(token[0]);
      dispatch({ type: 'SET_SPOTIFY_AUTH', authToken: token[0] });
      dispatch(getAvailableDevices());
    }
  }
};

export const getAvailableDevices = () => (dispatch, getState) => {
  console.log('getMyDevices');
  spotifyApi.getMyDevices().then((data) => {
    console.log("getMyDevices: ", data);
    dispatch({ type: SET_AVAILABLE_DEVICES, devices: data.devices });
  }, (err) => { console.warn('Something went wrong!', err); });
};

export const selectDevice = (device) => (dispatch, getState) => {
  console.log('selectDevice', device);
  dispatch({ type: SET_SELECTED_DEVICE, device });
}

export const getTopTracks = () => (dispatch, getState) => {
  spotifyApi.getMyTopTracks({
    limit: '50',
  }).then((data) => {
    console.warn("Now Playing: ", data);
    dispatch({ type: 'SET_TOP_TRACKS', topTracks: data });
  }, (err) => {
    console.warn('Something went wrong!', err);
  });
};

export const spotifyPlayerPlay = () => (dispatch, getState) => {
  spotifyApi.getMyCurrentPlaybackState({}).then((data) => {
    console.warn("Now Playing: ", data);
  }, function(err) {
    console.warn('Something went wrong!', err);
  });

  spotifyApi.play({
    context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
    position_ms: 10000,
    offset: {
      position: 5,
    },
  }).then((data) => {
    console.log("Now Playing: ", data);
  }, (err) => { console.warn('Something went wrong!', err); });
};

export const spotifyPlayerPause = () => (dispatch, getState) => {
  spotifyApi.pause({}).then((data) => {
    console.log("Pause: ", data);
  }, (err) => { console.warn('Something went wrong!', err); });
};

export const spotifySearch = (searchText) => (dispatch, getState) => {
  spotifyApi.searchTracks(searchText, { limit: 20 }).then((data) => {
    console.log("Search: ", data);
    dispatch({ type: SET_SPOTIFY_SEARCH_RESULT, searchData: data });
  }, (err) => { console.warn('Something went wrong!', err); });
};

export const playTrack = (track, positionMs = 0) => (dispatch, getState) => {
  console.warn('about to play the uri', track, positionMs);
  const { selectedDevice } = getState().spotify;

  dispatch({
    type: SET_CURRENT_TRACK,
    track,
  });

  spotifyApi.play({
    device_id: selectedDevice.id,
    uris: [track.uri],
    position_ms: positionMs,
  }).then((data) => {
    console.warn("play: ", data);
  }, (err) => { console.warn('Something went wrong!', err); });
};
