import { useContext, useState } from 'react';
import BackContext from './BackContext';

function SortBtns() {
  const { sortPrice, sorting } = useContext(BackContext);

  return (
    <>
      <select
        className='sorting'
        value={sortPrice}
        onChange={sorting}
        style={{ maxWidth: '150px' }}
      >
        <option value='0'>Price</option>
        <option value='default'>default</option>
        <option value='price_asc'>sort 0 - 9</option>
        <option value='price_desc'>sort 9-0</option>
      </select>
    </>
  );
}

export default SortBtns;
