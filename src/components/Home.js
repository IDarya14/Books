import React, { useState } from 'react';
import { Footer } from './Footer';
import { Menu } from './Menu';

export const Home = (props) => {
  const children = props.children;
  const allCount = props.allCount;
  const price = props.price;
  let [sort, setSort] = useState('');
  return (
    <>
      <Menu allCount={allCount} price={price} sort={sort} setSort={setSort} />
      {children({ sort, setSort })}
      <Footer />
    </>
  );
};
