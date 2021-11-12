const initialState = {
  items: []
};

export default ( state = initialState, action ) => {
  switch (action.type) {
    case "ADD_BOOK":
      return {
        ...state,
        items: [
          ...state.items,
        action.payload]
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        items: state.items.filter(elem => elem.id != action.payload)

      };
    default:
      return state;
  };
};
