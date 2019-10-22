
const defaultState = {
  gameState: {
    active: false,
    quizLoaded: false,
    nrOfPlayers: null,
  },
  quiz: {
    list: [],
  },
};


const SpotifyQuizReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default SpotifyQuizReducer;
