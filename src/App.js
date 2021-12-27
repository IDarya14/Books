import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import Books from './components/books';
import { Menu } from './components/menu';
import { Sort } from './components/sort';
import { count } from './actions/menu';
import { price } from './actions/menu';
import { setBooks } from './actions/books';

export default function App() {
  let [sort, setSort] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('./books.json')
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        dispatch(setBooks(data));
        Price(data);
      });

    AllCount();
  }, []);

  const AllCount = () => {
    const books = localStorage.getItem('books');
    const arr = JSON.parse(books);
    if (arr) {
      const allCount = arr.reduce((total, current) => total + current.count, 0);
      dispatch(count(allCount));
    }
  };

  const Price = (data) => {
    const arr = [];
    const book = localStorage.getItem('books');
    const cardBook = JSON.parse(book);
    if (cardBook) {
      data.forEach((elem) => {
        cardBook.forEach((item) => {
          if (elem.id === item.id) {
            const addBook = { ...elem, count: item.count };
            arr.push(addBook);
          }
        });
      });
    }
    const priceOneBook = arr.map((elem) => {
      return elem.price * elem.count;
    });
    const allPrice = priceOneBook.reduce(
      (total, current) => total + current,
      0
    );
    dispatch(price(allPrice));
    return allPrice;
  };

  return (
    <div className="wrapper">
      <div className="menu">
        <Menu AllCount={AllCount} Price={Price} />
      </div>
      <div className="container">
        <div className="sort_books">
          <div className="books">
            <Books sort={sort} AllCount={AllCount} Price={Price} />
          </div>
          <div className="sort">
            <Sort sort={sort} setSort={setSort} />
          </div>
        </div>
      </div>
    </div>
  );
}
