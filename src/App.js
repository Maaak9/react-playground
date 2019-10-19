import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'

import Home from './Routes/Home';
import Users from './Routes/Users';
import About from './Routes/About';
import Game from './Routes/Game';
import Spotify from './Routes/Spotify';

import SpotifyReducer from './/Redux/Reducers/SpotifyReducer';
import bomberManReducer from './Redux/Reducers/bomberManReducer';



const store = createStore(combineReducers({
  bomberman: bomberManReducer,
  spotify: SpotifyReducer
}),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
  //applyMiddleware(thunk),
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function AppRouter() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
          <Route path="/game/" component={Game} />
          <Route path="/Spotify/" component={Spotify} />
        </div>
      </Router>
    </Provider>
  );
}

export default AppRouter;