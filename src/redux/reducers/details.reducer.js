const detailsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_DETAILS':
        console.log('set details', action.payload);
        return action.payload;
      case 'EMPTY_DETAILS':
        return {};
      default:
        return state;
    }
  };
  

  export default detailsReducer;
  