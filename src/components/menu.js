import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './menu.scss';
import { SearchBooks } from '../actions/search';
import { Card } from './card';
import { useClickOutside } from '../customHooks/clickOutside';
import { AddBookToCard } from '../actions/card';

export const Menu = ({ AllCount, Price }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.count);
  const books = useSelector((state) => state.books.books);
  const price = useSelector((state) => state.count.price);
  const ref = useRef();

  const chosenBooks = localStorage.getItem('books');
  const cardBooks = JSON.parse(chosenBooks);

  useEffect(() => {
    AddKeyCount();
  }, [cardBooks]);

  const AddKeyCount = () => {
    const arr = [];
    if (cardBooks) {
      books.forEach((elem) => {
        cardBooks.forEach((book) => {
          if (elem.id === book.id) {
            const addCount = { ...elem, count: book.count };
            arr.push(addCount);
            dispatch(AddBookToCard(arr));
            return arr;
          }
        });
      });
    }
    return arr;
  };

  useClickOutside(ref, () => setOpen(false), open);

  const hendalChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    dispatch(SearchBooks(value));
  };

  const openCard = () => {
    if (!open) {
      setOpen(true);
    }
  };

  return (
    <div className="menu_component">
      <div className="container">
        <div className="menu_row">
          <div className="menu_logo">Магазин книг</div>
          <div className="menu_input">
            <input
              onChange={hendalChange}
              type="text"
              placeholder="Поиск по книгам..."
            ></input>
          </div>
          <div className="menu_items">
            <div className="menu_items_result">Итого: {price} </div>
            <div className="menu_items_trush" onClick={openCard} ref={ref}>
              Корзина: {count}
              <div>
                {open ? (
                  <Card setOpen={setOpen} AllCount={AllCount} Price={Price} />
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
