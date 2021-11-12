import { combineReducers } from "redux";
import books from "./books";
import card from './card.js'
import search from "./search.js";

export const rootReducer = combineReducers({
books,
card,
search
});