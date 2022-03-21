import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './menu.scss';
import { SortDrop } from './SortDrop';
import { searchBooks } from '../actions/search';
import { Card } from './Card';
import { useClickOutside } from '../customHooks/clickOutside';
import { addBookFromLS } from '../actions/card';

export const Menu = ({ allCount, price, sort, setSort }) => {
  const [open, setOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count.count);
  const books = useSelector((state) => state.books.books);
  const priceR = useSelector((state) => state.count.price);
  const ref = useRef();
  const reff = useRef();

  const chosenBooks = localStorage.getItem('books');
  const cardBooks = JSON.parse(chosenBooks);

  useEffect(() => {
    addKeyCount();
  }, [books]);

  const addKeyCount = () => {
    const arr = [];
    if (cardBooks) {
      books.forEach((elem) => {
        cardBooks.forEach((book) => {
          if (elem.id === book.id) {
            const addCount = { ...elem, count: book.count };
            arr.push(addCount);
            dispatch(addBookFromLS(arr));
            return arr;
          }
        });
      });
    }
    return arr;
  };

  useClickOutside(ref, () => setOpen(false), open);
  useClickOutside(reff, () => setOpenSearch(false), openSearch);

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

  const openSearchMenu = () => {
    if (!openSearch) {
      setOpenSearch(true);
    }
  };

  return (
    <div className="menu_component">
      <div className="container">
        <div className="menu_row">
          <div className="menu_log-inp">
            <div className="menu_logo">Магазин книг</div>
            <div className="menu_input">
              <input
                onChange={hendalChange}
                type="text"
                placeholder="Поиск по книгам..."
              ></input>
            </div>
          </div>
          <div className="menu_items">
            <div className="menu_items_result">Итого: {priceR} </div>
            <div className="menu_items_trush" onClick={openCard} ref={ref}>
              <div className="menu_items_trush_name">Корзина: {count}</div>
              <div className="menu_items_trush_img">
                <img src="https://cdn-icons-png.flaticon.com/512/3081/3081797.png" />
                <div className="menu_items_trush_price">{`${priceR} грн`}</div>
              </div>

              <div>
                {open ? (
                  <Card setOpen={setOpen} allCount={allCount} price={price} />
                ) : (
                  ''
                )}
              </div>
            </div>
            <div
              ref={reff}
              className="menu_items_burger"
              onClick={openSearchMenu}
            >
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png" />
            </div>
            {openSearch ? <SortDrop sort={sort} setSort={setSort} /> : ''}
          </div>
        </div>
      </div>
    </div>
  );
};
