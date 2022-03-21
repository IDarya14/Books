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
      <div
        onClick={() => {
          goBack();
        }}
        className="btn-back"
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8JBQkAAACDgoPIx8jc3NxhX2HGxsbk5OQFAAXg4OBfXV9jYWNVU1UPCw9YVlj49/h7eXuMi4zU09RDQUOVlJUlIyWsq6wIAAifnp+Dg4M3NDcTEBMbGBs+PD5tbG25uLnt7O0yLzKrqqubmpsgHiBJR0lycnI6dB3/AAAEK0lEQVR4nO2d21LbQBBE7QUHSxhsMIY4XMzFkP//w0gCUkFI9rak1Lh7px/yPKdmZrtXkGU0OlgtTn7Nb+/uH05XS+tS/ouWs1BqnJX/nl9MresZWtNNCNn4rwrIy4V1TYPq5gtfqaKVSrN6Wed77+OjdV2DaRO+81VtXFlXNpB+NAOWiI/WtQ2iszbAEnFiXd0Aau1gtYv3/CfqbBdggbi1LrCvTncDFgfqk3WJ/TTfA1ggXlrX2Et7RrQivLUuso8iAAvE3LrM7to/ohXhi3WdnbXvkPkkpA02USNaEs6sK+2onUb/hfDKutRu2hHVNHoY3UFWQ4zdwYpwbV1tB0Weoh+EhNeLOB/8BHy2LhcXMqKUawgCBrrPivE2QdpC6JApAO/Y7vjYiI6zcGxdMSiwg3z3CnAH+ZYQiGrvgEfWFYMCd5APEEoyJeCFdcWgYEC2DsqPKHzIsI0obBNsHYSNng1QfgfhDrLtoLxNeFSrA/qIHpjcJtgB5W1CPqq5TbAD+o2evYPyI+o3evYOelRjB/Soxt5Bj2rsgB7V2DsoP6Ie1dg76FGNHdCjGnsH5aOavE3IJxl5QLeJOiDbDsrbhEc1dkC/0bN30KNaHZBtRN0m2AHlbcKjWnIdZAOU90GPauwdlB9Rt4nkOsgG6DtYB/QdPDDJj6j8/3y5UAdcq4/osukJXCVANG3TjejoBASk6yBo9YSAC2gLCQGxIeXbwUJb5PE4wg6ORkfA+3+UgEBgoxzRQlfRr3BurEvtqOhrE9+7XB+KT92BFHEFnDSciDeIW1AiPkGOT4n4II+IhBpOxMU1iHhiXTEs5Kwh7SL6qCohIjanjIM6PZdHnPyUH9Q8yCNOYUS+QYV3ka6LEx9UAcQ8k0f0XVRATGAXUxhU/ePGA1wDoge4w5ObhgJiPpZHnOgjumkoILppKCAmsIs4oge4w1MCu5iAaeABjm8XPcAJIPqtX6GLbhoKiP5jGwlE/UFNwDTyBAbVf+9GADGBXXTTUEBMIcDpX4kT2EU3DQXEFAJcAl3UR/QAp9DFBHbRTaMBkW8X9TOqm0YDIt+gumkIIKZgGvB3VN/Fw5ObRgMi3aCmcOv3ACeAiO9ibl0yqskdiPi6sC4ZFRzgzqwrhgUP6qN1xbDAH9uEZ+uCcYEBLtxYF4wLM40wt663g6BdzMKTdb0dBAU4xjHFfu8mbK2r7SRgF8Nv62K7KX4Xw5t1rR0VHeAoD9NKsQGO9O3eUpGDGtbWhXZXnGnwfc34RzEBLgTrKnspwjRYzeJTe3cxC0vrGntqn2mEmXWFvbXbNDK+LzXftXNQw8q6vCE0bY/htO+819RqGoTfoVo0fW5CzMIZ3bfEdp1+W8YssP6thRa9XH9hLPjm7EZY12L9GgplJVyhmRpfpfxldnU9fn2Yb4/7LOAfsdVBRbG67RAAAAAASUVORK5CYII=" />
      </div>
      <div className="onebook__container">
        <div className="onebook__row">
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
