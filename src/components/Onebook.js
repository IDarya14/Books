import React from 'react';
import './oneBook.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export const Onebook = ({ allCount, price, addBook }) => {
  const books = useSelector((state) => state.books.books);
  const navigate = useNavigate();

  const id = location.pathname.split('/')[2];

  const book = books.find((elem) => {
    return +elem.id === +id;
  });

  const func = (book) => {
    addBook(book);
    allCount();
    price(books);
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="onebook-component">
      <div className="onebook__container">
        <div className="onebook__row">
          <div
            onClick={() => {
              goBack();
            }}
            className="onebook__btn-back"
          >
            Go back
          </div>
          <div className="onebook__image">
            <img src={book?.image} />
          </div>
          <div className="items">
            <div className="items__author">{book?.author}</div>
            <div className="items__title">{`"${book?.title}"`}</div>
            <div className="items__description">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                ut, ducimus porro obcaecati natus earum vitae magni itaque
                consequuntur reprehenderit, impedit aspernatur ratione molestias
                ipsam est nulla deleniti. Odit, dolor?
              </p>
            </div>

            <div className="items__price">
              <div className="items__pricename">{'Цена:'}</div>
              <div className="items__pricenum">{`${book?.price} ₴`}</div>
            </div>
            <div onClick={() => func(book)} className="items__addbook">
              Добавить в корзину
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
