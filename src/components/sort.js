import React from 'react';
import './sort.scss';

export const Sort = ({ sort, setSort }) => {
 
  return(
    <div className = 'sort_body'>
      <div className='sort_items'>
        <div className={`sort_item ${sort===1? 'sort_item_active' : ''}`} onClick={()=>setSort(1)}>
          Все
        </div>
        <div className={`sort_item ${sort===2? 'sort_item_active' : ''}`} onClick={()=>setSort(2)}>
          Популярные
        </div>
        <div className={`sort_item ${sort===3? 'sort_item_active' : ''}`} onClick={()=>setSort(3)}>
          Цена (дорогие)
        </div>
        <div className={`sort_item ${sort===4? 'sort_item_active' : ''}`} onClick={()=>setSort(4)}>
          Цена (дешевые)
        </div>
        <div className={`sort_item ${sort===5? 'sort_item_active' : ''}`} onClick={()=>setSort(5)}>
          Автор
        </div>
      </div>
    </div>
  );
};