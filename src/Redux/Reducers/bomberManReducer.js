const defaultState = {
  testText: 'fasen va coolt ändå'
};


const bomberManReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}

export default bomberManReducer