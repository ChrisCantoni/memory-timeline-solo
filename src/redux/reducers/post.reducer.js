const postReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_POSTS':
        return action.payload;
    //   case 'SET_POSTS':
    //     return action.payload;
      default:
        return state;
    }
  };
  

  export default postReducer;
  