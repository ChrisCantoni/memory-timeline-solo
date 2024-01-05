const timelineReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_TIMELINES':
        return action.payload;
    //   case 'SET_TIMELINE':
    //     return action.payload;
      default:
        return state;
    }
  };
  

  export default timelineReducer;
