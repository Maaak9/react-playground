
export const addQuizQuestion = (question) => (dispatch) => {
  dispatch({
    type: 'ADD_QUIZ_QUESTION',
    question,
  });
};

export const updateQuizQuestionOrder = (prevIndex, nextIndex) => (dispatch, getState) => {
  console.log('updateQuizQuestionOrder', prevIndex, nextIndex);
  const { quizQuestions } = getState().spotifyQuizCreator;

  let newQuestionArray = quizQuestions.slice();
  const questionToMove = newQuestionArray.splice(prevIndex, 1);
  newQuestionArray.splice(nextIndex, 0, questionToMove[0]);

  console.log('newQuestionArray', newQuestionArray);


  dispatch({ type: 'UPDATE_QUIZ_QUESTION_ORDER', newQuestionArray });
};