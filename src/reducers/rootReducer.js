import { combineReducers } from 'redux';
import books from './books';
import count from './menu.js';
import search from './search.js';

export const rootReducer = combineReducers({
  books,
  count,
  search,
});
