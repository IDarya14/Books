import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './menu.scss';
import { SearchBooks } from '../actions/search'

export const Menu = () => {



  const [open, setOpen] = useState(false)
  const dispatch = useDispatch();

  const hendalChange = (e) => {
   e.preventDefault()

   const value = e.target.value

   dispatch(SearchBooks(value))
  };

  const openCard = () => {
    if(open){
      setOpen(false)
    }
    else{
      setOpen(true)
    }
  }

  return(
    <div className='menu_component'>
    <div className='container'>
      <div className='menu_row'>
        <div className='menu_logo'>
           Магазин книг
         </div>
         <div className='menu_input'>
           <input onChange={hendalChange} type='text' placeholder='Поиск по книгам...'></input>
         </div>
      <div className='menu_items'>
        <div className='menu_items_result'>
            Итого:<b>0</b>
        </div>
        <div className='menu_items_trush' onClick={openCard}>
            Корзина:<b>0</b>
        {open? <div className='card_body'>
          <div> </div>
        </div> : false }
        </div>
      </div>
     </div>
    </div>
    </div>
  )
};