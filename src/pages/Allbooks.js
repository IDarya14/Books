import React, { useState } from 'react';
import './allbooks.scss';
import Books from '../components/Books';
import { Sort } from '../components/Sort';

export const Allbooks = ({ allCount, price, addBook }) => {
  let [sort, setSort] = useState('');

  return (
    <div className="wrapper">
      <div className="container">
        <div className="sort_books">
          <div className="books">
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
      </div>
    </div>
  );
};
