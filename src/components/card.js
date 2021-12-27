import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AddBookToCard } from '../actions/card';
import { count } from '../actions/menu';
import { price } from '../actions/menu';

import './card.scss';

export const Card = ({ setOpen, AllCount, Price }) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.card.card);
  const priceredux = useSelector((state) => state.count.price);
  const allBooks = useSelector((state) => state.books.books);

  const MoreBtn = (id) => {
    const array = [...books];
    const index = array.findIndex((elem) => elem.id === id);
    array[index].count++;
    setTimeout(() => {
      dispatch(AddBookToCard(array));
    });
    const json = localStorage.getItem('books');
    const booksLS = JSON.parse(json);
    const i = booksLS.findIndex((elem) => elem.id === id);
    booksLS[i].count++;
    localStorage.removeItem('books');
    localStorage.setItem('books', JSON.stringify(booksLS));
    AllCount();
    Price(allBooks);
  };

  const LessBtn = (id) => {
    const array = [...books];
    const index = array.findIndex((elem) => elem.id === id);
    array[index].count--;
    if (array[index].count > 0) {
      setTimeout(() => {
        dispatch(AddBookToCard(array));
      });
    } else {
      console.log('help');
      array.splice(index, 1);
      setTimeout(() => {
        dispatch(AddBookToCard(array));
        if (!array.length) {
          setOpen(false);
        }
      });
    }
    const json = localStorage.getItem('books');
    const booksLS = JSON.parse(json);
    const i = booksLS.findIndex((elem) => elem.id === id);
    booksLS[i].count--;
    if (booksLS[i].count > 0) {
      localStorage.removeItem('books');
      localStorage.setItem('books', JSON.stringify(booksLS));
    } else {
      booksLS.splice(i, 1);
      localStorage.removeItem('books');
      localStorage.setItem('books', JSON.stringify(booksLS));
    }
    AllCount();
    Price(allBooks);
  };

  const hendalDeleteBtn = (id) => {
    const index = books.findIndex((elem) => elem.id === id);
    if (index >= 0) {
      const books2 = [...books];
      books2.splice(index, 1);
      setTimeout(() => {
        dispatch(AddBookToCard(books2));
        if (!books2.length) {
          setOpen(false);
        }
      });
    }
    const json = localStorage.getItem('books');
    const res = JSON.parse(json);
    const ind = res.findIndex((item) => item.id === id);
    if (ind >= 0) {
      res.splice(ind, 1);
      localStorage.removeItem('books');
      localStorage.setItem('books', JSON.stringify(res));
    }
    AllCount();
    Price(allBooks);
  };

  const Func = () => {
    dispatch(count(0));
    dispatch(AddBookToCard([]));
    dispatch(price(0));
    localStorage.clear();
    setOpen(false);
  };

  return (
    <div className="cardbox">
      <div className="cardbox__body">
        <div className="cardbox__item">
          {books.length ? (
            books.map((elem) => {
              return (
                <div key={elem.id}>
                  <div className="item__row">
                    <div className="card">
                      <div className="card__items">
                        <div className="card__img">
                          <img src={elem.image} alt="book" />
                        </div>
                        <div className="card__title">{elem.title}</div>
                      </div>
                      <div className="card__items2">
                        <div className="card__count">{elem.count} </div>
                        <div className="card__img-arrow">
                          <div
                            className="img-top"
                            onClick={() => MoreBtn(elem.id)}
                          >
                            <img src="https://cdn-0.emojis.wiki/emoji-pics/facebook/up-arrow-facebook.png"></img>
                          </div>
                          <div
                            className="img-bottom"
                            onClick={() => LessBtn(elem.id)}
                          >
                            <img src="https://cdn-0.emojis.wiki/emoji-pics/facebook/up-arrow-facebook.png"></img>
                          </div>
                        </div>
                        <div
                          className="card__deletebtn"
                          onClick={() => hendalDeleteBtn(elem.id)}
                        >
                          x
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>Корзина пустая</div>
          )}
          <div className="cardbox__count">Итого: {priceredux} грн</div>
          <div className="cardbox__clear-card" onClick={() => Func()}>
            Очистить корзину
          </div>
        </div>
      </div>
    </div>
  );
};
