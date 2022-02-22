import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Auth } from './pages/Auth';
import { Registry } from './pages/Registry';
import { Allbooks } from './pages/Allbooks';
import { Home } from './components/Home';
import { Onebook } from './components/Onebook';
import { count } from './actions/menu';
import { priceR } from './actions/menu';
import { setBooks } from './actions/books';
import { addBookToCard } from './actions/card';

export default function (props) {
  const dispatch = useDispatch();
  const arrRedux = useSelector((state) => state.card.card);

  useEffect(() => {
    fetch('../books.json')
      .then((res) => res.json())
      .then((data) => {
        dispatch(setBooks(data));
        price(data);
      });

    allCount();
  }, []);

  const addBook = (book) => {
    if (!book.count) {
      addBookToCard({ ...book, count: 1 });
    } else {
      addBookToCard();
    }
    const array = localStorage.getItem('books');
    if (!array) {
      addBookToCard([...arrRedux, { ...book, count: 1 }]);
      localStorage.setItem(
        'books',
        JSON.stringify([
          {
            id: book.id,
            count: 1,
          },
        ])
      );
    } else {
      const arr = JSON.parse(array);
      const index = arr.findIndex((elem) => elem.id === book.id);
      const indexArr = arrRedux.findIndex((elem) => elem.id === book.id);
      if (index === -1) {
        const arr2 = [...arr, { id: book.id, count: 1 }];
        localStorage.setItem('books', JSON.stringify(arr2));
        addBookToCard([...arrRedux, { ...book, count: 1 }]);
      } else {
        arr[index] = { id: book.id, count: arr[index].count + 1 };
        localStorage.setItem('books', JSON.stringify(arr));

        arrRedux[indexArr] = { ...book, count: arrRedux[indexArr].count + 1 };
        addBookToCard(arrRedux);
      }
    }
  };

  const allCount = () => {
    const books = localStorage.getItem('books');
    const arr = JSON.parse(books);
    if (arr) {
      const allCount = arr.reduce((total, current) => total + current.count, 0);
      dispatch(count(allCount));
    }
  };

  const price = (data) => {
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
    dispatch(priceR(allPrice));
    return allPrice;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/registry" element={<Registry />} />
        <Route
          path="/books"
          element={
            <Home allCount={allCount} price={price}>
              <Allbooks allCount={allCount} price={price} addBook={addBook} />
            </Home>
          }
        />
        <Route
          path="/books/:id"
          element={
            <Home allCount={allCount} price={price}>
              <Onebook allCount={allCount} price={price} addBook={addBook} />
            </Home>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
