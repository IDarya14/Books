const initialState = {
  count: 0,
  price: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'COUNT':
      return { ...state, count: action.payload };
    case 'DELETE_COUNT':
      return { ...state, count: 0 };
    case 'PRICE':
      return { ...state, price: action.payload };
    default:
      return state;
  }
};
