import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setBooks } from '../actions/books';
import { count, priceR } from '../actions/menu';
import { sortBooks } from '../selectors';
import './books.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

function Books({
  books,
  isLoading,
  sort,
  searchTitle,
  allCount,
  price,
  addBook,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const page = location.search
      .split('?')[1]
      .split('&')
      .find((elem) => elem.includes('page='))
      .split('=')[1];
    setCurrentPage(+page);
  }, [location]);

  const lastBookIndex = currentPage * perPage;
  const firstBookIndex = lastBookIndex - perPage;
  const currentBook = books.slice(firstBookIndex, lastBookIndex);

  const pageNumbers = () => {
    const page = [];
    for (let i = 1; i <= Math.ceil(books.length / perPage); i++) page.push(i);
    const countPage = page.length;
    return countPage;
  };

  const func = (book) => {
    addBook(book);
    allCount();
    price(books);
  };

  const oneBook = (book) => {
    navigate(`/books/${book.id}`);
  };

  return (
    <div className="card_component">
      <div className="container">
        <div className="cards_row">
          {isLoading ? (
            'Загрузка...'
          ) : sortBooks(currentBook, sort, searchTitle).length ? (
            sortBooks(currentBook, sort, searchTitle).map((book) => {
              return (
                <div key={book.id} className="cards_item">
                  <div className="card">
                    <div onClick={() => oneBook(book)} className="card_image">
                      {' '}
                      <img src={book.image} />{' '}
                    </div>
                    <div className="card_title">{book.title}</div>
                    <div className="card_author">{book.author}</div>
                    <div className="card_price">{`₴ ${book.price}`}</div>
                    <div className="card_btn" onClick={() => func(book)}>
                      Добавить в корзину
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="noResult">Нет результатов</div>
          )}
        </div>

        <Pagination
          page={currentPage} //страница на которой я нахожусь
          count={pageNumbers()} //
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`${window.location.pathname}?page=${item.page}`}
              {...item}
            />
          )}
        />
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
  priceR,
};

export default connect(mapStateToProps, mapDispatchTopProps)(Books);
