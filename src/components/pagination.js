import React from 'react';
import { Link } from 'react-router-dom';
import './pagination.scss';

export const Pagination = ({ perPage, totalBooks }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalBooks / perPage); i++)
    pageNumbers.push(i);
  return (
    <ul className="list-group">
      {pageNumbers.map((num) => (
        <li className="list" key={num}>
          <Link to={`/books?page=${num}`}>{num}</Link>
        </li>
      ))}
    </ul>
  );
};
