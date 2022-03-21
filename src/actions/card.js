export const addBookToCard = (book) => ({
  type: 'ADD_BOOK_TO_CARD',
  payload: book,
});

export const addBookFromLS = (book) => ({
  type: 'ADD_BOOK_FROM_LS',
  payload: book,
});
