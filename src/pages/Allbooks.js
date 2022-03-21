import React from 'react';
import './allbooks.scss';
import Books from '../components/Books';
import { Sort } from '../components/Sort';

export const Allbooks = ({ allCount, price, addBook, sort, setSort }) => {
  return (
    <div className="allbooks">
      <div className="container">
        <Books
          sort={sort}
          allCount={allCount}
          price={price}
          addBook={addBook}
        />
      </div>
      <div className="sort">
        <Sort sort={sort} setSort={setSort} />
      </div>
    </div>
  );
};
