const initialState = {
  count: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'COUNT':
      return { ...state, count: action.payload };
    default:
      return state;
  }
};
