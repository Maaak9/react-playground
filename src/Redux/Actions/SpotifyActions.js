
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
      dispatch({ type: 'SET_SPOTIFY_AUTH', authToken: token[0] });
    }
  }
}

export const getTopTracks = () => (dispatch, getState) => {
  const { authToken } = getState().spotify.auth;

  fetch('https://api.spotify.com/v1/me/top/tracks', {
    method: 'get',
    headers: new Headers({
      Authorization: `Bearer  ${authToken}`,
    }),
  }).then((res) => {
    res.json().then((json) => {
      dispatch({ type: 'SET_TOP_TRACKS', topTracks: json });
    });
  });
};

