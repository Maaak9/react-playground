import React from "react";
import axios from 'axios';

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

class SpotifyApp extends React.Component {
  constructor(props) {
    super(props);

    const url = window.location.href;
    const access_token = url.match(/(?<=access_token=)(.*)(?=&token)/g);

    this.state = {
      access_token,
    };

    console.warn('this.state', this.state);

    this.onClickGetAuth = this.onClickGetAuth.bind(this);
    this.getUsersDevices = this.getUsersDevices.bind(this);
    this.doOtherStuffy = this.doOtherStuffy.bind(this);

    if (this.state.access_token) {
      this.getUsersDevices();
    }
  }

  getUsersDevices() {
    console.warn('getUserdev');

    const config = {
      headers: {
        'Authorization': `Bearer ${this.state.access_token}`
      }
    };

    console.warn('config', config);

    fetch('https://api.spotify.com/v1/me', {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + this.state.access_token,
      })
    }).then((res) => {
      console.warn('res', res);
    })
    }

  onClickGetAuth() {
    console.warn('clicked auth!');

    const scopes = [
      'user-read-email',
      'user-read-private',
      'user-follow-read',
      'user-library-read',
      'user-read-playback-state',
      'user-library-modify',
      'user-read-currently-playing',
      'user-modify-playback-state',
      'user-follow-modify',
      'playlist-read-collaborative',
      'streaming',
      'user-top-read',
      'app-remote-control',
      'user-read-recently-played'
    ]


    const loginUrl = 'https://accounts.spotify.com/authorize' +
    '?response_type=token' +
    '&client_id=' + '059334fb1bcb4d8d91407121f11646e4' +
    '&scope=' + encodeURIComponent(scopes.join(', ')) +
    '&redirect_uri=' + encodeURIComponent('http://localhost:3000/spotify/');

    window.location.href = loginUrl;
  }

  doOtherStuffy() {
    console.warn('doOtherStuffy yeppyepp', this.state.oAuth2Spotify);

    const headers = {
      'Authorization': `Basic ${btoa({'059334fb1bcb4d8d91407121f11646e4': 'eb19a46b7ca9492598542b191634ce95'})}`
    }

    const body = {
      grant_type: 'authorization_code',
      code: this.state.oAuth2Spotify,
      redirect_uri: 'http://localhost:3000/spotify/',
      client_id: '059334fb1bcb4d8d91407121f11646e4',
      client_secret: 'eb19a46b7ca9492598542b191634ce95',
    };

    console.warn('headers', headers);
    console.warn('body', body);



    axios.post('https://accounts.spotify.com/api/token', body, {
      headers: headers
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  }


  render() {
    return (
      <div>
        <h2>spotify app should be here</h2>
        <button onClick={this.onClickGetAuth}>
          Autherize spotify?
        </button>
        <div>
          <button onClick={this.doOtherStuffy}>test the post thingy</button>
        </div>
      </div>
    )
  }
}

export default SpotifyApp;

