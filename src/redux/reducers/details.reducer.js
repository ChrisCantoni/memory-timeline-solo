const detailsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DETAILS':
        console.log('set details', action.payload);
        return action.payload;
      default:
        return state;
    }
  };
  

  export default detailsReducer;
  