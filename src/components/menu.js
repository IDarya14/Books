import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './menu.scss';
import { searchBooks } from '../actions/search';
import { Card } from './Card';
import { useClickOutside } from '../customHooks/clickOutside';
import { addBookToCard } from '../actions/card';

export const Menu = ({ allCount, price }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.count);
  const books = useSelector((state) => state.books.books);
  const priceR = useSelector((state) => state.count.price);
  const ref = useRef();

  const chosenBooks = localStorage.getItem('books');
  const cardBooks = JSON.parse(chosenBooks);

  useEffect(() => {
    addKeyCount();
  }, [cardBooks]);

  const addKeyCount = () => {
    const arr = [];
    if (cardBooks) {
      books.forEach((elem) => {
        cardBooks.forEach((book) => {
          if (elem.id === book.id) {
            const addCount = { ...elem, count: book.count };
            arr.push(addCount);
            dispatch(addBookToCard(arr));
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
    dispatch(searchBooks(value));
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
            <div className="menu_items_result">Итого: {priceR} </div>
            <div className="menu_items_trush" onClick={openCard} ref={ref}>
              <div className="menu_items_trush_name">Корзина: {count}</div>
              <div>
                {open ? (
                  <Card setOpen={setOpen} allCount={allCount} price={price} />
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
