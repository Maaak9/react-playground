import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Home from './Routes/Home';
import Users from './Routes/Users';
import About from './Routes/About';
import Game from './Routes/Game';

import bomberManReducer from './Redux/Reducers/bomberManReducer';



const store = createStore(bomberManReducer);

function AppRouter() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
          <Route path="/game/" component={Game} />
        </div>
      </Router>
    </Provider>
  );
}

export default AppRouter;