import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setBooks } from '../actions/books';
import { count } from '../actions/menu';
import { sortBooks } from '../selectors';
import './books.scss';

function Books({ setBooks, books, isLoading, sort, searchTitle, count }) {
  useEffect(() => {
    fetch('./books.json')
      .then((res) => {
        const data = res.json();
        return data;
      })
      .then((data) => {
        setBooks(data);
      });
  }, []);

  useEffect(() => {
    AllCount();
  }),
    [];

  const Func = (book) => {
    AddBook(book);
    AllCount(book);
    Price(book);
  };

  const AddBook = (book) => {
    const books = localStorage.getItem('books');
    if (!books) {
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
      const arr = JSON.parse(books);
      const index = arr.findIndex((elem) => elem.id === book.id);
      if (index === -1) {
        const arr2 = [...arr, { id: book.id, count: 1 }];
        localStorage.setItem('books', JSON.stringify(arr2));
      } else {
        arr[index] = { id: book.id, count: arr[index].count + 1 };
        localStorage.setItem('books', JSON.stringify(arr));
      }
    }
  };

  const AllCount = () => {
    const books = localStorage.getItem('books');
    const arr = JSON.parse(books);
    if (arr) {
      const allCount = arr.reduce((total, current) => total + current.count, 0);
      count(allCount);
    }
  };

  const Price = () => {
    const books = localStorage.getItem('books');
    const arr = JSON.parse(books);
    console.log(arr);
    if (arr) {
      books.forEach((elem) => {
        cardBooks.forEach((book) => {
          if (elem.id === book.id) {
            const addCount = { ...elem, count: book.count };
            arr.push(addCount);
          }
        });
      });
    }

    const price = arr.map((elem) => {
      return elem.price * elem.count;
    });
    console.log(price);
    const allPrice = price.reduce((prev, current) => prev + current.price, 0);
    console.log(allPrice);
  };

  return (
    <div className="card_component">
      <div className="container">
        <div className="cards_row">
          {isLoading
            ? 'Загрузка...'
            : sortBooks(books, sort, searchTitle).map((book) => {
                return (
                  <div key={book.id} className="cards_item">
                    <div className="card">
                      <div className="card_image">
                        {' '}
                        <img src={book.image} />{' '}
                      </div>
                      <div className="card_title">{book.title}</div>
                      <div className="card_author">{book.author}</div>
                      <div className="card_price">{`₴ ${book.price}`}</div>
                      <div className="card_btn" onClick={() => Func(book)}>
                        Добавить в корзину
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  books: state.books.books,
  isLoading: state.books.isLoading,
  searchTitle: state.search.searchTitle,
});

const mapDispatchTopProps = {
  setBooks,
  count,
};

export default connect(mapStateToProps, mapDispatchTopProps)(Books);
