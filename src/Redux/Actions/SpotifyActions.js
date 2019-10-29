import { SPOTIFY_REDIRECT_URL } from '../../env.js';

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
  const encodedRedirectUri = `&redirect_uri=${encodeURIComponent(SPOTIFY_REDIRECT_URL)}`;

  const loginUrl = `${spotifyAuthUrl}${clientId}${encodedScopes}${encodedRedirectUri}`;
  window.location.href = loginUrl;
};

export const selectDevice = (device) => (dispatch) => {
  dispatch({ type: 'SET_SELECTED_DEVICE', device });
};

export const getAvailableDevices = () => (dispatch) => {
  spotifyApi.getMyDevices().then((data) => {
    dispatch({ type: 'SET_AVAILABLE_DEVICES', devices: data.devices });
    // if we have device set first one as default
    if (data.devices.length > 0) {
      dispatch(selectDevice(data.devices[0]));
    }
  }, (err) => { console.warn('Something went wrong!', err); });
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

export const getTopTracks = () => (dispatch) => {
  spotifyApi.getMyTopTracks({
    limit: '50',
  }).then((data) => {
    dispatch({ type: 'SET_TOP_TRACKS', topTracks: data });
  }, (err) => {
    console.warn('Something went wrong!', err);
  });
};

export const spotifyPlayerPlay = () => (dispatch, getState) => {
  spotifyApi.getMyCurrentPlaybackState({}).then((data) => {
  }, function(err) {
    console.warn('Something went wrong!', err);
  });

  spotifyApi.play({
    context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
    position_ms: 10000,
    offset: {
      position: 5,
    },
  }).then((data) => {}, (err) => { console.warn('Something went wrong!', err); });
};

export const spotifyPlayerPause = () => (dispatch, getState) => {
  spotifyApi.pause({}).then((data) => {
  }, (err) => { console.warn('Something went wrong!', err); });
};

export const spotifySearch = (searchText) => (dispatch, getState) => {
  spotifyApi.searchTracks(searchText, { limit: 20 }).then((data) => {
    dispatch({ type: 'SET_SPOTIFY_SEARCH_RESULT', searchData: data });
  }, (err) => { console.warn('Something went wrong!', err); });
};

export const playTrack = (track, trackInterval) => (dispatch, getState) => {
  const interval = {
    ...{
      positionStartMs: 0,
      positionEndMs: 20000,
    },
    ...trackInterval,
  };

  const { selectedDevice } = getState().spotify;

  dispatch({
    type: 'SET_CURRENT_TRACK',
    track,
    interval,
  });

  spotifyApi.play({
    device_id: selectedDevice.id,
    uris: [track.uri],
    position_ms: interval.positionStartMs,
  }).then((data) => {}, (err) => { console.warn('Something went wrong!', err); });
};
