import { useContext } from 'react';
import FrontContext from './FrontContext';

function SortBtns() {
  const { sortPrice, sorting } = useContext(FrontContext);
  return (
    <>
      <select
        className='sorting'
        value={sortPrice}
        onChange={sorting}
        style={{ maxWidth: '150px' }}
      >
        <option value='0'>Sort by Price</option>
        <option value='default'>default</option>
        <option value='price_asc'>sort 0 - 9</option>
        <option value='price_desc'>sort 9-0</option>
      </select>
    </>
  );
}

export default SortBtns;
