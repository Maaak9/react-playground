import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './Routes/Home';
import Users from './Routes/Users';
import About from './Routes/About';
import Game from './Routes/Game';

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
        <Route path="/game/" component={Game} />
      </div>
    </Router>
  );
}

export default AppRouter;