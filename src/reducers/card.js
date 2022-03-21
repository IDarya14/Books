const chosenBooks = localStorage.getItem('books');
const cardBooks = JSON.parse(chosenBooks);

const initialState = {
  card: cardBooks ? cardBooks : [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_BOOK_TO_CARD':
      return { ...state, card: action.payload };
    case 'ADD_BOOK_FROM_LS':
      return { ...state, card: action.payload };
    default:
      return state;
  }
};
