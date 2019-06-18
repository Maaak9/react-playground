import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Home from './Routes/Home';
import Users from './Routes/Users';
import About from './Routes/About';

function Index() {
  return <h2>Home</h2>;
}

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
        <Route path="/users/" component={Users} />
      </div>
    </Router>
  );
}

export default AppRouter;