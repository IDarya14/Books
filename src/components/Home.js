import React from 'react';
import { Menu } from './Menu';

export const Home = (props) => {
  const children = props.children;
  const allCount = props.allCount;
  const price = props.price;
  return (
    <>
      <Menu allCount={allCount} price={price} />
      {children}
    </>
  );
};
