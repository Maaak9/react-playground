import React from "react";
import Header from '../Layouts/Header';
import Footer from '../Layouts/Footer';
import Body from '../Layouts/Body';
import SpotifyGameWrapper from "../Components/Routes/SpotifyGame/SpotifyGame";

class SpotifyGame extends React.Component {
    render() {
      return (
        <div className="spotify-page">
          <SpotifyGameWrapper />
        </div>
      )
    }
  }

export default SpotifyGame;

