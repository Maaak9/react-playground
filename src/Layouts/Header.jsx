import React from "react";
import { Link } from "react-router-dom";
import '../css/layouts/header.css';

class Home extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="routes">
          <Link to="/">Home</Link>
          <Link to="/about/">About</Link>
          <Link to="/users/">Users</Link>
          <Link to="/game/">Game</Link>
          <Link to="/spotify/">Spotify</Link>
        </div>
      </div>
    );
  }
}

export default Home;
