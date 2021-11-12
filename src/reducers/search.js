const initialState = {
  searchTitle: ''
};

export default (state = initialState, action) => {
  switch(action.type){
    case 'SEARCH_BOOK': 
    return {
      ...state, 
      searchTitle: action.payload
    }
  }
  return state;
};