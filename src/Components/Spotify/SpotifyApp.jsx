import React from "react";
import axios from 'axios';

import TopTracks from './TopTracks';

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
      res.json().then((json) => {
        console.warn('json response', json);
      });
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

/*
      body: JSON.stringify({ type: 'tracks' }),
*/

  doOtherStuffy() {
    fetch("https://api.spotify.com/v1/me/top/tracks", {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + this.state.access_token,
      })
    }).then((res) => {
      res.json().then((json) => {
        console.warn('json response', json);
        this.setState({ topTracks: json });
      });
    })

  }


  render() {
    const { topTracks } = this.state;

    return (
      <div>
        <h2>spotify app should be here</h2>
        <button onClick={this.onClickGetAuth}>
          Autherize spotify?
        </button>
        <div>
          <button onClick={this.doOtherStuffy}>Get the top tracks</button>
        </div>
        { this.state.topTracks ? (
          <TopTracks
            topTracks={topTracks}
          />
        ) : null}
      </div>
    )
  }
}

export default SpotifyApp;

