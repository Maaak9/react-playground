import React from "react";
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import SpotifyApp from "../Components/Routes/Spotify/SpotifyApp";


class SpotifyQuizCreator extends React.Component {
    render() {
      return (
        <div className="spotify-page">
          <Header />
            <SpotifyApp />
          <Footer />
        </div>
      )
    }
  }

export default SpotifyQuizCreator;

