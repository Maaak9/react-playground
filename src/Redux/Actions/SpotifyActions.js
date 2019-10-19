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
}

export const initSpotify = () => (dispatch, getState) => {
  const { authToken } = getState().spotify.auth;

  if (!authToken) {
    const url = window.location.href;
    const token = url.match(/(?<=access_token=)(.*)(?=&token)/g);
    if (token) {
      spotifyApi.setAccessToken(token[0]);
      dispatch({ type: 'SET_SPOTIFY_AUTH', authToken: token[0] });
    }
  }
};

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
  console.warn('qwewewew');
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
    console.warn("Now Playing: ", data);
  }, (err) => {
    console.warn('Something went wrong!', err);
  });
};

export const spotifyPlayerPause = () => (dispatch, getState) => {
  console.warn('about to pause?');

  spotifyApi.pause({}).then((data) => {
    console.warn("Pause: ", data);
  }, (err) => {
    console.warn('Something went wrong!', err);
  });
};

export const SpotifySearch = (searchText) => (dispatch, getState) => {
  console.warn('searchText', searchText);

  spotifyApi.searchTracks(searchText).then((data) => {
    console.warn("Search: ", data);
  }, (err) => {
    console.warn('Something went wrong!', err);
  });
};