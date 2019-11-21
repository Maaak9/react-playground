
export const addQuizQuestion = (question) => (dispatch) => {
  dispatch({
    type: 'ADD_QUIZ_QUESTION',
    question,
  });
};

export const updateQuizQuestionOrder = (prevIndex, nextIndex) => (dispatch, getState) => {
  const { quizQuestions } = getState().spotifyQuizCreator;

  const newQuestionArray = quizQuestions.slice();
  const questionToMove = newQuestionArray.splice(prevIndex, 1);
  newQuestionArray.splice(nextIndex, 0, questionToMove[0]);
  dispatch({ type: 'UPDATE_QUIZ_QUESTION_ORDER', newQuestionArray });
};

export const removeQuizQuestion = (track) => (dispatch, getState) => {
  const { quizQuestions } = getState().spotifyQuizCreator;
  const newQuestionArray = quizQuestions.slice();
  const index = quizQuestions.findIndex((t) => track.id === t.track.id);
  newQuestionArray.splice(index, 1);

  dispatch({
    type: 'REMOVE_QUIZ_QUESTION',
    newQuestionArray,
  });
};