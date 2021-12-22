import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AddBookToCard } from '../actions/card';
import { count } from '../actions/menu';
import { price } from '../actions/menu';

import './card.scss';

export const Card = ({ setOpen }) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.card.card);
  const priceredux = useSelector((state) => state.count.price);

  const hendalDeleteBtn = (id) => {
    const index = books.findIndex((elem) => elem.id === id);
    if (index >= 0) {
      const books2 = [...books];
      books2.splice(index, 1);
      dispatch(AddBookToCard([]));
    }
    const json = localStorage.getItem('books');
    const res = JSON.parse(json);
    const ind = res.findIndex((item) => item.id === id);
    if (ind >= 0) {
      res.splice(ind, 1);
      localStorage.removeItem('books');
      localStorage.setItem('books', JSON.stringify(res));
    }
  };

  const Func = () => {
    dispatch(count(0));
    dispatch(AddBookToCard([]));
    dispatch(price(0));
    localStorage.clear();
    // setOpen(false);
  };

  return (
    <div className="cardbox">
      <div className="cardbox__body">
        <div className="cardbox__item">
          {books.map((elem) => {
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
          })}
        </div>
        <div className="cardbox__count">Итого: {priceredux} грн</div>
        <div className="cardbox__clear-card" onClick={() => Func()}>
          Очистить корзину
        </div>
      </div>
    </div>
  );
};
