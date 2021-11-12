import React, {useState} from "react";
import './App.scss';
import Books from './components/books';
import { Menu } from './components/menu';
import { Sort } from './components/sort'

export default function App() {
   
  let [ sort, setSort ] = useState('');

  return(
    <div className='wrapper'>
        <div className='menu'><Menu /></div>
      <div className='container'>
            <div className='sort_books'>
              <div className='books'><Books sort={sort}/></div>
              <div className='sort'><Sort sort={sort} setSort={setSort}/></div>
            </div>
      </div>
    </div>
  )
}
