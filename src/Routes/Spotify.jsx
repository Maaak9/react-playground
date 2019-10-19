import React from "react";
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import Body from '../Layouts/Body';
import SpotifyApp from "../Components/Spotify/SpotifyApp";

import '../Css/Pages/Spotify.css';

class Home extends React.Component {
    render() {
      return (
          <div className="spotify-page">
              <Header />
              <Body>
                <SpotifyApp />
              </Body>
              <Footer />
          </div>
      )
    }
  }

export default Home;

