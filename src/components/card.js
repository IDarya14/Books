import React from 'react';
import { useSelector } from 'react-redux';

import './card.scss';

export const Card = ({ cardBooksfunc, addPrice }) => {
  const count = useSelector((state) => state.count.count);

  return (
    <div className="item">
      <div className="item__body">
        {cardBooksfunc().map((elem) => {
          return (
            <>
              <div className="item__row" key={elem.id}>
                <div className="item__items">
                  <div className="item_img">
                    <img src={elem.image} alt="book" />
                  </div>
                  <div className="item__title">{elem.title}</div>
                </div>
                <div className="item__count">{elem.count} </div>
              </div>
            </>
          );
        })}
        <div className="count">Итого: {count} грн</div>
      </div>
    </div>
  );
};
