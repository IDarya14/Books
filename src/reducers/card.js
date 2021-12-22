const initialState = {
  card: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BOOK_TO_CARD':
      return { ...state, card: action.payload };
    default:
      return state;
  }
};
